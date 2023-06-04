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

        ondataavailable: async (blob) => {
          const wav = await this.blobToWav(blob)
          this.onwavdataavailable(wav);
        }
      });
    }
   }

   async setUserMediaStream(): Promise<void>{
    const mediaConstraints = { audio: true };
    this.userMediaStream = await navigator.mediaDevices.getUserMedia(mediaConstraints);    
  }


  // Function to convert Blob to WAV and save the file
 convertToWavAndSave(blob: Blob) {
  this.blobToWav(blob)
    .then((wavBlob) => {
      // Save the WAV file
      const url = URL.createObjectURL(wavBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'audio.wav';
      link.click();
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error converting to WAV:', error);
    });
}


private blobToWav(blob: Blob): Promise<Blob> {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const audioData = reader.result as ArrayBuffer;

      const audioContext = new (window.AudioContext)();
      audioContext.decodeAudioData(audioData, (decodedData: AudioBuffer) => {
        const sampleRate = decodedData.sampleRate;
        const channelCount = decodedData.numberOfChannels;

        // Create a new AudioBuffer with the desired sample rate and channel count
        const wavBuffer = audioContext.createBuffer(channelCount, decodedData.length, sampleRate);

        // Copy the audio data from the decoded AudioBuffer to the new AudioBuffer
        for (let channel = 0; channel < channelCount; channel++) {
          const channelData = decodedData.getChannelData(channel);
          wavBuffer.copyToChannel(channelData, channel);
        }

        // Create a WAV Blob from the new AudioBuffer
        const wavData = new Blob([this.encodeWav(wavBuffer)], { type: 'audio/wav' });
        resolve(wavData);
      }, reject);
    };

    reader.readAsArrayBuffer(blob);
  });
}

 private encodeWav(buffer: AudioBuffer): Uint8Array {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const bitDepth = 16;

  const length = buffer.length * numChannels * (bitDepth / 8);
  const bufferView = new ArrayBuffer(length);
  const dataView = new DataView(bufferView);

  let offset = 0;

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);

    for (let i = 0; i < channelData.length; i++, offset += 2) {
      const sample = Math.max(-1, Math.min(1, channelData[i]));
      dataView.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    }
  }

  const wavHeader = this.createWavHeader(sampleRate, numChannels, bitDepth, length);

  const wavBuffer = new Uint8Array(wavHeader.length + bufferView.byteLength);
  wavBuffer.set(wavHeader, 0);
  wavBuffer.set(new Uint8Array(bufferView), wavHeader.length);

  return wavBuffer;
}

private createWavHeader(sampleRate: number, numChannels: number, bitDepth: number, dataLength: number): Uint8Array {
  const headerLength = 44;
  const buffer = new Uint8Array(headerLength);

  const blockAlign = numChannels * (bitDepth / 8);
  const byteRate = sampleRate * blockAlign;

  buffer.set([0x52, 0x49, 0x46, 0x46]); // 'RIFF'
  buffer.set([(dataLength + headerLength - 8) & 0xFF, ((dataLength + headerLength - 8) >> 8) & 0xFF, ((dataLength + headerLength - 8) >> 16) & 0xFF, ((dataLength + headerLength - 8) >> 24) & 0xFF]);
  buffer.set([0x57, 0x41, 0x56, 0x45]); // 'WAVE'
  buffer.set([0x66, 0x6D, 0x74, 0x20]); // 'fmt '
  buffer.set([0x10, 0x00, 0x00, 0x00]); // Subchunk1Size (16 for PCM)
  buffer.set([0x01, 0x00]); // AudioFormat (1 for PCM)
  buffer.set([numChannels & 0xFF, (numChannels >> 8) & 0xFF]); // NumChannels
  buffer.set([sampleRate & 0xFF, (sampleRate >> 8) & 0xFF, (sampleRate >> 16) & 0xFF, (sampleRate >> 24) & 0xFF]); // SampleRate
  buffer.set([byteRate & 0xFF, (byteRate >> 8) & 0xFF, (byteRate >> 16) & 0xFF, (byteRate >> 24) & 0xFF]); // ByteRate
  buffer.set([blockAlign & 0xFF, (blockAlign >> 8) & 0xFF]); // BlockAlign
  buffer.set([bitDepth & 0xFF, (bitDepth >> 8) & 0xFF]); // BitsPerSample
  buffer.set([0x64, 0x61, 0x74, 0x61]); // 'data'
  buffer.set([(dataLength) & 0xFF, ((dataLength) >> 8) & 0xFF, ((dataLength) >> 16) & 0xFF, ((dataLength) >> 24) & 0xFF]);

  return buffer;
}
  

  }