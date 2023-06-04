import { SessionSync } from "../../services/session-sync";
import { WAVEncoder } from "../../services/wav-encoder";

export const Recorder = ({ sessionSync }: {sessionSync: SessionSync}) => {

  const wavEncoder = new WAVEncoder((blob) =>{
    saveWavData(blob);
  })

  const saveWavData =  (blob: Blob) => {
    console.log('data: ', blob)
    // const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
    sessionSync.sendAudioData(blob)
  }
  

    const handleStartRecording = async () => {
      // todo: call setuUserMedia stream and set media recorder only once on the init time.
      await wavEncoder.setUserMediaStream();
      wavEncoder.setMediaRecorder();

      wavEncoder.startRecording();
    };
  
    const handleStopRecording = () => {
      wavEncoder.stopRecording();
    };

    return (
    <>
        <div>Test</div>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </>
    );
  };





