import styled from '@emotion/styled'

const IntroStyle = styled.div`
  padding: 40px;
  width: 100%;
`

export const PageIntro = () => {
  return (
    <IntroStyle>
      <h1>Welcome to VEERY</h1>

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
          At VEERY, we transform your audio into MIDI using state-of-the-art AI,
          breaking down complex tonal landscapes and delivering unprecedented
          insight into your performances. But we're not just stopping there.
          We're on an exciting journey to incorporate cutting-edge noise
          reduction and advanced audio preprocessing technologies, bringing you
          pitch information with ultra-low latency. Stay tuned as VEERY
          continues to innovate in the realm of pitch tracking.
        </p>

        <h4>Current Features</h4>
        <ul>
          <li>
            <strong>Real-time Polyphonic Guitar Pitch Tracking:</strong>{' '}
            Precisely identify and track each note played on your guitar in real
            time.
          </li>
          <li>
            <strong>MIDI Transformation:</strong> Convert audio files into
            accurate and detailed MIDI files instantly.
          </li>
        </ul>

        <h4>Coming Soon</h4>
        <ul>
          <li>
            <strong>Integration of DeepFilterNet:</strong> Soon, you'll
            experience reduced noise and enhanced audio clarity with this
            cutting-edge speech enhancement technology.
          </li>
          <li>
            <strong>Advanced Audio Preprocessing Techniques:</strong> We're
            working on innovative signal processing strategies to further
            improve our pitch tracking accuracy and speed.
          </li>
          <li>
            <strong>Ultra-Low Latency Performance:</strong> We're striving to
            deliver pitch information with a maximum delay of just 20
            milliseconds for real-time feedback.
          </li>
          <li>
            <strong>Customizable Visualizations:</strong> In future updates,
            you'll be able to generate detailed comparison plots and graphics
            showcasing pitch changes over time.
          </li>
        </ul>

        <h4>Ongoing</h4>
        <ul>
          <li>
            <strong>User-friendly Interface:</strong> VEERY offers an intuitive
            and streamlined user experience, making your musical journey
            seamless.
          </li>
          <li>
            <strong>Continuous Improvement:</strong> We're committed to regular
            updates and optimizations for better performance and reliability.
          </li>
        </ul>
      </div>
    </IntroStyle>
  )
}
