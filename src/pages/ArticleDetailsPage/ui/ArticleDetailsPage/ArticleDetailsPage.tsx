import { classNames } from "shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { ArticleDetails } from "entities/Article"
import { useNavigate, useParams } from "react-router-dom"
import { Text } from "shared/ui/Text/Text"
import { CommentList } from "entities/Comment"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { useDispatch, useSelector } from "react-redux"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId"
import cls from "./ArticleDetailsPage.module.scss"
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from "../../model/slices/articleDetailsCommentsSlice"
import { getArticleCommentsIsLoading } from "../../model/selectors/comments"
import { AddCommentForm } from "features/addCommentForm"
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle"
import { Button } from "shared/ui/Button/Button"
import { RoutesPath } from "shared/config/routeConfig/routeConfig"
import { Page } from "widgets/Page/Page"

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props
    const { t } = useTranslation("article-details")
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const navigate = useNavigate()

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch],
    )

    const onBackToList = useCallback(() => {
        navigate(RoutesPath.articles)
    }, [navigate])

    if (!id) {
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t("Статья не найдена")}
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <Button onClick={onBackToList}>{t("Назад к списку")}</Button>
                <ArticleDetails id={id} />
                <Text className={cls.commentTitle} title={t("Комментарии")} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
