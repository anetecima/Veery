import { v4 as uuidv4 } from 'uuid'

export class SessionSync {
  private readonly socket: WebSocket

  constructor(uri: string) {
    this.socket = new WebSocket(uri)

    // Event handler for successful connection
    this.socket.onopen = function (event) {
      console.log('WebSocket connection established.', event)
    }

    this.socket.onmessage = function (event) {
      // Assuming the message is a Blob representing the MIDI file
      console.log('Received MIDI file:', event.data)
      const midiFileBlob = event.data
      // Generate a unique filename using UUID

      console.log('midi file: ', midiFileBlob);
      
      // Handle the incoming message as needed
    }

    this.socket.onclose = function (event) {
      console.log('WebSocket connection closed.')
    }

    this.socket.onerror = (e)=>{
      console.log('error in ws connection: ', e);
    }
  }

  sendAudioData(data: Blob): void {
    this.socket.send(data)
  }
}
