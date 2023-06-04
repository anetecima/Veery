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
  //border-radius: 100%;
  background: url('/${(props) => props.picture}') no-repeat;
  background-size: contain;
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

    <div style={{ padding: '0 40px 40px', flexGrow: 3 }}>
      <h2 style={{ textAlign: 'center' }}>The Band</h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MemberItem
          picture="pic-1.png"
          role="the basist"
          description="Deniz plays the baz"
          name="Deniz"
        />

        <MemberItem
          picture="pic-2.png"
          role="lead vocals"
          description="She has a voice of a veery"
          name="Beāte"
        />

        <MemberItem
          picture="pic-3.png"
          role="the drummer"
          description="Ruler of the beats"
          name="Jo"
        />

        <MemberItem
          picture="pic-4.png"
          role="the guitarist"
          description="Vizard of strings"
          name="Anete"
        />
      </div>
    </div>

    <Footer />
  </PageStyle>
)
