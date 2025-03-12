import { Project } from "ts-morph"

const project = new Project({})

project.addSourceFilesAtPaths("src/**/*.ts")
project.addSourceFilesAtPaths("src/**/*.tsx")
// пробегаемся по всем файлам с расширение ts, tsx

const files = project.getSourceFiles()
// getSourceFile - получаем все файлы проекта

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
        // получаем большое количество разлчиных путей импортов, пример:
        // entities/Article
        // shared/lib/tests/TestAsyncThunk/TestAsyncThunk
        // ./fetchNextArticlesPage
        if (isAbsolute(value)) {
            // если путь абсолютный, то в начало добавляем '@/'
            importDeclaration.setModuleSpecifier('@/' + value)
        }
    })
})

project.save()
