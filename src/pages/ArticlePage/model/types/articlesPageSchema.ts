import { EntityState } from "@reduxjs/toolkit"
import { Article, ArticleSortField, ArticleType, ArticleView } from "@/entities/Article"
import { SortOrder } from "@/shared/types"

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string
    view: ArticleView

    // pagination
    page: number
    limit: number
    hasMore: boolean
    // Entity включает в себя:
    //  ids: []
    // entities: {}

    _inited: boolean
    // Флаг инитед делает так, чтобы после того как мы зашли на статью и вернулись к списку не проходил запрос заново

    // filters
    order: SortOrder
    sort: ArticleSortField
    search: string
    type: ArticleType
}
