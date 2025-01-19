import { classNames } from 'shared/lib/classNames/classnames'
import cls from './PageLoader.module.scss'
import { Loader } from '../Loader/Loader'

interface PageLoaderProps {
    className?: string
}

// лучше сделать в слое widget
export const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    )
}
