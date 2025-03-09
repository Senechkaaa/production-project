import { PluginItem } from "@babel/core"

// самописный BabelPlugin, который в продакшн сборке удаляет атрибут data-testid
export default function (): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const forbidden = state.opts.props || []

                path.traverse({
                    JSXIdentifier(current) {
                        const nodeName = current.node.name

                        if(forbidden.includes(nodeName)) {
                            current.parentPath.remove()
                        }
                    }
                })
            }
        },
    }
}
