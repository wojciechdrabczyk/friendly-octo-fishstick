import './App.css'
import * as React from "react";
import IngredientsList from "./components/IngredientsList.tsx";
import MistralRecipe from "./components/MistralRecipe.tsx";
import {getRecipeFromMistral} from "./ai.tsx";

const App = () => {
    const [ingredients, setIngredients] = React.useState(
        ["all the main spices", "pasta", "ground beef", "tomato paste"]
    )
    const [recipeShown, setRecipeShown] = React.useState(false)

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        console.log(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (!newIngredient) {
            return
        }
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }

            {recipeShown && <MistralRecipe/>}
        </main>
    )
}

export default App
