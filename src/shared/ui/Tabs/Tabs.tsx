import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./Tabs.module.scss"
import { memo, ReactNode, useCallback } from "react"
import { Card, CardTheme } from "../Card/Card"

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const { className, onTabClick, tabs, value } = props

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            console.log("click")
            onTabClick(tab)
        },
        [onTabClick],
    )

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    onClick={clickHandle(tab)}
                    theme={
                        tab.value === value
                            ? CardTheme.NORMAL
                            : CardTheme.OUTLINED
                    }
                    key={tab.value}
                    className={cls.tab}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
})
