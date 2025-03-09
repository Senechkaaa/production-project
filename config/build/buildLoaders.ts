import { RuleSetRule } from 'webpack'
import { BuildOptions } from './types/config'
import { buildCssLoader } from './loaders/buildCssLoader'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    //  порядок loaders которые возвращаются в массиве имеют значения, поэтому выносим
    // Если не используем Typescript - нужен babel-loader
    // const typescriptLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: "file-loader",
            },
        ],
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    }

    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
    // обрабатывает ts и js файлы
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })
    // обрабатывает tsx и jsx файлы

    const cssLoader = buildCssLoader(options.isDev)

    return [
        fileLoader,
        svgLoader,
        tsxCodeBabelLoader,
        codeBabelLoader,
        //  typescriptLoader,
        cssLoader,
    ]
}
