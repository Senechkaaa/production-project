import { lazy } from "react"

export const ArticleEditPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import("./ArticleEditPage")), 400)
        }),
)
