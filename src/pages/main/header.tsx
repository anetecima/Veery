import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { ActionBlock } from './actionBlock.tsx'

const LogoStyle = styled.div`
  width: 60px;
  aspect-ratio: 1;
  background: url('/veery-2.png') no-repeat center;
  background-size: contain;
`
const WrapperStyle = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  padding: 10px 40px;
  color: black;
  font-size: 46px;
  font-weight: 700;
  border-bottom: #cccccc solid 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;

  a,
  a:hover,
  a:visited {
    text-decoration: none;
    color: black;
  }

  .main-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Lato', sans-serif;

    &,
    &:hover,
    &:visited {
      text-decoration: none;
      color: black;
    }
  }
`

const NavigationStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 40px;

  a {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    transition: all 0.3s linear;

    &:hover {
      opacity: 0.5;
    }
  }
`

const Navigation = () => (
  <NavigationStyle>
    <Link to="/about">ABOUT US</Link>
  </NavigationStyle>
)

export const PageHeader = () => (
  <WrapperStyle>
    <Link to="/" className="main-logo">
      <LogoStyle />
      <div>VEERY</div>
    </Link>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ActionBlock />

      <Navigation />
    </div>
  </WrapperStyle>
)

export const PageHeaderMin = () => (
  <WrapperStyle>
    <Link to="/" className="main-logo">
      <LogoStyle />
      <div>VEERY</div>
    </Link>

    <Navigation />
  </WrapperStyle>
)
