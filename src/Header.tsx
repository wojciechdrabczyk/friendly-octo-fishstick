import chefClaudeLogo from "./images/chef-claude-icon.png"

const Header = () => {
    return (
        <header>
            <img src={chefClaudeLogo} alt={"Logo of the AI Chef"}/>
            <h1>Mistral Chef</h1>
        </header>
    )
}

export default Header