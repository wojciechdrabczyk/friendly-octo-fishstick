import './App.css'
import * as React from "react";
import IngredientsList from "./components/IngredientsList.tsx";
import MistralRecipe from "./components/MistralRecipe.tsx";
import {getRecipeFromMistral} from "./ai.tsx";
import {useRef} from "react";

type Ingredient = string;

const App: React.FC = () => {
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
    const [recipe, setRecipe] = React.useState<string>("")
    const [error, setError] = React.useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const addIngredient = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const newIngredient = formData.get("ingredient")

        if (!newIngredient || typeof newIngredient !== "string" || !newIngredient.trim()) {
            if (inputRef.current && document.activeElement !== inputRef.current) {
                inputRef.current.focus()
            }
            return
        }
        setError(null)
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        e.currentTarget.reset()
        inputRef.current?.focus()
    }

    return (
        <main>
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    ref={inputRef}
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
