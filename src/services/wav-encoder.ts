import encodeWAV from 'audiobuffer-to-wav';


export class WAVEncoder {
    private audioContext: AudioContext;
  
    constructor() {
      this.audioContext = new (window.AudioContext)();
    }
  
    async encodeToWAV(audioBuffer: AudioBuffer): Promise<Blob> {
      return new Promise((resolve, reject) => {
        const wavData = encodeWAV(audioBuffer);
        const blob = new Blob([wavData], { type: 'audio/wav' });
        resolve(blob);
      });
    }

    decodeAudioData(blob: Blob): Promise<AudioBuffer> {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const arrayBuffer = fileReader.result as ArrayBuffer;
            this.audioContext.decodeAudioData(arrayBuffer, (audioBuffer) => {
              resolve(audioBuffer);
            }, (error) => {
              reject(error);
            });
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
          fileReader.readAsArrayBuffer(blob);
        });
      }
  }