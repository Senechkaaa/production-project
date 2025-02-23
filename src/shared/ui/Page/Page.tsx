import { classNames } from 'shared/lib/classNames/classnames'
import cls from './Page.module.scss'
import { memo, MutableRefObject, ReactNode, useRef } from 'react'
import { useInifiteScroll } from 'shared/lib/hooks/useInifiteScroll/useInifiteScroll'

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}


export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>

    useInifiteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    )
})