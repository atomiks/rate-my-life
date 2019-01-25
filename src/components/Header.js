import React from 'react'
import styled, { withTheme } from 'styled-components'
import { MEDIA, Container } from './Framework'
import AgreementScale from './AgreementScale'
import Categories from './Categories'
import ThemeToggler from './ThemeToggler'
import Tippy from './Tippy'
import logoLight from '../assets/logo-light.svg'
import logoDark from '../assets/logo-dark.svg'
import { version } from '../../package.json'
import QUESTIONS from '../data/questions'

const HeaderStyled = styled.header`
  text-align: center;
`

const Heading = styled.h2`
  margin-bottom: 0;
`

const Description = styled.div`
  text-align: left;

  p {
    margin-top: 10px;
  }
`

const AgreementScaleWrapper = styled.div`
  margin: 20px 0 0;
  padding: 25px 0;

  ${MEDIA.md} {
    margin: 0;
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
        <Tippy
          animateFill={false}
          content="Contribute on GitHub"
          arrow={true}
          theme={theme.tippy}
        >
          <Version href="https://github.com/atomiks/rate-my-life">
            v{version}
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
            It's likely you'll receive varying scores in different categories.
          </p>

          <Heading>Agreement Scale</Heading>
          <p>
            Below is a static representation of the scale. The leftmost circle
            indicates strong disagreement, while the rightmost circle indicates
            strong agreement. The gray middle circle represents neutral
            agreement.
          </p>
          <AgreementScaleWrapper>
            <AgreementScale displayTitles={true} isStatic />
          </AgreementScaleWrapper>

          <Heading>Upon Completion</Heading>
          <p>
            You'll receive your overall life rating out of 100, along with a
            rating out of 100 for each different category.
          </p>

          <Heading>Start!</Heading>
          <p>
            For each question, press the circle which best represents your
            answer. Good luck!
          </p>
        </Description>
      </Container>
    </HeaderStyled>
  )
}

export default withTheme(Header)
