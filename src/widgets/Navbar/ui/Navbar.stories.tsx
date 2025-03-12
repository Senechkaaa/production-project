import { ComponentStory, ComponentMeta } from "@storybook/react"
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator"
import { Theme } from "@/app/providers/ThemeProvider"
import { NavBar } from "./Navbar"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"
export default {
    title: "widget/NavBar",
    component: NavBar,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof NavBar>

const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />

export const Light = Template.bind({})
Light.args = {}
Light.decorators = [StoreDecorator({})]

export const Dark = Template.bind({})
Dark.args = {}
Dark.decorators = [ThemeDecorator(Theme.DARK)]
Dark.decorators = [StoreDecorator({})]

export const AuthNavbar = Template.bind({})
AuthNavbar.args = {}
AuthNavbar.decorators = [ThemeDecorator(Theme.DARK)]
AuthNavbar.decorators = [
    StoreDecorator({
        user: { authData: {} },
    }),
]
