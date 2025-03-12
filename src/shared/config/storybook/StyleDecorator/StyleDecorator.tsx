import '@/app/styles/index.scss'
import { Story } from '@storybook/react'

export const StyleDecorator = (StyleComponent : Story) => <StyleComponent/>

// навешивает стили для компонентов
// можно вернуть story() - вызов функции
// можно вернуть <Story/> - компонент
