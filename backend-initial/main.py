import asyncio
import datetime
import tensorflow as tf
from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH
from midiutil.MidiFile import MIDIFile
import websockets
from basic_pitch.inference import predict_and_save
import random

basic_pitch_model = tf.saved_model.load(str(ICASSP_2022_MODEL_PATH))


async def process_audio(websocket, path):
    byte_data = await websocket.recv()
    timestamp = datetime.datetime.now().strftime("%H%M%S%f")
    # random number variable
    random_number = random.randint(1000, 5000)

    # Save the audio data to a .wav file
    #
    audio_filename = f"audio_{timestamp}.wav"
    mid_filename = f"audio_{timestamp}_basic_pitch.mid"

    with open(audio_filename, "wb") as audio_file:
        audio_file.write(byte_data)

    audio_paths = [audio_filename]
    predict_and_save(
        audio_paths,
        output_directory=f".",
        save_midi=True,
        sonify_midi=False,
        save_model_outputs=False,
        save_notes=False,
    )

    await websocket.send(mid_filename)


start_server = websockets.serve(process_audio, "127.0.0.1", 8775)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
