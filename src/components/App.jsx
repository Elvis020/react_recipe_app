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
  const [selectedRecipeId, setSelectedRecipeId] = useState();

  // Finding a specific recipe
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId );

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
      name: "",
      servings: "",
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: "",
        },
      ],
    };
    setSelectedRecipeId(newRecipe.id);
    setRecipes([newRecipe, ...recipes]);
  };

  // Function to delete a recipe
  const delRecipe = (id) => {
      if (selectedRecipeId != null && selectedRecipeId === id) {
        return setSelectedRecipeId(undefined);
      }
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  // Function to handle selected Recipe
  const handleSelectedRecipe = (id) => {
    setSelectedRecipeId(id);
  }

  // Function to change values of the selected recipe(UPDATING RECIPE)
  const handleEditRecipe =(id, recipe) => {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    // Swapping old recipe with new recipe
    newRecipes[index] = recipe;
    // Adding new recipe to array of recipes
    setRecipes(newRecipes)

  }

  // Adding the functions to be used as context this shoud be done after initialization of the functions
  const RecipeContextValue = { addRecipeHandler, delRecipe, handleSelectedRecipe, handleEditRecipe };

  return (
    <RecipeContext.Provider value={RecipeContextValue}>
      <RecipeList recipes={recipes} />

      {/* Checking whether selected recipe is null */}
      {selectedRecipe ? <RecipeEdit recipe={selectedRecipe} selectedRecipe /> : ""}
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
