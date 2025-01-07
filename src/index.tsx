import { render } from 'react-dom'
import { someFn } from './test'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import ThemeProvider from './theme/ThemeProvider'

someFn(123)

render(
    <BrowserRouter>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </BrowserRouter>,
    document.getElementById('root'),
)
