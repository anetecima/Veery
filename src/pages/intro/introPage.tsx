import styled from '@emotion/styled'

const IntroStyle = styled.div`
  padding: 40px;
  width: 100%;
`
export const PageIntro = () => {
  return (
    <IntroStyle>
      <h1>Welcome to VEERY - the app</h1>

      <div>
        <h6
          style={{
            fontWeight: 400,
            fontSize: '20px',
            margin: 0,
            fontFamily: 'Lato, sans-serif',
            fontStyle: 'italic',
          }}
        >
          You want your pitch - we got it!
        </h6>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          tempor turpis at neque tincidunt tristique. Nulla magna risus,
          ultrices egestas fermentum vitae, elementum in nibh. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Aliquam ac imperdiet elit. Maecenas eu lectus sed urna
          pellentesque placerat. Donec in lorem sed urna bibendum dignissim eu
          et quam. Curabitur lectus mauris, venenatis in est vitae, malesuada
          venenatis erat. Integer laoreet diam id augue ultrices hendrerit. Sed
          eleifend eget lorem eu laoreet. Sed scelerisque risus ac magna laoreet
          tempus.
        </p>

        <p>
          Nunc id metus eget velit viverra maximus et eu justo. Suspendisse vel
          ex sollicitudin, blandit leo quis, lobortis erat. Mauris eget ante nec
          magna sodales aliquam. Mauris ut neque quis velit dignissim efficitur.
          Nunc efficitur eget justo eget pharetra. Nunc volutpat in tellus id
          imperdiet. Cras in felis eleifend, rutrum ipsum nec, interdum tortor.
          Suspendisse quis nunc in arcu sagittis molestie. Mauris eget diam non
          eros laoreet lobortis. Aenean a laoreet ligula, egestas vestibulum
          quam. Phasellus sagittis mi tellus, et feugiat dui fermentum quis. Sed
          cursus convallis quam, eget posuere sapien lacinia vel. Morbi
          tincidunt felis ut neque vulputate gravida. Donec in malesuada ante,
          ut ultrices sapien.
        </p>
      </div>
    </IntroStyle>
  )
}
