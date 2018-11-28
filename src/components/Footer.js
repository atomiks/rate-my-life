import React, { useContext } from 'react'
import styled from 'styled-components'
import { Container } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import ExternalLink from './ExternalLink'
import THEMES from '../themes'

const FooterStyled = styled.footer`
  padding: 25px 0;
  background: ${props => THEMES[props.theme].backgroundDark};
  text-align: center;
`

function Footer() {
  const [theme] = useContext(ThemeContext)

  return (
    <FooterStyled theme={theme}>
      <Container>
        <p>
          Built in November 2018 by{' '}
          <ExternalLink theme={theme} href="https://github.com/atomiks">
            @atomiks
          </ExternalLink>{' '}
          on{' '}
          <ExternalLink
            theme={theme}
            href="https://github.com/atomiks/rate-my-life"
          >
            GitHub
          </ExternalLink>
        </p>
        <p>
          Icons made by{' '}
          <ExternalLink theme={theme} href="https://www.freepik.com/">
            Freepik
          </ExternalLink>{' '}
          from{' '}
          <ExternalLink theme={theme} href="https://www.flaticon.com/">
            www.flaticon.com
          </ExternalLink>{' '}
          is licensed by{' '}
          <ExternalLink
            theme={theme}
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </ExternalLink>
        </p>
      </Container>
    </FooterStyled>
  )
}

export default Footer
