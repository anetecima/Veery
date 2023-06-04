let mediaRecorder
let chunks = []
let ws

const startButton = document.getElementById('startRecording')
const stopButton = document.getElementById('stopRecording')

// Create WebSocket connection.
ws = new WebSocket('ws://localhost:8775')

// Connection opened
ws.addEventListener('open', function (event) {
  console.log('Connection opened.')
})

// Listen for messages
ws.addEventListener('message', function (event) {
  console.log('Received MIDI data from server.')

  // Create a Blob object from the MIDI data
  const midiBlob = new Blob([event.data], { type: 'audio/midi' })

  // Generate a URL from the Blob
  const url = URL.createObjectURL(midiBlob)

  // Create a link and click it to download the file
  const link = document.createElement('a')
  link.href = url
  link.download = `audio_${new Date().toISOString()}.midi`
  link.click()
})

// Connection closed
ws.addEventListener('close', function (event) {
  console.log('Connection closed.')
})

// Connection error
ws.addEventListener('error', function (event) {
  console.log('Connection error.')
})

startButton.onclick = async () => {
  // Request access to the microphone
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  // Create a MediaRecorder instance
  mediaRecorder = new MediaRecorder(stream)

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data)

    if (chunks.length >= 1) {
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType })

      // Send the blob data over the WebSocket connection
      ws.send(blob)

      // Clear the chunks
      chunks = []
    }
  }

  // Start recording
  mediaRecorder.start(5000) // Record a chunk every second
}

stopButton.onclick = () => {
  // Stop recording
  mediaRecorder.stop()
}
