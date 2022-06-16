import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './postsSlice'
import { fetchPosts } from "./postsSlice";
import * as fR from "../../app/redditAPI";
import { fakePosts } from '../../../__tests__/fakeReddit.data'
import * as pS from "./postsSlice"
import { scryRenderedComponentsWithType } from "react-dom/test-utils";


/*fR.fetchReddit = async () => {
    const promise = new Promise((res, rej) => {
        setTimeout(() => res(fakePosts), 100);
    })
    const result = await promise.then(res => res);
    return result
}*/

/*pS.fR = jest.fn(async () => {
    const promise = new Promise((res, rej) => {
        setTimeout(() => res(fakePosts), 100);
    })
    const result = await promise.then(res => res);
    return result
})*/


describe("the store's configuration with the postsReducer reducer", () => {
    
    const testStore = configureStore({
        reducer: {
            posts: postsReducer
        }
    })
    let state = testStore.getState()

    it('should be defined', () => {
        expect(testStore).toBeDefined()
    })
    it('should have a dispatch function', () => {
        expect(typeof testStore.dispatch).toBe('function')
    })
    it('should have an initial state for "posts"', () => {
        expect(state.posts).toBeDefined()
    })
    it('should have the initial state determined by postsSlice', () => {
        const expectedInitialState = {
            prefix: 'https://www.reddit.com',
            path: '',
            url: '',
            posts: [],
            isLoading: false,
            hasError: false
        }
        expect(state.posts).toEqual(expectedInitialState);
    })
    it('should dispatch', () => {
        const action = {type: 'posts/setPostsPath', payload: 'test'};
        testStore.dispatch(action)
        state = testStore.getState()
        expect(state.posts.path).toBe(action.payload)
    })
})

describe("how fetchPosts is used to set posts.posts state", () => {
    //const fakeUrl = 'PREFIX/PATH'
    const testStore = configureStore({
        reducer: {
            posts: postsReducer
        }
    })
    let state = testStore.getState()

    /*it('should mock fetchReddit', async () => {
        const mocked = await pS.fR("https://www.reddit.com/r/popular.json")
        expect(mocked).toBe('p')
    })*/
    
    it('should dispatch using "TEST" keyword programed into the postSlice to call mocked data', async () => {
        await testStore.dispatch(fetchPosts("TEST"))
        state = testStore.getState() 
        expect(state.posts.posts.length).toBe(fakePosts.children.length)
    })
    it('should have a author propery set on the first item in the array', async () => {
        const authorName = fakePosts.children[0].data.author
        expect(state.posts.posts[0].author).toBe(authorName)
    })
    it('should update posts when new data is dispatched', async () => {
        fakePosts.children[0].data.author = 'greg'
        await testStore.dispatch(fetchPosts("TEST"))
        state = testStore.getState() 
        expect(state.posts.posts[0].author).toBe('greg')
    })
    

})

