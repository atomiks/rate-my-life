import React, { useContext, useState, useCallback } from 'react'
import styled from 'styled-components'
import { MEDIA, CSS_EASING } from './Framework'
import ThemeContext from '../contexts/ThemeContext'
import UserInputContext from '../contexts/UserInputContext'
import Tippy from './Tippy'
import CATEGORIES from '../data/categories'
import THEMES from '../themes'

const CategoriesStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${props => THEMES[props.theme].background};
  border-radius: 10px;
  transition: background 0.2s;
  margin-top: 10px;

  ${MEDIA.lg} {
    justify-content: center;
    background: none;
  }
`

const Category = styled.div`
  font-weight: 700;
  text-align: center;
  padding: 15px;
  width: 50%;
  border-radius: 8px;
  transition: box-shadow 0.2s, background 0.2s,
    transform 0.5s ${CSS_EASING.spring};
  transform: scale(1.001); /* Prevents a 1px jitter on Chrome. */

  ${MEDIA.sm} {
    width: 33.33333333%;
  }

  ${MEDIA.md} {
    width: 20%;
  }

  ${MEDIA.lg} {
    width: auto;
    flex: 1;
  }
`

const CategoryImage = styled.img`
  width: 60px;
  height: 60px;
  user-select: none;
`

const CategoryName = styled.div`
  font-size: 15px;

  ${MEDIA.sm} {
    font-size: 16px;
  }
`

const TIPPY_CONTENT = 'Tap on each for more info'

function Categories() {
  const [theme] = useContext(ThemeContext)
  const userInput = useContext(UserInputContext)
  const [isTooltipVisible, setIsTooltipVisible] = useState(true)

  const onMouseEnter = useCallback(() => {
    setIsTooltipVisible(false)
  }, [])

  return (
    <Tippy
      content={TIPPY_CONTENT}
      placement="top-end"
      trigger="manual"
      animation="fade"
      flip={false}
      arrow={true}
      isVisible={userInput === 'touch' && isTooltipVisible}
      hideOnClick={false}
      theme={'animated blue ' + (theme === 'dark' ? 'dark' : 'google')}
      isEnabled={false /* TODO */}
    >
      <CategoriesStyled
        theme={theme}
        onMouseEnter={onMouseEnter}
        aria-label={TIPPY_CONTENT}
      >
        {CATEGORIES.map((category, index) => (
          <Category key={category.name} theme={theme}>
            <CategoryImage src={category.image} draggable="false" />
            <CategoryName>{category.name}</CategoryName>
          </Category>
        ))}
      </CategoriesStyled>
    </Tippy>
  )
}

export default Categories
