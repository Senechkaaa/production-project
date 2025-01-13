import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // в пути файла будет не "test.ts", а test
        preferAbsolute: true,
        // Абсолютные пути в приоритете
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        // для каждого модуля главным файлом будет являться index,
        alias: {
            
        }
    }
}