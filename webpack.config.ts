import path from 'path'
import webpack from 'webpack'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildEnv, BuildPaths } from './config/build/types/config'

export default (env: BuildEnv) => {
  // возвращаем функцию чтобы использовать переменные окружения env
const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build') ,
  html: path.resolve(__dirname, 'public', `index.html`),
  src: path.resolve(__dirname, 'src')
}

const mode = env.mode || "development"
const PORT = env.port || 3000
console.log(PORT)
const isDev = mode === 'development'

//  npx webpack --config webpack.config.ts
const config: webpack.Configuration = buildWebpackConfig({
  mode: mode,
  paths,
  isDev,
  port: PORT,
}
)
    return config
}
