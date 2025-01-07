import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { ProgressPlugin, webpack, WebpackPluginInstance } from "webpack";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
export function buildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {
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
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ] 
}