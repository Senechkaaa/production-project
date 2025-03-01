import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Page.module.scss"
import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from "react"
import { useInifiteScroll } from "shared/lib/hooks/useInifiteScroll/useInifiteScroll"
import { getUiScrollByPath, uiActions } from "features/UI"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useLocation } from "react-router-dom"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useSelector } from "react-redux"
import { StateSchema } from "app/providers/StoreProvider"
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle"

interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const PAGE_ID = "PAGE_ID"

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) =>
        getUiScrollByPath(state, pathname),
    )

    useInifiteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        console.log("scroll", e.currentTarget.scrollTop)
        dispatch(
            uiActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        )
    }, 500)

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    })

    return (
        <main
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    )
})
