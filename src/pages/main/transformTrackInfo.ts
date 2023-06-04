import { Track } from '@tonejs/midi'

export interface NoteData {
  duration: number
  octave: number
  time: number
  pitch: string
}
export type TrackData = { notes: NoteData[]; trackOffset: number }
export type CombinedTracks = Track[]
export const transformTrackInfo = (
  newTracks: Track[] = [],
  prevData: CombinedTracks[] = []
): Track[][] => {
  // console.log('-----------------')
  // console.log('prev data ', prevData)

  const trackAmount = Math.max(newTracks.length || 0, prevData.length || 0)
  // console.log('trackAmount ', trackAmount)

  const newCombinedTracks: CombinedTracks[] = [...Array(trackAmount)]
  const placeholder = [...Array(trackAmount)]

  // console.log('total track amount ', placeholder.length)

  placeholder.forEach((_, combinedTrackIndex) => {
    newCombinedTracks[combinedTrackIndex] = [
      ...[newTracks?.[combinedTrackIndex]],
      ...(prevData?.[combinedTrackIndex] || []),
    ].filter((track) => track)
  })

  // console.log('resultArray ', newCombinedTracks)
  // console.log('-----------------')

  return newCombinedTracks
}
