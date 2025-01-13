import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, webpack, WebpackPluginInstance } from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export function buildPlugins({paths, isDev}: BuildOptions): WebpackPluginInstance[] {

    return [
        new HtmlWebpackPlugin({
            template: paths.html,
            // template - чтобы отображался div с классом root
            // этот файл будет использоваться как шаблон
        }),
        new ProgressPlugin(),
        // отслеживать за прогрессом
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            // [contenthash:8] - делает уникальным css файлом
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        // извлекет css в отдельные файлы
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
        }),
        // с помощью него в приложение можно прокидывать глобальные переменные
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new HotModuleReplacementPlugin(),
        //  плагин по типу Live Server
    ] 
}