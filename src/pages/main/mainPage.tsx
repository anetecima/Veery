import styled from '@emotion/styled'
import { MidiDisplay } from './midiDisplay.tsx'

const LogoStyle = styled.div`
  width: 30%;
  aspect-ratio: 1;
  background: url('/veery.png') no-repeat center;
  background-size: cover;
`
const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: black;
  font-size: 50px;
`
const PageStyle = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

export const MainPage = () => (
  <PageStyle>
    <LogoWrapper>
      <LogoStyle />
      <div>VEERY</div>
    </LogoWrapper>

    <MidiDisplay />
  </PageStyle>
)
