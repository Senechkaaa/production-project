import { classNames } from "shared/lib/classNames/classnames"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
    fetchProfileData,
    getProfileForm,
    getProfileReadonly,
    getProfileValidateError,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError,
} from "entities/Profile"
import { useCallback } from "react"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { getProfileIsLoading } from "entities/Profile"
import { getProfileError } from "entities/Profile"
import { useSelector } from "react-redux"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"
import { Text, TextTheme } from "shared/ui/Text/Text"
import { useTranslation } from "react-i18next"
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect"
import { useParams } from "react-router-dom"
import { Page } from "widgets/Page/Page"
import { VStack } from "shared/ui/Stack/VStack/VStack"

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation("profile")
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
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

    console.log("Id не в эффекте", id)

    useInitialEffect(() => {
        console.log("Нет id")
        if (id) {
            console.log("Есть id")
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
            dispatch(profileActions.updateProfile({ lastname: value || "" }))
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
            dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
        },
        [dispatch],
    )

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || "" }))
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
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames("ProfilePage", {}, [className])}>
                <VStack max gap={"16"}>
                    <ProfilePageHeader />
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
            </Page>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
