import Recorder from 'recorder-js';



export class MicrophoneCapture {
    private audioContext: AudioContext;
    private recorder: Recorder

    private isRecording = false;
    private blob = null;

    constructor(){
        this.audioContext = new (window.AudioContext)();
        this.recorder = new Recorder(this.audioContext, {
            // An array of 255 Numbers
            // You can use this to visualize the audio stream
            // If you use react, check out react-wave-stream
            onAnalysed: data => console.log(data),
          });
    }
 
  
    startCapture() {
        navigator.mediaDevices.getUserMedia({audio: true})
        .then(stream => this.recorder.init(stream))
        .catch(err => console.log('Uh oh... unable to get stream...', err));

        this.recorder
        .start()
        .then(() => this.isRecording = true);
    
    }
  
    stopCapture() {
        this.recorder.stop()
    .then(({blob, buffer}) => {
      blob = blob;
      // buffer is an AudioBuffer
    });
      
    }
      
  }
  