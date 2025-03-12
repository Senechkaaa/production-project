import { ComponentStory, ComponentMeta } from "@storybook/react"
import ArticleDetailsPage from "./ArticleDetailsPage"
import {
    Article,
    ArticleBlockType,
    ArticleType,
} from "@/entities/Article"
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator"

export default {
    title: "pages/ArticleDetailsPage",
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: {
        to: "/",
    },
} as ComponentMeta<typeof ArticleDetailsPage>

const article: Article = {
    id: "1",
    title: "Javascript news",
    subtitle: "Что нового в JS за 2025 год?",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
    views: 1022,
    user: {
        id: "1",
        username: "Sigam boy",
    },
    createdAt: "26.01.2025",
    type: [ArticleType.IT],
    blocks: [
        {
            id: "1",
            type: ArticleBlockType.TEXT,
            title: "Заголовок этого блока",
            paragraphs: [
                "WebSocket: Идеален для приложений, где требуется двусторонняя коммуникация в реальном времени и минимальные задержки. Подходит для реализации чатов, онлайн-игр и систем уведомлений.",
                "Socket.IO: Выбор для проектов, где важно обеспечить стабильное соединение даже в нестабильных сетевых условиях, благодаря автоматическому переподключению и поддержке fallback.",
            ],
        },
        {
            id: "4",
            type: ArticleBlockType.CODE,
            code: "<!DOCTYPE html>\n<html lang=\"ru\">\n<head>\n<meta charset=\"UTF-8\" />\n<title>Socket.IO Пример</title>\n</head>\n<body>\n<h1>Пример подключения Socket.IO</h1>\n<script src=\"/socket.io/socket.io.js\"></script>\n<script>\nconst socket = io();\n\nsocket.on('connect', () => {\nconsole.log('Подключено к серверу');\nsocket.emit('message', 'Привет, сервер!');\n});\n\nsocket.on('message', (msg) => {\nconsole.log('Сообщение от сервера:', msg);\n});\n</script>\n</body>\n</html>",
        },
        {
            id: "2",
            type: ArticleBlockType.IMAGE,
            src: "https://www.fullstackpython.com/img/visuals/websockets-flow.png",
            title: "Рисунок 1 - схема сокетов",
        },
        {
            id: "3",
            type: ArticleBlockType.CODE,
            code: "const express = require('express');\nconst http = require('http');\nconst { Server } = require('socket.io');\n\nconst app = express();\nconst server = http.createServer(app);\nconst io = new Server(server);\n\n// Обработка подключения клиента\nio.on('connection', (socket) => {\n console.log('Пользователь подключился');\n\n // Обработка сообщения от клиента\n socket.on('message', (msg) => {\n  console.log('Получено сообщение:', msg);\n  // Отправляем сообщение обратно клиенту (эхо)\n  socket.emit('message', msg);\n });\n\n socket.on('disconnect', () => {\n  console.log('Пользователь отключился');\n });\n});\n\nserver.listen(3000, () => {\n console.log('Сервер запущен на порту 3000');\n});",
        },
        {
            id: "6",
            type: ArticleBlockType.TEXT,
            title: "Заголовок этого блока",
            paragraphs: [
                "WebSocket: Идеален для приложений, где требуется двусторонняя коммуникация в реальном времени и минимальные задержки. Подходит для реализации чатов, онлайн-игр и систем уведомлений.",
                "Socket.IO: Выбор для проектов, где важно обеспечить стабильное соединение даже в нестабильных сетевых условиях, благодаря автоматическому переподключению и поддержке fallback.",
            ],
        },
        {
            id: "7",
            type: ArticleBlockType.IMAGE,
            src: "https://www.fullstackpython.com/img/visuals/websockets-flow.png",
            title: "Рисунок 1 - схема сокетов",
        },
        {
            id: "12",
            type: ArticleBlockType.TEXT,
            title: "Заголовок этого блока",
            paragraphs: [
                "WebSocket: Идеален для приложений, где требуется двусторонняя коммуникация в реальном времени и минимальные задержки. Подходит для реализации чатов, онлайн-игр и систем уведомлений.",
            ],
        },
    ],
}

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
    <ArticleDetailsPage {...args} />
)

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [
    StoreDecorator({
        articleDetails: {
            data: article,
        },
    }),
]
