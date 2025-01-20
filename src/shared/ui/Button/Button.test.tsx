import { render, screen } from '@testing-library/react'
import { Button, ThemeButton } from './Button'

// npm run unit Button.test.tsx
describe('Button', () => {
    test('Test render', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST')).toBeInTheDocument();
    })

    test('Test clear Theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass("clear");
        screen.debug()
    })
})
