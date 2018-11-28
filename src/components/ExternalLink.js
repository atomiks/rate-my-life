import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import THEMES from '../themes'

const Link = styled.a`
  text-decoration: none;
  color: ${props => THEMES[props.theme].blue};
  border-bottom: 1px solid transparent;
  transition-property: border-bottom-color, color;
  transition-duration: 0.2s;
  padding-bottom: 4px;

  &:hover {
    border-bottom-color: ${props =>
      transparentize(0.25, THEMES[props.theme].blue)};
  }
`

function ExternalLink({ children, ...rest }) {
  return (
    <Link {...rest} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}

export default ExternalLink
