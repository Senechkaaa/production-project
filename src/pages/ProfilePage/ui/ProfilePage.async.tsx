import { lazy } from 'react'

export const ProfilePageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import("./ProfilePage")), 1500)
        }),
)
