import { classNames } from 'shared/lib/classNames/classnames'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import cl from './LangSwitcher.module.scss'

interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    // Лучше делать в слое widget
    return (
        <div className={classNames(cl.LangSwitcher, {}, [className])}>
            <Button theme={ThemeButton.CLEAR} onClick={toggle}>
                {t('Язык')}
            </Button>
        </div>
    )
}
