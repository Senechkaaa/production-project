import { ComponentStory, ComponentMeta } from "@storybook/react"
import { ProfileCard } from "./ProfileCard"
import { Country } from "entities/Country"
import { Currency } from "entities/Currency"
import avatar from 'shared/assets/tests/avatar.jpg'

export default {
    title: "entities/ProfileCard",
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: "color" },
    },
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    data: {
        username: "admin",
        age: 15,
        city: "fdsfd",
        first: "Loloshka",
        lastname: "Lolokov",
        country: Country.Canada,
        currency: Currency.USD,
        avatar,
    },
}

export const withError = Template.bind({})
withError.args = {
    error: "Error"
}


export const Loading = Template.bind({})
Loading.args = {
    isLoading: true
}

