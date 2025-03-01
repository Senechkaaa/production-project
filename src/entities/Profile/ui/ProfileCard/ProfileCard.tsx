import { classNames, Mods } from "shared/lib/classNames/classnames"
import cls from "./ProfileCard.module.scss"
import { useTranslation } from "react-i18next"
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { Profile } from "../../model/types/profile"
import { Loader } from "shared/ui/Loader/Loader"
import { Avatar } from "shared/ui/Avatar/Avatar"
import { Currency } from "../../../Currency/model/types/currency"
import { CurrencySelect } from "../../../Currency"
import { Country } from "../../../Country/model/types/country"
import { CountrySelect } from "entities/Country/ui/CountrySelect/CountrySelect"
import { HStack, VStack } from "shared/ui/Stack/Flex"

interface ProfileCardProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
    readonly?: boolean
    onChangeLastName?: (value?: string) => void
    onChangeFirstName?: (value?: string) => void
    onChangeAge?: (value?: string) => void
    onChangeCity?: (value?: string) => void
    onChangeUsername?: (value?: string) => void
    onChangeAvatar?: (value?: string) => void
    onChangeCurrency?: (currency: Currency) => void
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        error,
        data,
        isLoading,
        readonly,
        onChangeLastName,
        onChangeFirstName,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props
    const { t } = useTranslation("profile")

    if (isLoading) {
        return (
            <HStack
                max
                justify={"center"}
                className={classNames(
                    cls.ProfileCard,
                    { [cls.loading]: true },
                    [className],
                )}
            >
                <Loader />
            </HStack>
        )
    }

    if (error) {
        return (
            <HStack
                max
                justify={"center"}
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                    title={t("Произошла ошибка при загрузке профиля")}
                    text={t("Попробуйте обновить страницу")}
                />
            </HStack>
        )
    }

    const mods: Mods = {
        [cls.edition]: readonly,
    }

    return (
        <VStack
            gap={"8"}
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack justify={"center"} className={cls.avatarWrapper}>
                    <Avatar src={data?.avatar} alt="avatar" />
                </HStack>
            )}
            <Input
                readonly={readonly}
                onChange={onChangeFirstName}
                value={data?.first}
                placeholder={t("Ваше имя")}
                className={cls.input}
            />
            <Input
                readonly={readonly}
                onChange={onChangeLastName}
                value={data?.lastname}
                placeholder={t("Ваша фамилия")}
                className={cls.input}
            />

            <Input
                readonly={readonly}
                onChange={onChangeAge}
                value={data?.age}
                placeholder={t("Ваш возраст")}
                className={cls.input}
            />

            <Input
                readonly={readonly}
                onChange={onChangeCity}
                value={data?.city}
                placeholder={t("Город")}
                className={cls.input}
            />

            <Input
                readonly={readonly}
                onChange={onChangeUsername}
                value={data?.username}
                placeholder={t("Введите имя пользователя")}
                className={cls.input}
            />

            <Input
                readonly={readonly}
                onChange={onChangeAvatar}
                value={data?.avatar}
                placeholder={t("Введите ссылку на аватар")}
                className={cls.input}
            />
            <CurrencySelect
                className={cls.input}
                readonly={readonly}
                onChange={onChangeCurrency}
                value={data?.currency}
            />
            <CountrySelect
                className={cls.input}
                readonly={readonly}
                onChange={onChangeCountry}
                value={data?.country}
            />
        </VStack>
    )
}
