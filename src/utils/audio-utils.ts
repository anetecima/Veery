
import encodeWAV from 'audiobuffer-to-wav';

export function convertToWAV(audioBuffer: AudioBuffer): Blob {
    const wavData = encodeWAV(audioBuffer);
    const blob = new Blob([wavData], { type: 'audio/wav' });
    return blob;
  }

 