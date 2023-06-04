import styled from '@emotion/styled'
import { MidiDisplay } from './midiDisplay.tsx'
import { PageHeader } from './header.tsx'
import { PageIntro } from '../intro/introPage.tsx'
import { Footer } from './footer.tsx'

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

export const MainPage = () => (
  <PageStyle>
    <PageHeader />

    <PageIntro />

    <MidiDisplay />

    <Footer />
  </PageStyle>
)
