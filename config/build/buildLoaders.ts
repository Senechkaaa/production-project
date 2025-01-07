import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";

export function buildLoaders(options: BuildOptions): RuleSetRule[] {

    //  порядок loaders которые возвращаются в массиве имеют значения, поэтому выносим
    // Если не используем Typescript - нужен babel-loader
    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const cssLoader =  {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
            options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Если MiniCssExtractPlugin.loader - то css будет хранится в отдельном файле, а иначе в js файле
          {
            // чтобы настраивать loader, делаем обьект и добавляем options: {}
            loader: "css-loader",
            options: {
                modules: {
                    auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                    // если есть .module возвращаем true,
                    localIdentName: options.isDev 
                    ? '[path][name]__[local]' 
                    : '[hash:base64:8]',
                    // если dev сборка, то обычный класс .btn, а если нет то FdsODmD2
                },
            }
          },
          "sass-loader",
        ],
      }

    return [
        typescriptLoader,
        cssLoader
      ]
}