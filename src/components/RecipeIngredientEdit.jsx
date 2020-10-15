import React from "react";

export default function RecipeIngrdientEdit({
    ingredient,
    handleIngredientChange,
    handleNewIngredientDelete,
}) {
    const handleChange = (changes) => {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
    };
    return (
      <>
        <input
          onChange={(e) => handleChange({ name: e.target.value })}
          value={ingredient.name}
          className="recipe-edit__input"
          type="text"
        />
        <input
          onChange={(e) => handleChange({ amount: e.target.value })}
          value={ingredient.amount}
          className="recipe-edit__input"
          type="text"
        />
        <button
          onClick={() => handleNewIngredientDelete(ingredient.id)}
          className="btn btn--danger"
        >
          &times;
        </button>
      </>
    );
}
