import { classNames } from "@/shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { useSelector } from "react-redux"
import { getUserAuthData } from "@/entities/User"
import { getProfileData } from "@/features/editableProfileCard/model/selectors/getProfileData/getProfileData"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { getProfileReadonly } from "@/features/editableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly"
import { profileActions } from "@/features/editableProfileCard/model/slice/profileSlice"
import { updateProfileData } from "@/features/editableProfileCard/model/service/updateProfileData/updateProfileData"
import { Button, ButtonTheme } from "@/shared/ui/Button"
import { Text } from "@/shared/ui/Text"
import { HStack } from "@/shared/ui/Stack"

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = memo(
    ({ className }: EditableProfileCardHeaderProps) => {
        const { t } = useTranslation("profile")
        const authData = useSelector(getUserAuthData)
        const profileData = useSelector(getProfileData)
        const canEdit = authData?.id === profileData?.id
        const readonly = useSelector(getProfileReadonly)
        const dispatch = useAppDispatch()

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false))
        }, [dispatch])

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit())
        }, [dispatch])

        const onSave = useCallback(() => {
            dispatch(updateProfileData())
        }, [dispatch])

        return (
            <HStack
                max
                justify={"between"}
                className={classNames("", {}, [className])}
            >
                <Text title={t("Профиль")} />
                {canEdit && (
                    <>
                        {readonly ? (
                            <Button
                                onClick={onEdit}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t("Редактировать")}
                            </Button>
                        ) : (
                            <HStack gap={"8"}>
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t("Отменить")}
                                </Button>
                                <Button
                                    onClick={onSave}
                                    theme={ButtonTheme.OUTLINE}
                                >
                                    {t("Сохранить")}
                                </Button>
                            </HStack>
                        )}
                    </>
                )}
            </HStack>
        )
    },
)
