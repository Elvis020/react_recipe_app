import React from 'react'
import Recipe from './Recipe';

export default function RecipeList({ recipes,delRecipe, addRecipeHandler }) {
  return (
    <>
      <div className="recipe-list">
        <div>
          {recipes.map((recipe) => {
            return <Recipe delRecipe={delRecipe} key={recipe.id} {...recipe} />;
          })}
        </div>
        <div className="recipe-list__add-recipe-btn-container">
          <button onClick={addRecipeHandler} className="btn btn--primary">
            Add Recipe
          </button>
        </div>
      </div>
    </>
  );
}
