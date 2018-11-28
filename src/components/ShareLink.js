import React, { useContext } from 'react'
import styled, { css, keyframes } from 'styled-components'
import ElasticScroll from './ElasticScroll'
import Tippy from './Tippy'
import { CSS_EASING, Button } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import Link from 'react-feather/dist/icons/link'
import THEMES from '../themes'

const LinkWrapper = styled.div`
  display: inline-block;
  background: ${props => THEMES[props.theme].globalBackground};
  border: 1px solid ${props => THEMES[props.theme].borderColor};
  padding: 8px 16px;
  border-radius: 6px;
  margin-top: 25px;
  border-radius: 4px 0 0 4px;
  height: 45px;
  max-width: calc(100% - 90px);
  overflow-x: auto;
  white-space: nowrap;
  vertical-align: bottom;
  transition-property: background, border-color;
  transition-duration: 0.2s;

  [data-elastic-wrapper] {
    display: inline-block;
  }

  &:focus {
    background: ${props =>
      props.theme === 'dark' ? THEMES.dark.backgroundDark : 'white'};
    border-color: ${props => THEMES.light.blue};

    + button {
      border-color: ${props => THEMES.light.blue};
    }
  }
`

const copyAnimation = keyframes`
  0% {
    transform: translate(-50%, -10px);
    opacity: 0;
  }
  70% {
    transform: translate(-50%, -40px);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -40px);
    opacity: 0;
  }
`

const LinkButton = styled(Button)`
  position: relative;
  background: ${props => THEMES.light.blue};
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 0 4px 4px 0;
  height: 45px;
  margin-left: -1px;
  width: 90px;

  &:active {
    transform: scale(1);
  }

  &::after {
    content: 'Copied!';
    position: absolute;
    left: 50%;
    top: 0;
    background: ${props =>
      props.theme === 'light' ? 'rgba(0, 8, 16, 0.7)' : 'rgba(0, 8, 16, 0.4)'};
    font-size: 13px;
    border-radius: 4px;
    opacity: 0;
    pointer-events: none;
    animation: ${props =>
      props.didCopy &&
      css`
        ${copyAnimation} 2s ${CSS_EASING.easeOutQuart} forwards
      `};
    padding: 4px 8px;
    color: white;
    font-weight: 600;
  }
`

function ShareLink({ link, onCopy, didCopy, setDidCopy }) {
  const [theme] = useContext(ThemeContext)

  return (
    <>
      <ElasticScroll>
        <LinkWrapper theme={theme} tabIndex="0">
          <Link
            width="18"
            height="18"
            style={{ verticalAlign: '-3px', marginRight: '5px' }}
          />
          {link}
        </LinkWrapper>
      </ElasticScroll>
      <Tippy
        content="Copy to clipboard"
        theme={theme === 'light' ? 'google' : 'translucent'}
        touch={false}
        appendTo={ref => ref.parentNode}
      >
        <LinkButton
          theme={theme}
          onClick={onCopy}
          didCopy={didCopy}
          onAnimationEnd={() => {
            setDidCopy(false)
          }}
        >
          Copy
        </LinkButton>
      </Tippy>
    </>
  )
}

export default ShareLink
