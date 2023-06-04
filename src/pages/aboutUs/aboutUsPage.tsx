import styled from '@emotion/styled'
import { PageHeaderMin } from '../main/header.tsx'
import { PageIntro } from '../intro/introPage.tsx'
import { Footer } from '../main/footer.tsx'

const PageStyle = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #ffffff;
`

const PictureStyle = styled.div<{ picture: string }>`
  width: 120px;
  height: 120px;
  border-radius: 100%;
  background: url('/${(props) => props.picture}') no-repeat;
  background-size: cover;
`

const MemberItem = ({
  name,
  role,
  description,
  picture,
}: {
  name: string
  role: string
  description: string
  picture: string
}) => (
  <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center' }}>
    <PictureStyle picture={picture} />

    <div style={{ paddingLeft: '20px' }}>
      <div style={{ fontWeight: 700 }}>
        {name} - {role}
      </div>

      <div>{description}</div>
    </div>
  </div>
)

export const AboutUsPage = () => (
  <PageStyle>
    <PageHeaderMin />

    <PageIntro />

    <div style={{ padding: '0 40px 40px' }}>
      <h2>The Band</h2>

      <div>
        <MemberItem
          picture="veery.jpeg"
          role="the basist"
          description="Deniz plays the bass"
          name="Deniz"
        />
        <MemberItem
          picture="veery.jpeg"
          role="the voice"
          description="Lead Vocals"
          name="Beāte"
        />
        <MemberItem
          picture="veery.jpeg"
          role="the drummer"
          description="ruler of the beats"
          name="Jo"
        />
        <MemberItem
          picture="veery.jpeg"
          role="the guitarist"
          description="Vizard of strings"
          name="Anete"
        />
      </div>
    </div>

    <Footer />
  </PageStyle>
)
