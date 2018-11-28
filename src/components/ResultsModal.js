import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Transition } from 'react-spring'
import copy from 'copy-to-clipboard'
import Modal from './Modal'
import RatingCircle from './RatingCircle'
import ThemeContext from '../contexts/ThemeContext'
import { getRatingColor } from '../utils/rating'
import CATEGORIES from '../data/categories'
import THEMES from '../themes'

const Categories = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  list-style: none;
  margin: 25px auto 0;
`

const Category = styled.div`
  margin: 10px 0;
`

const Title = styled.h2`
  color: ${props => THEMES[props.theme].globalColor};
  margin-top: 0;
  text-align: center;
`

const CategoryTitle = styled.h4`
  text-align: center;
  margin: 0;
  font-weight: 500;
`

const CategoryImage = styled.img`
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  margin: 0 auto -15px;
  vertical-align: middle;
`

function ResultsModal({
  link,
  isVisible,
  rating,
  color,
  categoryRatings,
  dispatch
}) {
  const [theme] = useContext(ThemeContext)
  /*
  const [didCopy, setDidCopy] = useState(false)

  function copyLink() {
    copy(link)
    setDidCopy(true)
  }
  */

  return (
    <Transition
      native
      items={isVisible}
      from={{ transform: 'translate3d(0,40px,0)', opacity: 0 }}
      enter={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}
      leave={{ transform: 'translate3d(0,40px,0)', opacity: 0 }}
      config={{
        duration: isVisible ? undefined : 125,
        tension: 150,
        friction: 10
      }}
    >
      {item =>
        item
          ? props => (
              <Modal
                isVisible={isVisible}
                dispatch={dispatch}
                animation={props}
              >
                <Title theme={theme}>Your Life Rating</Title>
                <RatingCircle rating={rating} size={150} color={color}>
                  <CategoryTitle>Overall</CategoryTitle>
                </RatingCircle>
                <Categories>
                  {Object.keys(categoryRatings || {}).map(key => {
                    const rating = categoryRatings[key].rating
                    const color = getRatingColor(rating)
                    const name = key[0].toUpperCase() + key.slice(1)
                    return (
                      <Category key={key}>
                        <CategoryImage
                          src={CATEGORIES.find(cat => cat.name === name).image}
                          alt={name}
                        />
                        <RatingCircle rating={rating} size={100} color={color}>
                          <CategoryTitle>{name}</CategoryTitle>
                        </RatingCircle>
                      </Category>
                    )
                  })}
                </Categories>
              </Modal>
            )
          : null
      }
    </Transition>
  )
}

export default ResultsModal
