import { Subject } from 'rxjs'

export class SessionSync {
  private readonly socket: WebSocket

  midiData = new Subject<any>()

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

      this.midiData.next(midiFileBlob)

      // Handle the incoming message as needed
    }

    this.socket.onclose = function () {
      console.log('WebSocket connection closed.')
    }

    this.socket.onerror = (e) => {
      console.log('error in ws connection: ', e)
    }
  }

  sendAudioData(data: Blob): void {
    this.socket.send(data)
  }
}
