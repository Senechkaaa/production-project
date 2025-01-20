import { lazy } from 'react'

export const MainPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import('./MainPage')), 1500)
        }),
)
