import { BugButton } from "@/app/providers/ErrorBoundary"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/shared/ui/Input/Input"
import { Page } from "@/widgets/Page/Page"
import { StarRating } from "@/shared/ui/StarRating/StarRating"
import { RatingCard } from "@/entities/RatingCard"

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
            <RatingCard hasFeedback title={"Как вам статья"} feedbackTitle={"Оставьте отзыв о статье"}/>
            <Input
                placeholder="Введите текст"
                value={value}
                onChange={onChange}
            />
        </Page>
    )
}

export default MainPage
