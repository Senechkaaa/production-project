import { BugButton } from "app/providers/ErrorBoundary"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "shared/ui/Input/Input"
import { Page } from "widgets/Page/Page"

const MainPage = () => {
    const { t } = useTranslation()
    const [value, setValue] = useState("")

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <Page>
            <BugButton />
            {t("Главная страница")}
            <Input
                placeholder="Введите текст"
                value={value}
                onChange={onChange}
            />
        </Page>
    )
}

export default MainPage
