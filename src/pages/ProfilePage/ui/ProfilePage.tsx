import { classNames } from "shared/lib/classNames/classnames"
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import {
    fetchProfileData,
    getProfileForm,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from "entities/Profile"
import { useCallback, useEffect } from "react"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch"
import { getProfileIsLoading } from "entities/Profile"
import { getProfileError } from "entities/Profile"
import { useSelector } from "react-redux"
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"

interface ProfilePageProps {
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    // const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

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

    const onChangeCountry= useCallback(
        (country?: Country) => {
            dispatch(profileActions.updateProfile({ country }))
        },
        [dispatch],
    )


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames("ProfilePage", {}, [className])}>
                <ProfilePageHeader />
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
            </div>
        </DynamicModuleLoader>
    )
}

export default ProfilePage
