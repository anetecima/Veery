import asyncio
import websockets
import librosa
import soundfile as sf
from io import BytesIO
import numpy as np
import time


async def send_audio_chunks():
    audio_path = "audio_file.wav"

    # Load the audio file using librosa with original sample rate, and ensure it's mono
    y, sr = librosa.load(audio_path, sr=None, mono=True)

    # Detect non-silent parts
    non_silent_ranges = librosa.effects.split(
        y, top_db=20
    )  # you can adjust the top_db parameter to your needs

    # Concatenate non-silent parts
    y = np.concatenate([y[start:end] for (start, end) in non_silent_ranges])
    # Write the non-silent audio data to a new file
    sf.write("processed.wav", y, sr)

    # Calculate chunk size based on sample rate
    chunk_size = int(sr * 0.02)  # One second chunks

    # Split the audio data into 1-second chunks
    if len(y) < chunk_size:
        audio_chunks = [y]
    else:
        audio_chunks = [y[i : i + chunk_size] for i in range(0, len(y), chunk_size)]

    for audio_chunk in audio_chunks:
        async with websockets.connect("ws://localhost:8775") as websocket:
            print(f"Sending audio chunk: {audio_chunk}")
            # Convert audio chunk to bytes
            byte_data = BytesIO()
            sf.write(byte_data, audio_chunk, sr, format="WAV")
            byte_data.seek(0)  # Important to reset the stream position

            start_time = time.time()
            await websocket.send(byte_data.read())
            midi_file_path = await websocket.recv()
            end_time = time.time()

            print(f"MIDI file path: {midi_file_path}")
            print(f"Time taken to write MIDI file: {end_time - start_time:.4f} seconds")


asyncio.get_event_loop().run_until_complete(send_audio_chunks())
