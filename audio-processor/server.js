const WebSocket = require('ws')
const fs = require('fs')
const { spawn } = require('child_process')
const { v4: uuidv4 } = require('uuid')

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  console.log('A client connected')

  ws.on('message', (message) => {
    // Assuming the message is an audio blob received from the client
    const audioBlob = Buffer.from(message)

    // Generate a unique filename using UUID
    const uniqueFileName = `${uuidv4()}.oog`

    // Save the audio blob to a WAV file with the unique filename
    const oogFilePath = uniqueFileName
    fs.writeFileSync(oogFilePath, audioBlob)

    // Convert the WAV file to MP3 using ffmpeg
    const mp3FilePath = `${uniqueFileName}.mp3`
    const ffmpegProcess = spawn('ffmpeg', [
      '-i',
      oogFilePath,
      '-codec:a',
      'libmp3lame',
      '-qscale:a',
      '2',
      mp3FilePath,
    ])

    ffmpegProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Audio conversion completed successfully.')

        // Read the converted MP3 file
        const mp3Data = fs.readFileSync(mp3FilePath)

        // Establish a WebSocket connection to the other server
        const otherServerWebSocket = new WebSocket('ws://127.0.0.1:8775')

        otherServerWebSocket.on('open', () => {
          // Send the MP3 data to the other server
          otherServerWebSocket.send(mp3Data)

          console.log('MP3 data sent to the other server.')

          // Close the WebSocket connection
          otherServerWebSocket.close()

          // Remove temporary files
          fs.unlinkSync(oogFilePath)
          fs.unlinkSync(mp3FilePath)
        })

        otherServerWebSocket.on('message', (data) => {
          console.log('message from server: ', data)
        })

        otherServerWebSocket.on('error', (error) => {
          console.error(
            'Error occurred while connecting to the other server:',
            error
          )

          //   // Remove temporary files
          //   fs.unlinkSync(oogFilePath);
          //   fs.unlinkSync(mp3FilePath);
        })
      } else {
        console.error('Audio conversion failed with code:', code)

        // // Remove temporary files
        // fs.unlinkSync(oogFilePath);
        // fs.unlinkSync(mp3FilePath);
      }
    })
  })

  ws.on('close', () => {
    console.log('A client disconnected')
  })
})

console.log('server running on 8080')
