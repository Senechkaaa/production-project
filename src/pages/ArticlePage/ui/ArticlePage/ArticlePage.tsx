import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./ArticlePage.module.scss"
import { memo, useCallback } from "react"
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
    articlesPageReducer,
} from "../../model/slices/articlePageSlice"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { Page } from "@/widgets/Page/Page"
import { fetchNextArticlePage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage"
import { initArticlesPage } from "../../model/services/initArticlePage/initArticlePage"
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters"
import { useSearchParams } from "react-router-dom"
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList"

interface ArticlePageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlePage = ({ className }: ArticlePageProps) => {
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlePage())
    }, [dispatch])

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams))
    })

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlePage, {}, [className])}
            >
                <ArticlesPageFilters />
                <ArticleInfiniteList className={cls.list}/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlePage)
