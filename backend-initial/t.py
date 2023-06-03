import asyncio
import datetime
import tensorflow as tf
from basic_pitch.inference import predict
from basic_pitch import ICASSP_2022_MODEL_PATH
from midiutil.MidiFile import MIDIFile
import websockets
from basic_pitch.inference import predict_and_save
import os

basic_pitch_model = tf.saved_model.load(str(ICASSP_2022_MODEL_PATH))


audio_file = "./audio_file.wav"
timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")
# create  a timestamp variable in python with miliseconds with no date only clocktime
timestamp = datetime.datetime.now().strftime("%H%M%S%f")
audio_paths = ["audio_file.wav"]
predict_and_save(
    audio_paths,
    output_directory=f".",
    save_midi=True,
    sonify_midi=False,
    save_model_outputs=False,
    save_notes=False,
)
# rename audio_file_basic_pitch.mid to output-mid-<timestamp>.mid
os.rename("audio_file_basic_pitch.mid", f"output-mid-{timestamp}.mid")
