import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

export class SessionSync {
  private readonly socket: WebSocket

  constructor(uri: string) {
    this.socket = new WebSocket(uri)

    // Event handler for successful connection
    this.socket.onopen = function (event) {
      console.log('WebSocket connection established.', event)
    }

    this.socket.onmessage = function(event) {      
         // Assuming the message is a Blob representing the MIDI file
         const midiFileBlob = event.data;
         // Generate a unique filename using UUID
         const uniqueFileName = `${uuidv4()}.mid`;

         // Save the MIDI file with the unique filename
         fs.writeFile(uniqueFileName, midiFileBlob, (error) => {
             if (error) {
                 console.error('Error saving MIDI file:', error);
                } else {
                console.log('MIDI file saved successfully:', uniqueFileName);
                }
            });
        // Handle the incoming message as needed
    };

    this.socket.onclose = function (event) {
      console.log('WebSocket connection closed.')
    }
  }

  sendAudioData(data: Blob): void {
    this.socket.send(data)
  }
}
