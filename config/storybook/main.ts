import path from "path"
import { buildCssLoader } from "../build/loaders/buildCssLoader"
import { Configuration, DefinePlugin, RuleSetRule } from "webpack"

export default {
    stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
            },
        },
        "@storybook/addon-interactions",
        "storybook-addon-mock",
        "storybook-addon-themes",
    ],
    framework: "@storybook/react",
    core: {
        builder: "webpack5",
    },
    webpackFinal: async (config: Configuration) => {
        const paths = {
            build: "",
            html: "",
            entry: "",
            src: path.resolve(__dirname, "..", "..", "src"),
            buildLocales: "",
            locales: "",
        }
        config!.resolve!.modules!.push(paths.src)
        config!.resolve!.extensions!.push(".ts", ".tsx")
        config!.resolve!.alias = {
            ...config!.resolve!.alias,
            "@": paths.src,
        }

        // дефолтный loader который был настроен для svg теперь обрабатывать ее не будет

        // @ts-ignore
        config!.module!.rules = config!.module!.rules!.map((rule: RuleSetRule) => {
            // Если есть правило svg, то мы его исключаем методом exclude
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i }
            }

            return rule
        })

        config!.module!.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        })
        config!.module!.rules.push(buildCssLoader(true))
        config.plugins?.push(
            new DefinePlugin({
                __IS_DEV__: JSON.stringify(true),
                __API__: JSON.stringify("http://testapi.ru"),
                __PROJECT__: JSON.stringify("storybook"),
            }),
        )
        // добавляем глобальную переменную __IS_DEV__ в среду разработки, чтобы не было ошибки

        return config
    },
}
