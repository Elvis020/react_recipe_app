import React from 'react'
import Ingredient from './Ingredient'

const ingredientList = ({ingredients}) => {
    const ingredientElements = ingredients.map(ingre => {
        return <Ingredient key={ingre.id} {...ingre} />
    })
  return (
    <div className="ingredient-grid">{ingredientElements}</div>
    );
}

export default ingredientList
