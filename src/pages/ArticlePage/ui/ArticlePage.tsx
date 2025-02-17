import { classNames } from 'shared/lib/classNames/classnames'
import cls from './ArticlePage.module.scss'
import { memo } from 'react'

interface ArticlePageProps {
    className?: string
}


const ArticlePage = ({className}:  ArticlePageProps) => {

    return (
        <div className={classNames(cls.ArticlePage, {}, [className])}>
            ArticlePage
        </div>
    )
}

export default memo(ArticlePage)