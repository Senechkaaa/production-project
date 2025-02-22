import { ComponentStory, ComponentMeta } from "@storybook/react"
import { CommentCard } from "./CommentCard"

export default {
    title: "entities/Comment/CommentCard",
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof CommentCard>

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
    comment: {
        id: "1",
        text: "comment 1",
        user: { id: "1", username: "user1" },
    },
}

export const Loading = Template.bind({})
Loading.args = {
    comment: {
        id: "1",
        text: "comment 1",
        user: { id: "1", username: "user1" },
    },
    isLoading: true
}