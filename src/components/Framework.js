import React, { useContext } from 'react'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'
import ThemeContext from '../contexts/ThemeContext'
import THEMES from '../themes'

export const MEDIA = {
  xs: '@media (min-width: 360px)',
  sm: '@media (min-width: 576px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 992px)',
  xl: '@media (min-width: 1200px)',
}

export const CSS_EASING = {
  spring: 'cubic-bezier(0.53, 2.5, 0.36, 0.85)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
}

const hover = keyframes`
  from {
    transform: translateY(-12px);
  }
  to {
    transform: translateY(-20px);
  }
`

export const TippyThemes = createGlobalStyle`
  .tippy-tooltip {
    max-width: 500px;
  }

  @media (max-width: 500px) {
    .tippy-popper {
      max-width: 96%;
    }
  }

  .tippy-tooltip.blue-theme {
    background-color: ${THEMES.light.blue};
    box-shadow: 0 15px 30px -2px ${props => props.theme.shadowColor};
    font-size: 13px;
    font-weight: 600;
    padding: 3px 6px 4px;
    color: white;

    &[data-size="large"] {
      font-size: 15px;
      padding: 4px 8px;
    }
  }

  .tippy-tooltip.animated-theme {
    animation: ${hover} 0.8s ease infinite alternate;
  }

  .tippy-popper[x-placement^='top'] .tippy-tooltip.blue-theme .tippy-arrow {
    border-top-color: ${THEMES.light.blue};
  }
  .tippy-popper[x-placement^='bottom'] .tippy-tooltip.blue-theme .tippy-arrow {
    border-bottom-color: ${THEMES.light.blue};
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.blue-theme .tippy-arrow {
    border-left-color: ${THEMES.light.blue};
  }
  .tippy-popper[x-placement^='right'] .tippy-tooltip.blue-theme .tippy-arrow {
    border-right-color: ${THEMES.light.blue};
  }

  .tippy-tooltip.translucent-theme {
    font-weight: 600;
    background-color:${THEMES.dark.backgroundDark};
    backdrop-filter: blur(10px);

    .tippy-backdrop {
      background-color: ${THEMES.dark.backgroundDark};
    }

    .tippy-roundarrow {
      fill: ${THEMES.dark.backgroundDark};
    }
  }
  .tippy-popper[x-placement^='top'] .tippy-tooltip.translucent-theme .tippy-arrow {
    border-top-color: ${THEMES.dark.backgroundDark};
  }
  .tippy-popper[x-placement^='bottom'] .tippy-tooltip.translucent-theme .tippy-arrow {
    border-bottom-color: ${THEMES.dark.backgroundDark};
  }
  .tippy-popper[x-placement^='left'] .tippy-tooltip.translucent-theme .tippy-arrow {
    border-left-color: ${THEMES.dark.backgroundDark};
  }
  .tippy-popper[x-placement^='right'] .tippy-tooltip.translucent-theme .tippy-arrow {
    border-right-color: ${THEMES.dark.backgroundDark};
  }

  .tippy-tooltip.left-aligned-theme {
    text-align: left;
    width: fit-content;
  }

  .tippy-tooltip.hint-theme {
    font-size: 15px;
    padding: 15px;
    max-width: 350px;

    .tippy-arrow {
      transform: scale(1.5);
    }
  }

  .tippy-tooltip.agreement-button-theme {
    font-size: 12px;
    padding: 4px 8px;
    font-weight: 500;

    .tippy-backdrop {
      background: #191d2e;
    }
  }
`

export const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: ${props => props.theme.globalBackground};
    color: ${props => props.theme.globalColor};
    line-height: 1.6;
    font-size: 17px;
    transition-property: background, color;
    transition-duration: 0.2s;
    margin: 0;
    padding: 0;
  }

  :focus:not(.focus-visible) {
    outline: 0;
  }

  &::-moz-selection {
    background-color: rgba(50, 50, 255, 0.5);
    color: white;
  }
  &::selection {
    background-color: rgba(50, 50, 255, 0.5);
    color: white;
  }
`

export const Center = styled.div`
  text-align: center;
`

export const Container = styled.div`
  position: relative;
  max-width: 1000px;
  padding: 0 ${props => props.mobilePadding}%;
  margin: 0 auto;

  ${MEDIA.sm} {
    padding: 0 25px;
  }

  ${MEDIA.md} {
    padding: 0 40px;
  }

  ${MEDIA.lg} {
    padding: 0 50px;
  }
`
Container.defaultProps = {
  mobilePadding: 5,
}

export const Row = styled(({ children, spacing, ...rest }) => (
  <div {...rest}>{children}</div>
))`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -${props => props.spacing}px;
`
Row.defaultProps = {
  spacing: 15,
}

export const Col = styled(
  ({ children, base, xs, sm, md, lg, xl, spacing, ...rest }) => (
    <div {...rest}>{children}</div>
  ),
)`
  flex: 1;
  padding: 0 ${props => props.spacing}px;
  ${props =>
    props.base &&
    css`
      flex-basis: ${props => (100 * props.base) / 12}%;
    `}
  ${props =>
    ['xs', 'sm', 'md', 'lg', 'xl']
      .filter(size => props[size])
      .map(
        size => css`
          ${MEDIA[size]} {
            flex-basis: ${props => (100 * props[size]) / 12}%;
          }
        `,
      )};
`
Col.defaultProps = {
  spacing: 15,
}

const ButtonStyled = styled.button`
  background: ${props => props.theme.background};
  background-clip: ${props =>
    props.theme.$type === 'light' ? 'padding-box' : undefined};
  display: inline-block;
  padding: ${props => (props.size === 'large' ? '12px 20px' : '8px 14px')};
  color: ${props => props.theme.blue};
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  will-change: opacity;
  transition: border 0.25s, background 0.25s, box-shadow 0.25s,
    transform 0.5s ${CSS_EASING.spring};
  background-size: 101% 100%;
  font-size: ${props => (props.size === 'large' ? '18px' : '15px')};
  border: 1px solid ${props => props.theme.borderColor};
  cursor: pointer;
  transform: scale(1.0001);
  user-select: none;

  &:hover {
    filter: brightness(1.2);
    box-shadow: 0 12px 40px -8px ${props => props.theme.shadowColor};
    border-color: transparent;
  }

  &:active {
    filter: none;
    box-shadow: 0 4px 20px -4px ${props => props.theme.shadowColor};
    transform: scale(0.98);
  }

  &[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7;
    filter: none;
  }
`

export function Button({ children, ...rest }) {
  const [theme] = useContext(ThemeContext)
  return (
    <ButtonStyled {...rest} theme={theme}>
      {children}
    </ButtonStyled>
  )
}
Button.defaultProps = {
  type: 'primary',
}
