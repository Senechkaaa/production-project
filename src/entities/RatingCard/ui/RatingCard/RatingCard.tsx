import { classNames } from "@/shared/lib/classNames/classnames"
import cls from "./RatingCard.module.scss"
import { useTranslation } from "react-i18next"
import { memo, useCallback, useState } from "react"
import { Card } from "@/shared/ui/Card/Card"
import { HStack, VStack } from "@/shared/ui/Stack/Flex"
import { Text } from "@/shared/ui/Text/Text"
import { StarRating } from "@/shared/ui/StarRating/StarRating"
import { Modal } from "@/shared/ui/Modal/Modal"
import { Input } from "@/shared/ui/Input/Input"
import { Button, ButtonTheme } from "@/shared/ui/Button/Button"
import { BrowserView, MobileView } from "react-device-detect"
import { Drawer } from "@/shared/ui/Drawer/Drawer"

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starCount: number) => void
    onAccept?: (starCount: number, feedback?: string) => void
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { t } = useTranslation()
    const { className, feedbackTitle, hasFeedback, onAccept, onCancel, title } =
        props
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starsCount, setStarsCount] = useState(0)
    const [feedback, setFeedback] = useState("")

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount)
            if (hasFeedback) {
                setIsModalOpen(true)
            } else {
                onAccept?.(selectedStarsCount)
            }
        },
        [hasFeedback, onAccept],
    )

    const acceptHandle = useCallback(() => {
        setIsModalOpen(false)
        onAccept?.(starsCount, feedback)
    }, [onAccept, feedback, starsCount])

    const cancelHandle = useCallback(() => {
        setIsModalOpen(false)
        onCancel?.(starsCount)
    }, [onCancel, starsCount])

    const modalContent = (
        <VStack max gap="32">
            <Text title={feedbackTitle} />
            <Input value={feedback} onChange={setFeedback} placeholder={t("Ваш отзыв")} />
            <HStack max gap="16">
                <Button onClick={cancelHandle} theme={ButtonTheme.OUTLINE_RED}>
                    {t("Закрыть")}
                </Button>
                <Button onClick={acceptHandle}>{t("Отправить")}</Button>
            </HStack>
        </VStack>
    )

    return (
        <Card className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap="8">
                <Text />
                <StarRating size={40} onSelect={onSelectStars} />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    {modalContent}
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
                    {modalContent}
                </Drawer>
            </MobileView>
        </Card>
    )
})
