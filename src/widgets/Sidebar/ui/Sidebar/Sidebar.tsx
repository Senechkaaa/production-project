import { classNames } from "shared/lib/classNames/classnames"
import cls from "./Sidebar.module.scss"
import { FC, memo, useMemo, useState } from "react"
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher"
import { LangSwitcher } from "shared/ui/LangSwitcher/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { getSidebarItems } from "../../model/selectors/getSidebarItems"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { useSelector } from "react-redux"

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)
    const sidebarItemsList = useSelector(getSidebarItems)

    const onToggle = () => {
        setCollapsed((prev) => !prev)
    }

    const itemsList = useMemo(() => {
        return sidebarItemsList.map((item) => (
            <SidebarItem collapsed={collapsed} key={item.path} item={item} />
        ))
    }, [collapsed, sidebarItemsList])

    return (
        <menu
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
            <div className={cls.items}>{itemsList}</div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
        </menu>
    )
})
