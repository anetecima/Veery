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
        mimeType: 'audio/wav',
        timeSlice: 5000, // Record audio in chunks of specified duration,

        ondataavailable: (blob) => {
          this.onwavdataavailable(blob);
        }
      });
    }
   }

   async setUserMediaStream(): Promise<void>{
    const mediaConstraints = { audio: true };
    this.userMediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);    
  }

  // private convertToWav(): void{
  //     // Create a new AudioBuffer with the desired sample rate and channel count
  //     const audioContext = new AudioContext();
  //     const wavBuffer = audioContext.createBuffer(32768, 1, 1);

  //     // Copy the audio data from the decoded AudioBuffer to the new AudioBuffer
  //     for (let channel = 0; channel < channelCount; channel++) {
  //       const channelData = decodedData.getChannelData(channel);
  //       wavBuffer.copyToChannel(channelData, channel);
  //     }

  //     // Create a WAV Blob from the new AudioBuffer
  //     const wavData = new Blob([encodeWav(wavBuffer)], { type: 'audio/wav' });
  // }
  

  }