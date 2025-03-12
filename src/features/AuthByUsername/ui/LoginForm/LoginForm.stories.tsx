import { ComponentStory, ComponentMeta } from "@storybook/react"
import LoginForm from "./LoginForm"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

export default {
    title: "features/LoginForm",
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => (
    <LoginForm {...args} />
)

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
    StoreDecorator({
        loginForm: { username: "qwerty", password: "123" },
        // для этого мы в StoreDecorator и StoreProvider добавляли asyncReducers
    }),
]

export const withError = Template.bind({})
withError.args = {}
withError.decorators = [
    StoreDecorator({
        loginForm: { username: "qwerty", password: "123", error: "ERROR" },
    }),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    StoreDecorator({
        loginForm: { isLoading: true },
    }),
]
