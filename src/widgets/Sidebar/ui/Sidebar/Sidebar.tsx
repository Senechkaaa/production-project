import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Sidebar.module.scss"
import { FC, memo, useState } from "react"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { SidebarItemsList } from "widgets/Sidebar/model/items"
import { SidebarItem } from "../SidebarItem/SidebarItem"

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className,
            ])}
        >
            <Button
                square
                size={ButtonSize.L}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
            >
                {collapsed ? ">" : "<"}
            </Button>
            <div className={cls.items}>
                {SidebarItemsList.map((item) => (
                    <SidebarItem
                        collapsed={collapsed}
                        key={item.path}
                        item={item}
                    />
                ))}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </div>
    )
})
