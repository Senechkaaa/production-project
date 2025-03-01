import { WebpackConfiguration } from 'webpack-dev-server'
import { BuildPaths } from '../build/types/config'
import path from 'path'
import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { DefinePlugin, RuleSetRule } from 'webpack'

// файл нужен для переопределения конфига.
export default ({ config }: { config: WebpackConfiguration }) => {
    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
        buildLocales: '',
        locales: '',
    }
    config.resolve!.modules!.push(paths.src)
    config.resolve!.extensions!.push(".ts", ".tsx")

    // дефолтный loader который был настроен для svg теперь обрабатывать ее не будет

    // @ts-ignore
    config.module!.rules = config.module!.rules!.map((rule: RuleSetRule) => {
        // Если есть правило svg, то мы его исключаем методом exclude
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i }
        }

        return rule
    })

    config.module!.rules!.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    })
    config.module!.rules!.push(buildCssLoader(true))
    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook')
        }),
    )
    // добавляем глобальную переменную __IS_DEV__ в среду разработки, чтобы не было ошибки

    return config
}
