import styled from '@emotion/styled'

const FooterStyle = styled.div`
  text-align: center;
  font-size: 12px;
  padding: 40px;
  border-top: #cccccc solid 1px;
`

export const Footer = () => (
  <FooterStyle>
    © {new Date().getFullYear()} Veery. All rights reserved.
  </FooterStyle>
)
