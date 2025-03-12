import { EntityState } from "@reduxjs/toolkit"
import { Comment } from "@/entities/Comment"

export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
    isLoading?: boolean
    error?: string
    // Entity включает в себя:
    //  ids: []
    // entities: {}
}
