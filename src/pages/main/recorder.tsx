import RecordRTC from "recordrtc";

export const Recorder = () => {
    const handleStartRecording = async () => {
        startRecording();
    };
  
    const handleStopRecording = () => {
    };

    return (
    <>
        <div>Test</div>
        <button onClick={handleStartRecording}>Start Recording</button>
        <button onClick={handleStopRecording}>Stop Recording</button>
      </>
    );
  };



function startRecording() {
  const mediaConstraints = { audio: true };

  navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(function(stream) {
      const recorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/wav',
        timeSlice: 5000, // Record audio in chunks of specified duration
        ondataavailable: function(blob) {
          saveWavData(blob);
        }
      });

      recorder.startRecording();

      setTimeout(function() {
        saveWavData(recorder.getBlob());
      }, 5000);
    })
    .catch(function(error) {
      console.error('Error accessing microphone:', error);
    });
}

function saveWavData(blob: Blob) {
  const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
  console.log('file: ', blob, file)
}




