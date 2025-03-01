import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Flex } from './Flex'

export default {
    title: "shared/Flex",
    component: Flex,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof Flex>

const Template: ComponentStory<typeof Flex> = (args) => (
    <Flex {...args} />
)

export const Column = Template.bind({})
Column.args = {
    direction: 'column',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const ColumnGap16 = Template.bind({})
ColumnGap16.args = {
    direction: "column",
    gap: "16",
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const Row = Template.bind({})
Row.args = {
    direction: "row",
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const RowGap4 = Template.bind({})
RowGap4.args = {
    direction: "row",
    gap: '4',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const RowGap8 = Template.bind({})
RowGap8.args = {
    direction: "row",
    gap: "8",
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const RowGap16 = Template.bind({})
RowGap16.args = {
    direction: "row",
    gap: "16",
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const ColumnAlignCenter = Template.bind({})
ColumnAlignCenter.args = {
    direction: "column",
    align: "center",
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}

export const ColumnAlignEnd = Template.bind({})
ColumnAlignEnd.args = {
    direction: "column",
    align: 'end',
    children: (
        <>
            <div>First</div>
            <div>First</div>
            <div>First</div>
            <div>First</div>
        </>
    ),
}