import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CSS_EASING, Container } from './Framework'
import ElasticScroll from './ElasticScroll'
import X from 'react-feather/dist/icons/x'
import focusTrap from 'focus-trap'
import { animated } from 'react-spring'

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 8, 16, 0.5);
  z-index: 9999;
  overflow-y: auto;
  padding: 25px 0;
  will-change: opacity;
  transition: opacity 0.15s;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  backdrop-filter: blur(10px);
`

const ModalStyled = styled.div`
  position: relative;
  background: ${props => props.theme.modalBackground};
  color: ${props => props.theme.fadedColor};
  box-shadow: 0 16px 32px -4px ${props => props.theme.shadowColor};
  padding: 25px 0;
  border-radius: 10px;
  width: 1000px;
  max-width: 100%;
  transform-origin: top;
  opacity: ${props => (props.isVisible ? 1 : 0.25)};
  transition: opacity 0.15s;
`

const XWrapper = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  cursor: pointer;
  padding: 20px;
  opacity: 0.8;
  transition: opacity 0.2s, transform 0.5s ${CSS_EASING.spring};
  color: inherit;
  background: none;
  border: none;

  &:hover {
    opacity: 1;
  }

  &:active {
    transform: scale(0.9);
  }

  svg {
    stroke: ${props => props.theme.color};
    width: 36px;
    height: 36px;
  }
`

const AnimatedModal = animated(ModalStyled)

function Modal({ isVisible, children, animation, dispatch }) {
  const background = useRef()
  const focusTrapInstance = useRef()

  useEffect(
    () => {
      // Prevent body from scrolling
      const value = isVisible ? 'hidden' : ''
      document.documentElement.style.overflow = value
      document.body.style.overflow = value

      if (!focusTrapInstance.current) {
        focusTrapInstance.current = focusTrap(background.current)
      }

      if (isVisible) {
        setTimeout(focusTrapInstance.current.activate, 20)
      } else {
        focusTrapInstance.current.deactivate()
      }
    },
    [isVisible],
  )

  function onTransitionEnd() {
    if (!isVisible) {
      background.current.scrollTop = 0
    }
  }

  function onClose() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  return (
    <ElasticScroll>
      <Background
        ref={background}
        isVisible={isVisible}
        tabIndex="-1"
        onMouseDown={event => {
          if (!event.target.closest('[data-modal]')) {
            onClose()
          }
        }}
      >
        <Container mobilePadding={2}>
          <AnimatedModal
            isVisible={isVisible}
            onTransitionEnd={onTransitionEnd}
            data-modal
            style={animation}
          >
            <XWrapper onClick={onClose}>
              <X />
            </XWrapper>
            <Container>{children}</Container>
          </AnimatedModal>
        </Container>
      </Background>
    </ElasticScroll>
  )
}

export default Modal
