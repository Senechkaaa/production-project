import babelRemovePropsPlugin from "../babel/babelREmovePropsPlugin"
import { BuildOptions } from "../types/config"

interface BuildBabelLoaderProps extends BuildOptions {
    isTsx?: boolean
}

export function buildBabelLoader({ isTsx, isDev }: BuildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"],
                plugins: [
                    [
                        "i18next-extract",
                        { locales: ["ru", "en"], keyAsDefaultValue: true },
                    ],
                    [
                        "@babel/plugin-transform-typescript",
                        // компилирует Ts-код в Js-код
                        {
                            isTsx,
                        },
                    ],
                    "@babel/plugin-transform-runtime",
                    // оптимизирует код

                    isTsx && [
                        babelRemovePropsPlugin,
                        {
                            props: ['data-testid']
                        }
                    ],
                    isDev && require.resolve("react-refresh/babel"),
                ].filter(Boolean),
            },
        },
    }
}
