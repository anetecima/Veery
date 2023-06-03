export class MediaRecorderWrapper {
    private mediaRecorder: MediaRecorder;
    private chunks: Blob[] = [];
    private interval!: number;
    private intervalCallback: (blob: Blob) => void;
  
    constructor(stream: MediaStream, intervalCallback: (blob: Blob) => void) {
      this.mediaRecorder = new MediaRecorder(stream);
      this.intervalCallback = intervalCallback;
  
      this.mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      });
    }
  
    start(interval: number) {
      this.interval = interval;
      this.mediaRecorder.start();
  
      this.scheduleInterval();
    }
  
    stop() {
      this.mediaRecorder.stop();
      clearInterval(this.interval);
    }
  
    private scheduleInterval() {
      setInterval(() => {
        if (this.chunks.length > 0) {
          const completeBlob = new Blob(this.chunks, { type: this.chunks[0].type });
          this.intervalCallback(completeBlob);
          this.chunks = [];
        }
      }, this.interval);
    }
  }