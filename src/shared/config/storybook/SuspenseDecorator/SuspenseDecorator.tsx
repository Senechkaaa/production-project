import { Story } from "@storybook/react"
import { Suspense } from "react"

export const SuspenseDecorator = (StoryComponent: Story) => {
    return (
        <Suspense>
            <StoryComponent />
        </Suspense>
    )
}
// каждый component.stories.tsx оборачивает в Suspense
