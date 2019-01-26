import React from 'react'
import styled, { withTheme } from 'styled-components'
import { MEDIA, Container } from './Framework'
import Categories from './Categories'
import ThemeToggler from './ThemeToggler'
import Tippy from './Tippy'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import QUESTIONS from '../data/questions'

const HeaderStyled = styled.header`
  text-align: center;
`

const Heading = styled.h2`
  margin-bottom: 15px;
  text-align: center;
`

const Description = styled.div`
  text-align: left;

  p {
    margin-top: 10px;
  }
`

const Version = styled.a`
  text-align: center;
  color: ${props => props.theme.fadedColor};
  font-weight: bold;
  font-size: 14px;
  position: absolute;
  left: 5%;
  top: -38px;
  text-decoration: none;

  ${MEDIA.md} {
    top: 10px;
  }
`

const ThemeTogglerWrapper = styled.div`
  position: absolute;
  top: -45px;
  right: 5%;
  text-align: center;

  ${MEDIA.md} {
    top: 0px;
  }
`

const LogoWrapper = styled.div`
  position: relative;
  height: 230px;
  max-width: 300px;
  margin: 60px auto -10px;

  @media (min-width: 400px) {
    height: 250px;
  }

  ${MEDIA.md} {
    margin-top: 20px;
  }
`

const Logo = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`

function Header({ theme }) {
  return (
    <HeaderStyled>
      <Container>
        <Tippy content="Contribute on GitHub" theme={theme.tippy} size="small">
          <Version href="https://github.com/atomiks/rate-my-life">
            View Source
          </Version>
        </Tippy>
        <ThemeTogglerWrapper>
          <ThemeToggler />
        </ThemeTogglerWrapper>
        <LogoWrapper>
          {/* Toggling `src` is laggier than toggling the display style. */}
          <Logo
            src={logoLight}
            alt="Rate My Life"
            draggable="false"
            isVisible={theme.$type === 'light'}
          />
          <Logo
            src={logoDark}
            alt="Rate My Life"
            draggable="false"
            isVisible={theme.$type === 'dark'}
          />
        </LogoWrapper>
        <Description>
          <p>
            Welcome to the Rate My Life Quiz! There are {QUESTIONS.length}{' '}
            questions asking about your life presented as statements. Your job
            is to answer them by choosing how much you agree or disagree with
            them.
          </p>

          <Heading>Life Categories</Heading>
          <Categories />
          <p>
            Your life rating will be broken down into 7 different categories.
            For each question, press the circle which best represents your
            answer. Good luck!
          </p>
        </Description>
      </Container>
    </HeaderStyled>
  )
}

export default withTheme(Header)
