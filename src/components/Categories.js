import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import { MEDIA, CSS_EASING } from './Framework'
import CATEGORIES from '../data/categories'

const CategoriesStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  transition: background 0.2s, border-color 0.2s;
  margin-top: 10px;
  margin-bottom: 20px;
  background: ${props => transparentize(0.6, props.theme.background)};
  border: 1px solid ${props => props.theme.borderColor};

  ${MEDIA.lg} {
    justify-content: center;
  }
`

const Category = styled.div`
  font-weight: 700;
  padding: 15px;
  width: 50%;
  transition: box-shadow 0.2s, background 0.2s,
    transform 0.5s ${CSS_EASING.spring};
  transform: scale(1.001); /* Prevents a 1px jitter on Chrome. */
  text-align: center;

  @media (min-width: 420px) {
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
  width: 80px;
  height: 80px;
  user-select: none;

  ${MEDIA.lg} {
    width: 70px;
    height: 70px;
  }
`

const CategoryName = styled.div`
  font-size: 18px;

  ${MEDIA.lg} {
    font-size: 16px;
  }
`

function Categories() {
  return (
    <CategoriesStyled>
      {CATEGORIES.map(category => (
        <Category key={category.name}>
          <CategoryImage src={category.image} draggable="false" />
          <CategoryName>{category.name}</CategoryName>
        </Category>
      ))}
    </CategoriesStyled>
  )
}

export default Categories
