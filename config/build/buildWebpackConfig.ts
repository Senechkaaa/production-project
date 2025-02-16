import { Configuration } from 'webpack'
import { BuildOptions } from './types/config'
import { buildPlugins } from './buildPlugins'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildDevServer } from './buildDevServer'

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options

    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/'
        },

        plugins:  buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        //   настройка путей
        devtool: isDev ? 'inline-source-map' : false,
        //   если дев, то будет показывать азгрузка
        devServer: isDev ? buildDevServer(options) : undefined,
        //   если дев режим, то сервер запустится
    }
}
