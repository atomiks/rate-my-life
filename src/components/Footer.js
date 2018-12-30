import React from 'react'
import styled from 'styled-components'
import { Container } from './Framework'
import ExternalLink from './ExternalLink'

const FooterStyled = styled.footer`
  padding: 25px 0;
  background: ${props => props.theme.backgroundDark};
  text-align: center;
`

function Footer() {
  return (
    <FooterStyled>
      <Container>
        <p>
          Built in November 2018 by{' '}
          <ExternalLink href="https://github.com/atomiks">
            @atomiks
          </ExternalLink>{' '}
          on{' '}
          <ExternalLink href="https://github.com/atomiks/rate-my-life">
            GitHub
          </ExternalLink>
        </p>
        <p>
          Icons made by{' '}
          <ExternalLink href="https://www.freepik.com/">Freepik</ExternalLink>{' '}
          from{' '}
          <ExternalLink href="https://www.flaticon.com/">
            www.flaticon.com
          </ExternalLink>{' '}
          is licensed by{' '}
          <ExternalLink
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
