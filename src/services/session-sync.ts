import { Subject } from 'rxjs'

export class SessionSync {
  private readonly socket: WebSocket

<<<<<<< HEAD
  midiData = new Subject<any>()
=======
  midiData = new Subject<any>();
  isLoading = new Subject<boolean>();
>>>>>>> cf26f6d7978a627dcae4619bae3cf7be3c660e3e

  constructor(uri: string) {
    this.socket = new WebSocket(uri)

    this.socket.addEventListener('open', () => {
      console.log('WebSocket connection established')
    })

    this.socket.onmessage = (event) => {
      // Assuming the message is a Blob representing the MIDI file
      console.log('Received MIDI file:', event.data)
      const midiFileBlob = event.data
      // Generate a unique filename using UUID

      console.log('midi file: ', midiFileBlob)

<<<<<<< HEAD
      this.midiData.next(midiFileBlob)

      // Handle the incoming message as needed
=======
      this.midiData.next(midiFileBlob);
      this.isLoading.next(false);
      // Handle the incoming message as needed      
>>>>>>> cf26f6d7978a627dcae4619bae3cf7be3c660e3e
    }

    this.socket.onclose = function () {
      console.log('WebSocket connection closed.')
    }

    this.socket.onerror = (e) => {
      console.log('error in ws connection: ', e)
    }
  }

  sendAudioData(data: Blob): void {
    this.isLoading.next(true);
    this.socket.send(data);
  }

}
