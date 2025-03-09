import { classNames } from "shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { ArticleDetails } from "entities/Article"
import { useParams } from "react-router-dom"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import cls from "./ArticleDetailsPage.module.scss"
import { Page } from "widgets/Page/Page"
import { articleDetailsReducer } from "../../model/slices"
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader"
import { VStack } from "shared/ui/Stack/Flex"
import { ArticleRecommendationList } from "features/articleRecommendationList"
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments"

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsReducer,
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props
    const { id } = useParams<{ id: string }>()

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id} />
                    <ArticleRecommendationList />
                    <ArticleDetailsComments id={id}/>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
