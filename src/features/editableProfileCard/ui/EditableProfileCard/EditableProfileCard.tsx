import { classNames } from "@/shared/lib/classNames/classnames"
import { useTranslation } from "react-i18next"
import { memo, useCallback } from "react"
import { Text, TextTheme } from "@/shared/ui/Text/Text"
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm"
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading"
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError"
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly"
import { getProfileValidateError } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors"
import { useSelector } from "react-redux"
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch"
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect"
import { fetchProfileData } from "../../model/service/fetchProfileData/fetchProfileData"
import { profileActions, profileReducer } from "../../model/slice/profileSlice"
import { Currency } from "@/entities/Currency"
import { Country } from "@/entities/Country"
import { ProfileCard } from "@/entities/Profile"
import {
    DynamicModuleLoader,
    ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader"
import { VStack } from "@/shared/ui/Stack/Flex"
import { ValidateProfileError } from "@/features/editableProfileCard/model/consts/consts"

interface EditableProfileCardProps {
    className?: string
    id?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo(
    ({ className, id }: EditableProfileCardProps) => {
        const { t } = useTranslation("profile")
        const dispatch = useAppDispatch()
        const formData = useSelector(getProfileForm)
        const isLoading = useSelector(getProfileIsLoading)
        const error = useSelector(getProfileError)
        const readonly = useSelector(getProfileReadonly)
        const validateErrors = useSelector(getProfileValidateError)

        const validateErrorTranslation = {
            [ValidateProfileError.SERVER_ERROR]: t(
                "Серверная ошибка при сохранении",
            ),
            [ValidateProfileError.INCORECT_AGE]: t("Некорректный возраст"),
            [ValidateProfileError.INCORECT_COUNTRY]: t("Выберите Страну"),
            [ValidateProfileError.INCORECT_USER_DATA]: t(
                "Некорректное имя или фамилия",
            ),
            [ValidateProfileError.NO_DATA]: t("Нет данных"),
        }

        useInitialEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id))
            }
        })

        const onChangeFirstName = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ first: value || "" }))
            },
            [dispatch],
        )

        const onChangeLastName = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ lastname: value || "" }),
                )
            },
            [dispatch],
        )

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ city: value || "" }))
            },
            [dispatch],
        )

        const onChangeAge = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ age: Number(value || 0) }),
                )
            },
            [dispatch],
        )

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(
                    profileActions.updateProfile({ username: value || "" }),
                )
            },
            [dispatch],
        )

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ avatar: value || "" }))
            },
            [dispatch],
        )

        const onChangeCurrency = useCallback(
            (currency?: Currency) => {
                dispatch(profileActions.updateProfile({ currency }))
            },
            [dispatch],
        )

        const onChangeCountry = useCallback(
            (country?: Country) => {
                dispatch(profileActions.updateProfile({ country }))
            },
            [dispatch],
        )

        return (
            <DynamicModuleLoader reducers={reducers}>
                <VStack gap="8" max className={classNames("", {}, [className])}>
                    <EditableProfileCardHeader />
                    {validateErrors?.length &&
                        validateErrors.map((err) => (
                            <Text
                                theme={TextTheme.ERROR}
                                text={validateErrorTranslation[err]}
                                key={err}
                            />
                        ))}
                    <ProfileCard
                        readonly={readonly}
                        data={formData}
                        isLoading={isLoading}
                        error={error}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangeCity={onChangeCity}
                        onChangeAge={onChangeAge}
                        onChangeUsername={onChangeUsername}
                        onChangeAvatar={onChangeAvatar}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                </VStack>
            </DynamicModuleLoader>
        )
    },
)
