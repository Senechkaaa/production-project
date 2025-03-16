import HtmlWebpackPlugin from "html-webpack-plugin"
import {
    DefinePlugin,
    HotModuleReplacementPlugin,
    ProgressPlugin,
    WebpackPluginInstance,
} from "webpack"
import { BuildOptions } from "./types/config"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import CopyPlugin from "copy-webpack-plugin"
import CircularDependencyPlugin from "circular-dependency-plugin"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"

export function buildPlugins({
    paths,
    isDev,
    apiUrl,
    project,
}: BuildOptions): WebpackPluginInstance[] {
    const isProd = !isDev
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            // template - чтобы отображался div с классом root
            // этот файл будет использоваться как шаблон
        }),
        new ProgressPlugin(),
        // отслеживать за прогрессом
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        // с помощью него в приложение можно прокидывать глобальные переменные
        new ReactRefreshWebpackPlugin(),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
            // при обнаружении кольцевой зависимости будет ошибка
        }),
        // используется для выявления кольцевых зависимостей в вашем проекте.

        // Кольцевые зависимости — это ситуация, когда два или более модуля (или файла) зависят друг от друга напрямую или через цепочку зависимостей.

        // условно, избавиться от абсолютных импортов. Не правильно: "entites/Article", правильно: "../../model/types/article.ts"

        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: "write-references",
            },
        }),
        // этот плагин выносит проверку типов в отдельный процесс.
        // Он работает параллельно с основным процессом сборки, чтобы ускорить процесс.
        // Теперь проверка типов это отдельный процесс, который не влияет на скорость сборки основного кода.
    ]

    if (isDev) {
        plugins.push(
            new HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
            //  плагин по типу Live Server
            // new BundleAnalyzerPlugin({
            //     openAnalyzer: false,
            //     // можно просматривать размер файлов, пакетов и тд
            //     analyzerPort: 9999
            // }),
        )
        plugins.push(
            // плагин чтобы перенести наши переводы в сборку проекта
            new CopyPlugin({
                patterns: [{ from: paths.locales, to: paths.buildLocales }],
            }),
        )
    }

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: "css/[name].[contenthash:8].css",
                // [contenthash:8] - делает уникальным css файлом
                chunkFilename: "css/[name].[contenthash:8].css",
            }),
        )
        // извлекет css в отдельные файлы)
    }

    return plugins
}
