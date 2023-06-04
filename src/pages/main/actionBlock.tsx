import styled from '@emotion/styled'
import { IconFileUpload, IconMicOn } from './icons.tsx'
import { useRef, useState } from 'react'
import { Tooltip } from '@mui/material'
import { WAVEncoder } from '../../services/wav-encoder.ts'
import { SessionSync } from '../../services/session-sync.ts'

const WrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const ButtonStyle = styled.button`
  font-size: 20px;
  padding: 5px;
  border: 0;
  background-color: white;
  width: 35px;
  height: 35px;
  text-align: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: all 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.5;
  }
`

const FileInputStyled = styled.input`
  display: none;
  //opacity: 0;
`

const RecordButtonStyled = styled(ButtonStyle)<{ isOn: boolean }>`
  border-radius: 100%;
  background: ${(props) => (props.isOn ? 'red' : 'transparent')};
  color: ${(props) => (props.isOn ? 'white' : 'black')} !important;
  animation: ${(props) =>
    props.isOn ? 'pulse 0.5s ease-in-out infinite alternate' : 'none'};
`

const FileUploadButton = ({sessionSync} : {sessionSync: SessionSync}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    hiddenFileInput?.current?.click()
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onReaderLoad = (event) => {
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onFileUpload = (event) => {
   
    const file = event.target.files[0];

    if (!file) {
      console.log('No file selected');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const audioData = reader.result as ArrayBuffer;
      const blob = new Blob([audioData]);

      sessionSync.sendAudioData(blob);
    };
    reader.readAsArrayBuffer(file);



  }

  return (
    <Tooltip title="Upload new audio file">
      <div style={{ display: 'flex' }}>
        <ButtonStyle onClick={handleClick}>
          <IconFileUpload />
        </ButtonStyle>

        <FileInputStyled
          type="file"
          ref={hiddenFileInput}
          onChange={onFileUpload}
        />
      </div>
    </Tooltip>
  )
}

const MicButton = ({ sessionSync }: { sessionSync: SessionSync }) => {
  const [isOn, setIsOn] = useState<boolean>(false)
  const [isAudioRecorderInit, setAudioRecorderInit] = useState<boolean>(false)

  const wavEncoder = new WAVEncoder((blob) => {
    console.log('test data: ', blob)
    sessionSync.sendAudioData(blob)
  })

  const initMicRecorder = async () => {
    if (!isAudioRecorderInit) {
      await wavEncoder.setUserMediaStream()
      wavEncoder.setMediaRecorder()
      setAudioRecorderInit(true)
    }
  }

  const onClickHandler = async () => {
    await initMicRecorder()

    setIsOn((prev) => {
      // check if first time
      const newState = !prev

      if (!newState) {
        wavEncoder.stopRecording()
      } else {
        wavEncoder.startRecording()
      }
      return newState
    })
  }

  return (
    <Tooltip title={`Turn ${isOn ? 'off' : 'on'} your microphone`}>
      <RecordButtonStyled isOn={isOn} onClick={onClickHandler}>
        <IconMicOn />
      </RecordButtonStyled>
    </Tooltip>
  )
}

export const ActionBlock = ({ sessionSync }: { sessionSync: SessionSync }) => {
  return (
    <WrapperStyle>
      <MicButton sessionSync={sessionSync} />

      <FileUploadButton sessionSync={sessionSync}/>
    </WrapperStyle>
  )
}
