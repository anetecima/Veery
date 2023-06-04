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
  width: 100%;
  padding: 10px 40px;
  color: black;
  font-size: 46px;
  font-weight: 700;
  border-bottom: #cccccc solid 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    gap: 10px;

    &,
    &:hover,
    &:visited {
      text-decoration: none;
      color: black;
    }
  }
`

export const PageHeader = () => (
  <WrapperStyle>
    <Link to="/">
      <LogoStyle />
      <div>VEERY</div>
    </Link>

    <ActionBlock />
  </WrapperStyle>
)
