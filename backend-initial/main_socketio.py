import asyncio
import datetime
import random
import tensorflow as tf
from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH
from midiutil.MidiFile import MIDIFile
from tornado import web, websocket, ioloop
from basic_pitch.inference import predict_and_save
import librosa
import aiofiles

basic_pitch_model = tf.saved_model.load(str(ICASSP_2022_MODEL_PATH))


class ProcessAudioWebSocket(websocket.WebSocketHandler):
    async def open(self):
        print("WebSocket opened")

    async def on_message(self, message):
        byte_data = message

        timestamp = datetime.datetime.now().strftime("%H%M%S%f")
        random_number = random.randint(1000, 5000)

        audio_filename = f"audio_{timestamp}.webm"
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
            y, sr = librosa.load(audio_filename, sr=None)
            duration = librosa.get_duration(filename=audio_filename)
            mf = MIDIFile(1)
            track = 0
            time = 0
            mf.addTrackName(track, time, "Silent Track")
            mf.addTempo(track, time, 120)
            channel = 0
            pitch = 0
            volume = 0
            mf.addNote(track, channel, pitch, time, duration, volume)
            with open(mid_filename, "wb") as outf:
                mf.writeFile(outf)
            print(
                f"Created empty MIDI file {mid_filename} due to unprocessable audio data."
            )

        async with aiofiles.open(mid_filename, "rb") as midi_file:
            midi_data = await midi_file.read()

        await self.write_message(midi_data)

    def on_close(self):
        print("WebSocket closed")


def make_app():
    return web.Application(
        [
            (r"/websocket", ProcessAudioWebSocket),
        ]
    )


if __name__ == "__main__":
    app = make_app()
    app.listen(8775)
    ioloop.IOLoop.current().start()
