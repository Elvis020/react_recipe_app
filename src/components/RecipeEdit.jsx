import React, { useContext } from "react";
import RecipeIngredientEdit from "./RecipeIngredientEdit";
import "../css/recipe-edit.css";
import uuidv4 from "uuid/v4";

import { RecipeContext } from "./App";

export default function RecipeEdit({ recipe }) {
  const { handleEditRecipe, handleSelectedRecipe } = useContext(RecipeContext);

  const handleChange = (changes) => {
    handleEditRecipe(recipe.id, { ...recipe, ...changes });
  };

  const handleIngredientChange = (id, ingredient) => {
    const newIngredient = [...recipe.ingredients];
    const index = newIngredient.findIndex((i) => i.id === id);
    // Swapping old ingredinet with new ingredinet
    newIngredient[index] = ingredient;
    // Adding new ingredinet to array of ingredinets
    handleChange({ ingredients: newIngredient });
  };

  // Adding a new Ingredient
  const handleNewIngredientAdd = () => {
    const newIngredient = {
      id: uuidv4(),
      name: "",
      amount: "",
    };
    handleChange({ ingredients: [...recipe.ingredients, newIngredient] });
  };

  // Deleting a new Ingredient
  const handleNewIngredientDelete = (id) => {
      handleChange({
        ingredients: recipe.ingredients.filter((ingre) => ingre.id !== id),
      });
  };
  return (
    <div className="recipe-edit">
      <div className="recipe-edit__remove-button-container">
        <button
          className="btn recipe-edit__remove-btn"
          onClick={() => handleSelectedRecipe(undefined)}
        >
          &times;
        </button>
      </div>
      <div className="recipe-edit__details-grid">
        <label className="recipe-edit__label" htmlFor="name">
          Name
        </label>
        <input
          value={recipe.name}
          onChange={(e) => handleChange({ name: e.target.value })}
          className="recipe-edit__input"
          type="text"
          name="name"
          id="name"
        />

        <label className="recipe-edit__label" htmlFor="cookTime">
          Cook Time
        </label>
        <input
          value={recipe.cookTime}
          onChange={(e) => handleChange({ cookTime: e.target.value })}
          className="recipe-edit__input"
          type="text"
          name="cookTime"
          id="cookTime"
        />

        <label className="recipe-edit__label" htmlFor="servings">
          Servings
        </label>
        <input
          value={recipe.servings}
          onChange={(e) =>
            handleChange({ servings: parseInt(e.target.value) || "" })
          }
          className="recipe-edit__input"
          type="number"
          min="1"
          name="servings"
          id="servings"
        />

        <label className="recipe-edit__label" htmlFor="instructions">
          Instructions
        </label>
        <textarea
          value={recipe.instructions}
          onChange={(e) => handleChange({ instructions: e.target.value })}
          className="recipe-edit__input"
          name="instructions"
          id="instructions"
          cols="30"
          rows="10"
        />
      </div>

      <br />
      <label className="recipe-edit__label">Ingredients</label>
      <div className="recipe-edit__ingredient-grid">
        <label>Name</label>
        <label>Amount</label>
        <div></div>
        {recipe.ingredients.map((ingredient) => (
          <RecipeIngredientEdit
            handleNewIngredientDelete={handleNewIngredientDelete}
            handleIngredientChange={handleIngredientChange}
            key={ingredient.id}
            ingredient={ingredient}
          />
        ))}

        {/* Ingrdients components */}
      </div>
      <div className="recipe-edit__add-ingredient-btn-container">
        <button
          onClick={() => handleNewIngredientAdd()}
          className="btn btn--primary"
        >
          Add Ingredient
        </button>
      </div>
    </div>
  );
}
