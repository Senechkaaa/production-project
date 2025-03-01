import { BugButton } from "app/providers/ErrorBoundary"
import { useState } from "react"
import { useTranslation } from "react-i18next"
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
            <div>fdsfddsf</div>
            <HStack>
                <div>fdfdssdf</div>
                <ListBox
                    defaultValue={"Выберите значение"}
                    onChange={(value: string) => {}}
                    value={undefined}
                    items={[
                        { value: "1", content: "123" },
                        { value: "2", content: "xcvcxv", disabled: true,},
                        { value: "3", content: "fdssdf" },
                    ]}
                />
            </HStack>
            <div>fdsfddsf</div>
            <div>fdsfddsf</div>
            <div>fdsfddsf</div>
            <Input
                placeholder="Введите текст"
                value={value}
                onChange={onChange}
            />
        </Page>
    )
}

export default MainPage
