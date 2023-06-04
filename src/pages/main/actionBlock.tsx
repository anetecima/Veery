import styled from '@emotion/styled'
import { IconFileUpload, IconMicOff, IconMicOn } from './icons.tsx'
import { useRef, useState } from 'react'
import { Tooltip } from '@mui/material'
import { SessionSync } from '../../services/session-sync.ts'
import { WAVEncoder } from '../../services/wav-encoder.ts'

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
  cursor: pointer;
  transition: all 0.2s linear;

  &:hover {
    opacity: 0.5;
  }
`

const FileInputStyled = styled.input`
  display: none;
  //opacity: 0;
`


const wsServerUrl = 'ws://127.0.0.1:8080';
const sessionSync = new SessionSync(wsServerUrl);



const FileUploadButton = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    hiddenFileInput?.current?.click()
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onReaderLoad = (event) => {
    //todo: file processing happens here
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const onFileUpload = (event) => {
    const reader = new FileReader()
    reader.onload = onReaderLoad
    reader.readAsText(event.target.files[0])
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

const MicButton = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isAudioRecorderInit, setAudioRecorderInit] = useState<boolean>(false);

  const wavEncoder = new WAVEncoder((blob) =>{
    console.log('test data: ', blob);
    sessionSync.sendAudioData(blob);
  })
  

  const initMicRecorder = async ()=>{
    if(!isAudioRecorderInit){
      await wavEncoder.setUserMediaStream();
      wavEncoder.setMediaRecorder();
      setAudioRecorderInit(true);
    }
  }

  const onClickHandler = async () => {

    await initMicRecorder();
    
    setIsOn((prev) => {
      // check if first time
      const newState = !prev;
      
      if(!newState){
        wavEncoder.stopRecording();
      }else{
        wavEncoder.startRecording();
      }
      return newState
    })
  }

  return (
    <Tooltip title={`Turn ${isOn ? 'off' : 'on'} yor microphone`}>
      <ButtonStyle onClick={onClickHandler}>
        {isOn ? <IconMicOff /> : <IconMicOn />}
      </ButtonStyle>
    </Tooltip>
  )
}

export const ActionBlock = () => {
  return (
    <WrapperStyle>
      <MicButton />

      <FileUploadButton />
    </WrapperStyle>
  )  
}

