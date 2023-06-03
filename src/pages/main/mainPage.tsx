import styled from '@emotion/styled'
const LogoStyle = styled.div`
  width: 50%;
  aspect-ratio: 1;
  background: url('/veery.jpg') no-repeat center;
  background-size: cover;
`
const PageStyle = styled.div`
  width: 100%;
  min-width: 100vw;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const MainPage = () => (
  <>
    <PageStyle>
      <LogoStyle />

      <div>VEERY</div>
    </PageStyle>
  </>
)
