import path from "path"
import { Project } from "ts-morph"

const project = new Project({})
// ts-node .\scripts\refactoring\createPublicApiForSharedUi.ts
project.addSourceFilesAtPaths("src/**/*.ts")
project.addSourceFilesAtPaths("src/**/*.tsx") // пробегаемся по всем файлам с расширение ts, tsx

const files = project.getSourceFiles() // getSourceFile - получаем все файлы проекта

const sharedUiDirectory = project.getDirectory(path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui')) 
// получаем папки с shared/ui
const componentsDirs = sharedUiDirectory?.getDescendantDirectories() // получаем все папки с компонентами в виде массива


componentsDirs?.forEach(directory => {
    const indexFilePath = directory.getPath() + "/index.ts" // получаем путь файла
    const indexFile = directory.getSourceFile(indexFilePath)

    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}`
        const file = directory.createSourceFile(indexFilePath, sourceCode, {
            overwrite: true,
        }) // создаем файл и добавляем туда код
        file.save()
    }
})

function isAbsolute(value: string) {
    const layers = ["app", "shared", "entities", "features", "widgets", "pages"]
    // если начинается на какой-то из слоев, возвращаем true
    if (layers.some((layer) => value.startsWith(layer))) {
        return true
    }
}

files.forEach((sorceFile) => {
    const importDeclarations = sorceFile.getImportDeclarations()
    // getImportDeclarations - получаем все импорты файла

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue()
        const valueWithoutAlias = value.replace("@/", "") // убираем alias

        const segments = valueWithoutAlias.split("/")

        const isSharedLayer = segments?.[0] === "shared"
        const isUISLice = segments?.[1] === "ui"

        if (isAbsolute(valueWithoutAlias) && isSharedLayer && isUISLice) {
            // если путь абсолютный, то в начало добавляем '@/'
            const result = valueWithoutAlias.split("/").slice(0, 3).join("/")
            importDeclaration.setModuleSpecifier(`@/${result}`)
        }
    })
})


project.save()
