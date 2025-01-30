import { Story } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator = (story: () => Story) => {
    return <BrowserRouter>{story()}</BrowserRouter>
}
// каждый component.stories.tsx оборачивает в роутер, чтобы не было ошибки роута
