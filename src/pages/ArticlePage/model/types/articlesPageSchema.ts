import { EntityState } from "@reduxjs/toolkit"
import { Article, ArticleView } from "entities/Article"

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string
    view: ArticleView

    // pagination
    page: number
    limit?: number
    hasMore: boolean
    // Entity включает в себя:
    //  ids: []
    // entities: {}

    _inited: boolean
    // Флаг инитед делает так, чтобы после того как мы зашли на статью и вернулись к списку не проходил запрос заново
}
