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


audio_paths = ["output.mp3"]
predict_and_save(
    audio_paths,
    output_directory=f".",
    save_midi=True,
    sonify_midi=True,
    save_model_outputs=False,
    save_notes=False,
    minimum_frequency=50,
    maximum_frequency=7000,
)
