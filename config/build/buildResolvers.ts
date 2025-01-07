import { ResolveOptions } from "webpack";

export function buildResolvers(): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        // в пути файла будет не "test.ts", а test
    }
}