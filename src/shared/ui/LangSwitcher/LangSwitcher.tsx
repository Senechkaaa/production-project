import { classNames } from '@/shared/lib/classNames/classnames'
import { useTranslation } from 'react-i18next'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import cls from './LangSwitcher.module.scss'
import { memo } from 'react'

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    // Лучше делать в слое widget
    return (
        <div className={classNames(cls.LangSwitcher, {}, [className])}>
            <Button
                className={cls.btn}
                theme={ButtonTheme.CLEAR}
                onClick={toggle}
            >
                {t(short ? 'Короткий Язык' : 'Язык')}
            </Button>
        </div>
    )
})
