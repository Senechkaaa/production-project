import { BugButton } from "app/providers/ErrorBoundary"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { DropDown } from "shared/ui/DropDown/DropDown"
import { Input } from "shared/ui/Input/Input"
import { ListBox } from "shared/ui/ListBox/ListBox"
import { HStack } from "shared/ui/Stack/Flex"
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
