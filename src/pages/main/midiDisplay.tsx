import { Midi, Track } from '@tonejs/midi'
import { Fragment, useEffect, useState } from 'react'
import styled from '@emotion/styled'

const MidiStyle = styled.div`
  width: 100%;
  padding: 40px;
`

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const noteTrackColors = [
  'white',
  '#b0b0b0',
  'white',
  '#b0b0b0',
  'white',
  'white',
  '#b0b0b0',
  'white',
  '#b0b0b0',
  'white',
  '#b0b0b0',
  'white',
]
const heightUnit = 100
const noteAmount = 12
const midiHeight = heightUnit * noteAmount * 8

export const MidiDisplay = () => {
  const [tracks, setTracks] = useState<Track[]>([])

  const uploadMidi = async () => {
    const midi = await Midi.fromUrl('/test_audio.mid')
    // const name = midi.name
    // console.log(name)
    // console.log(midi)
    setTracks(midi?.tracks || [])
  }

  useEffect(() => {
    uploadMidi()
  }, [])

  return tracks.length ? (
    <MidiStyle>
      <svg viewBox={`0 0 ${30000} ${midiHeight} `} transform="scale(1, -1)">
        {[...Array(8)].map((_octave, octaveIndex) => {
          return (
            <Fragment key={octaveIndex}>
              {notes.map((_note, index) => (
                <Fragment key={`note_${octaveIndex}_${index}`}>
                  {/* note */}

                  <rect
                    fill={noteTrackColors[index % noteAmount]}
                    stroke="#b0b0b0"
                    width={30000}
                    height={heightUnit}
                    x={0}
                    y={
                      index * heightUnit + octaveIndex * heightUnit * noteAmount
                    }
                  />
                </Fragment>
              ))}
              {/* octave */}
              <text
                fontSize={300}
                fontWeight={600}
                stroke="red"
                fill="red"
                x={0}
                y={octaveIndex * heightUnit * noteAmount}
                alignmentBaseline="before-edge"
              >
                {octaveIndex + 1}va
              </text>
            </Fragment>
          )
        })}
        )
        {tracks.map((track, trackIndex) => {
          return track?.notes
            .filter((note) => note.time < 30)
            .map((note, noteIndex) => (
              <rect
                key={`note_${trackIndex}_${noteIndex}`}
                fill={`hsl( ${(360 / tracks.length) * trackIndex}, 100%, 50%)`}
                x={note.time * 1000}
                y={notes.indexOf(note.pitch) * heightUnit * note.octave}
                width={note.duration * 1000}
                height={heightUnit}
              />
            ))
        })}
      </svg>
    </MidiStyle>
  ) : null
}
