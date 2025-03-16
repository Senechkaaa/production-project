import { addDecorator } from "@storybook/react"
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator"
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator"
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator"
import "../../src/app/styles/index.scss"
import { Theme } from "../../src/shared/const/theme"

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: "fullscreen",
    themes: {
        default: "light",
        list: [
            { name: "light", class: Theme.LIGHT, color: "#fff" },
            { name: "dark", class: Theme.DARK, color: "#000" },
            { name: "orange", class: Theme.ORANCGE, color: "DF6133" },
        ],
    },
}

addDecorator(StyleDecorator)
addDecorator(ThemeDecorator(Theme.LIGHT))
addDecorator(RouterDecorator)
addDecorator(SuspenseDecorator)
// декораторы - обертка, которые будут оборачивать каждый storybook компонент
