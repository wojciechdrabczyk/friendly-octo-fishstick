import ReactMarkdown from 'react-markdown'
import * as React from "react";

type MistralRecipeProps = {
    recipe: string;
}

const MistralRecipe: React.FC<MistralRecipeProps> = ({recipe}) => {
    return (
        <section>
            <ReactMarkdown className={"suggested-recipe-container"}>
                {recipe}
            </ReactMarkdown>
        </section>
    )
}

export default MistralRecipe