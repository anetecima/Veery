import asyncio
import datetime
import random
import tensorflow as tf
from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH
from midiutil.MidiFile import MIDIFile
import websockets
from basic_pitch.inference import predict_and_save
import librosa
import aiofiles

basic_pitch_model = tf.saved_model.load(str(ICASSP_2022_MODEL_PATH))


async def process_audio(websocket, path):
    byte_data = await websocket.recv()

    timestamp = datetime.datetime.now().strftime("%H%M%S%f")
    # random number variable
    random_number = random.randint(1000, 5000)

    # Save the audio data to a .wav file
    audio_filename = f"audio_{timestamp}.mp3"
    mid_filename = f"audio_{timestamp}_basic_pitch.mid"

    with open(audio_filename, "wb") as audio_file:
        audio_file.write(byte_data)

    audio_paths = [audio_filename]
    try:
        predict_and_save(
            audio_paths,
            output_directory=f".",
            save_midi=True,
            sonify_midi=False,
            save_model_outputs=False,
            save_notes=False,
        )
    except ValueError:
        # If an error occurs (e.g., because the audio data is unprocessable),
        # create an empty MIDI file
        y, sr = librosa.load(audio_filename, sr=None)
        duration = librosa.get_duration(
            filename=audio_filename
        )  # get duration in seconds
        mf = MIDIFile(1)
        track = 0  # the only track
        time = 0  # start at the beginning
        mf.addTrackName(track, time, "Silent Track")
        mf.addTempo(track, time, 120)
        channel = 0
        pitch = 0  # silent note
        volume = 0  # silent
        mf.addNote(track, channel, pitch, time, duration, volume)
        with open(mid_filename, "wb") as outf:
            mf.writeFile(outf)
        print(
            f"Created empty MIDI file {mid_filename} due to unprocessable audio data."
        )

    # Read the MIDI file data into memory
    async with aiofiles.open(mid_filename, "rb") as midi_file:
        midi_data = await midi_file.read()

    # Send the MIDI file data back over WebSocket
    await websocket.send(midi_data)


start_server = websockets.serve(process_audio, "127.0.0.1", 8775)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
