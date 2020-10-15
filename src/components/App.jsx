import React, { useState, useEffect } from 'react';
import RecipeEdit from './RecipeEdit';
import RecipeList from './RecipeList';
import '../css/app.css';
import uuidv4 from 'uuid/v4';
const LOCAL__STORAGE__KEY = 'cookingWithReact.recipes';


// This initializes the context to be used
export const RecipeContext = React.createContext();

function App() {
  const [recipes, setRecipes] = useState(sampleList);

  useEffect(() => {
    const arrayRecipes = localStorage.getItem(LOCAL__STORAGE__KEY);
    if(arrayRecipes != null) setRecipes(JSON.parse(arrayRecipes));
  }, [])


  useEffect(() => {
    localStorage.setItem(LOCAL__STORAGE__KEY, JSON.stringify(recipes));
  }, [recipes])


  // Function to add new Recipe
  const addRecipeHandler = () => {
    const newRecipe = {
      id: uuidv4(),
      name: "New ...",
      servings: 1,
      cookTime: "1:00am",
      instructions: "Instruc.",
      ingredients: [
        {
          id: uuidv4(),
          name: "Name",
          amount: "1 Tbs",
        },
      ],
    };

    setRecipes([newRecipe, ...recipes]);
  };

  // Function to delete a recipe
  const delRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  // Adding the functions to be used as context this shoud be done after initialization of the functions
  const RecipeContextValue = { addRecipeHandler, delRecipe };

  return (
    <RecipeContext.Provider value={RecipeContextValue}>
      <RecipeList recipes={recipes} />
      <RecipeEdit />
    </RecipeContext.Provider>
  );
}

const sampleList = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1:45 pm",
    instructions:
      "1.Put salt on chicken🐔\n2.Put chicken in oven 👩‍🍳\n3.Eat chicken🍴",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 pounds",
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs",
      },
    ],
  },
  {
    id: 2,
    name: "Plain Pork",
    servings: 5,
    cookTime: "0:05 pm",
    instructions:
      "1.Put paprika on pork 🐷\n2.Put pig in oven 👩‍🍳\n3. Eat pork🍴",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 pounds",
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs",
      },
    ],
  },
];
export default App;
