import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { fetchNextArticlePage } from "./fetchNextArticlesPage"
import { fetchArticlesList } from "../fetchArticleList/fetchArticleList"

jest.mock("../fetchArticleList/fetchArticleList")

describe("fetchNextArticlePage.test", () => {
    test("success", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: true,
            }
        })
        await thunk.callThunk();
        expect(thunk.dispatch).toBeCalledTimes(4)
        // expect(fetchArticlesList).toBeCalledWith({page: 3})
        // номер страницы должен был поменяться с 2 на 3
    })

    test("fetchArticleList not called", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: false,
                hasMore: false,
            },
        })
        await thunk.callThunk()
        // expect(thunk.dispatch).toBeCalledTimes(2)
        expect(fetchArticlesList).not.toHaveBeenCalled()
        // номер страницы должен был поменяться с 2 на 3
    })

    test("fetchArticleList not called", async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlePage, {
            articlesPage: {
                page: 2,
                ids: [],
                entities: {},
                limit: 5,
                isLoading: true,
                hasMore: true,
            },
        })
        await thunk.callThunk()
        expect(fetchArticlesList).not.toHaveBeenCalled()
        // номер страницы должен был поменяться с 2 на 3
    })
})
