import './App.css'
import * as React from "react";
import IngredientsList from "./components/IngredientsList.tsx";
import MistralRecipe from "./components/MistralRecipe.tsx";
import {getRecipeFromMistral} from "./ai.tsx";

type Ingredient = string;

const App: React.FC = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [recipe, setRecipe] = React.useState<string>("")
    const [error, setError] = React.useState<string | null>(null);
    const getRecipe = async (): Promise<void> => {
        try {
            const recipeMarkdown = await getRecipeFromMistral(ingredients);

            if (recipeMarkdown) {
                setRecipe(recipeMarkdown)
                setError(null);
            } else {
                throw new Error("There is no recipe")
            }
        } catch (err) {
            setError((err as Error).message);
            setRecipe("");
        }
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

            {error && (
                <div className={"error-message"}>{error}</div>
            )}

            {recipe && <MistralRecipe recipe={recipe}/>}
        </main>
    )
}

export default App
