import "app/styles/index.scss"
import { Story } from "@storybook/react"
import { Theme, ThemeProvider } from "app/providers/ThemeProvider"

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        // декоратор для темы
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    )
