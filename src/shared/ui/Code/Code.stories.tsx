import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Code } from './Code'

export default {
    title: "shared/Code",
    component: Code,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof Code>

const Template: ComponentStory<typeof Code> = (args) => (
    <Code {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    text: `import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Code.stories } from './Code.stories'

export default {
    title: "shared/Code.stories",
    component: Code.stories,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof Code.stories>

const Template: ComponentStory<typeof Code.stories> = (args) => (
    <Code.stories {...args} />
)`
}