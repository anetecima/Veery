import styled from '@emotion/styled'
import { MidiDisplay } from './midiDisplay.tsx'


import { PageHeader } from './header.tsx'
import { PageIntro } from '../intro/introPage.tsx'
import { Footer } from './footer.tsx'
import { SessionSync } from '../../services/session-sync.ts'

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

const wsServerUrl = 'ws://127.0.0.1:8775'
const sessionSync = new SessionSync(wsServerUrl);

export const MainPage = () => (
  <PageStyle>
    <PageHeader sessionSync={sessionSync}/>

    <PageIntro />

    <MidiDisplay sessionSync={sessionSync} />
    
    <Footer />
  </PageStyle>
)
