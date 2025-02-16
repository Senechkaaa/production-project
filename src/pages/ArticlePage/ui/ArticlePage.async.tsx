import { lazy } from "react"

export const ArticlePageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error typescript-eslint.io/rules/ban-ts-comment
            setTimeout(() => resolve(import("./ArticlePage")), 1500)
        }),
)
