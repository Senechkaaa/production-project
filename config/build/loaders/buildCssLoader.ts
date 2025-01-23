import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Если MiniCssExtractPlugin.loader - то css будет хранится в отдельном файле, а иначе в js файле
            {
                // чтобы настраивать loader, делаем обьект и добавляем options: {}
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) =>
                            Boolean(resPath.includes('.module.')),
                        // если есть .module возвращаем true,
                        localIdentName: isDev
                            ? '[path][name]__[local]'
                            : '[hash:base64:8]',
                        // если dev сборка, то обычный класс .btn, а если нет то FdsODmD2
                    },
                },
            },
            'sass-loader',
        ],
    }
}
