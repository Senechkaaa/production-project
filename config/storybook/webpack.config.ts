import { WebpackConfiguration } from 'webpack-dev-server'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { RuleSetRule } from 'webpack'

// файл нужен для переопределения конфига.
export default ({ config }: { config: WebpackConfiguration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    }
    config.resolve?.modules?.push(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')

    // дефолтный loader который был настроен для svg теперь обрабатывать ее не будет

    config.module!.rules = config.module?.rules?.map((rule: RuleSetRule) => {
        // Если есть правило svg, то мы его исключаем методом exclude
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
        }

        return rule
    })

    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })
    config.module?.rules?.push(buildCssLoader(true))

    return config
}
