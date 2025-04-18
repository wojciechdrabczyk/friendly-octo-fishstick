import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import Header from './Header.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App/>
        <Header/>
    </StrictMode>,
)
