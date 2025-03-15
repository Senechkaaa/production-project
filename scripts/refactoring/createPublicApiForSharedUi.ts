import path from "path"
import { Project } from "ts-morph"

const project = new Project({})
// ts-node .\scripts\refactoring\createPublicApiForSharedUi.ts
project.addSourceFilesAtPaths("src/**/*.ts")
project.addSourceFilesAtPaths("src/**/*.tsx")
// пробегаемся по всем файлам с расширение ts, tsx

const files = project.getSourceFiles()
// getSourceFile - получаем все файлы проекта

const sharedUiDirectory = project.getDirectory(path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui'))
// получаем папки с shared/ui
const componentsDirs = sharedUiDirectory?.getDescendantDirectories()
// получаем все папки с компонентами в виде массива

function isAbsolute(value: string) {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"]
    // если начинается на какой-то из слоев, возвращаем true
    if (layers.some((layer) => value.startsWith(layer))) {
        return true
    }
}

componentsDirs?.forEach(directory => {
    const indexFilePath = directory.getPath() + '/index.ts'
    // получаем путь файла
    const indexFile = directory.getSourceFile(indexFilePath)
    
    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName}`
        const file = directory.createSourceFile(indexFilePath, sourceCode, {overwrite: true})
        // создаем файл и добавляем туда код

        file.save()
    }
})
// получаем имя

// files.forEach((sorceFile) => {
//     const importDeclarations = sorceFile.getImportDeclarations()
//     // getImportDeclarations - получаем все импорты файла

//     importDeclarations.forEach((importDeclaration) => {
//         const value = importDeclaration.getModuleSpecifierValue()
//         // получаем большое количество разлчиных путей импортов, пример:
//         // entities/Article
//         // shared/lib/tests/TestAsyncThunk/TestAsyncThunk
//         // ./fetchNextArticlesPage
//         if (isAbsolute(value)) {
//             // если путь абсолютный, то в начало добавляем '@/'
//             importDeclaration.setModuleSpecifier('@/' + value)
//         }
//     })
// })

project.save()
