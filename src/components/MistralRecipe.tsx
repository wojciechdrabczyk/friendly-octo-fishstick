import ReactMarkdown from 'react-markdown'

const MistralRecipe = (props) => {
    return (
        <section>
            <ReactMarkdown className={"suggested-recipe-container"}>
                {props.recipe}
            </ReactMarkdown>
        </section>
    )
}

export default MistralRecipe