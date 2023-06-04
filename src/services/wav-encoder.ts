import RecordRTC from "recordrtc";


export class WAVEncoder {
    private mediaRecorder?: RecordRTC;
    private userMediaStream?: MediaStream;
    private onwavdataavailable: (blob: Blob)=> void;
  
    constructor(onwavdataavailable: (blob: Blob)=> void) {
      this.onwavdataavailable = onwavdataavailable;      
    }

    startRecording() {
      if(this.mediaRecorder){
        this.mediaRecorder.startRecording();
      }
    }

    stopRecording(){
      if(this.mediaRecorder){
        this.mediaRecorder.stopRecording();
      }
    }

   setMediaRecorder(): void{
    const stream = this.userMediaStream; 
    if(stream){
      this.mediaRecorder = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        timeSlice: 5000, // Record audio in chunks of specified duration,

        ondataavailable: async (blob) => {
          this.onwavdataavailable(blob);
        }
      });
    }
   }

   async setUserMediaStream(): Promise<void>{
    const mediaConstraints = { audio: true };
    this.userMediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);    
  }  

  }