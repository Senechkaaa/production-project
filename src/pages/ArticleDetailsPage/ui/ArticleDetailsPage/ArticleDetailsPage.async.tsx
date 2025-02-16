import { lazy } from "react"

export const ArticleDetailsPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import("./ArticleDetailsPage")), 1500)
        }),
)
