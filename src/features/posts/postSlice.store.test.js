import { configureStore } from "@reduxjs/toolkit";
import postsReducer from './postsSlice';
import { fetchPosts } from "./postsSlice";
import { fakePosts } from '../../../__tests__/fakeReddit.data';
import { fetchReddit } from "../../app/redditAPI";

jest.mock('../../app/redditAPI')

describe("the store's configuration with the postsReducer reducer", () => {
    
    const testStore = configureStore({
        reducer: {
            posts: postsReducer
        }
    });
    let state = testStore.getState();

    it('should be defined', () => {
        expect(testStore).toBeDefined();
    });

    it('should have a dispatch function', () => {
        expect(typeof testStore.dispatch).toBe('function');
    });

    it('should have an initial state for "posts"', () => {
        expect(state.posts).toBeDefined();
    });

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
    });

    it('should dispatch', () => {
        const action = {type: 'posts/setPostsPath', payload: 'test'};
        testStore.dispatch(action);
        state = testStore.getState();
        expect(state.posts.path).toBe(action.payload);
    });
});

describe("how fetchPosts is used to set posts.posts state", () => {
    const testStore = configureStore({
        reducer: {
            posts: postsReducer
        }
    });
    let state = testStore.getState();
    
    it('should dispatch using "TEST" keyword programed into the postSlice to call mocked data', async () => {
        fetchReddit.mockResolvedValue(fakePosts);
        await testStore.dispatch(fetchPosts('https://www.reddit.com/subreddits.json'));
        state = testStore.getState();
        expect(state.posts.posts.length).toBe(fakePosts.children.length);
    });

    it('should have a author propery set on the first item in the array', () => {
        const authorName = fakePosts.children[0].data.author;
    });

    it('should update posts when new data is dispatched', async () => {
        fakePosts.children[0].data.author = 'greg';
        fetchReddit.mockResolvedValue(fakePosts);
        await testStore.dispatch(fetchPosts('https://www.reddit.com/subreddits.json'));
        state = testStore.getState();
        expect(state.posts.posts[0].author).toBe('greg');
    });
});

