import { classNames } from "shared/lib/classNames/classnames"
import cls from "./AdminPanelPage.module.scss"
import { useTranslation } from "react-i18next"
import { memo } from "react"
import { Page } from "widgets/Page/Page"

interface AdminPanelPageProps {
    className?: string
}
const AdminPanelPage = memo(({ className }: AdminPanelPageProps) => {
    const { t } = useTranslation()

    return (
        <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
            Админ панель
        </Page>
    )
})

export default AdminPanelPage