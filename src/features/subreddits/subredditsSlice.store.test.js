import subredditsReducer, { fetchSubreddits} from './subredditsSlice'
import { fakeSubreddits } from '../../../__tests__/fakeReddit.data'
import { configureStore } from "@reduxjs/toolkit";
import { fetchReddit } from "../../app/redditAPI"

jest.mock('../../app/redditAPI')

describe("the store's configuration with the subredditsReducer reducer", () => {
    
    const testStore = configureStore({
        reducer: {
            subreddits: subredditsReducer
        }
    })
    let state = testStore.getState()

    it('should be defined', () => {
        expect(testStore).toBeDefined();
    });

    it('should have a dispatch function', () => {
        expect(typeof testStore.dispatch).toBe('function');
    });

    it('should have an initial state for "posts"', () => {
        expect(state.subreddits).toBeDefined();
    });

    it('should have the initial state determined by postsSlice', () => {
        const expectedInitialState = {
            url: '',
            subreddits: [],
            isLoading: false,
            hasError: false
        };
        expect(state.subreddits).toEqual(expectedInitialState);
    });

    it('should dispatch', () => {
        const action = {type: 'subreddits/setSubredditsUrl', payload: 'test'};
        testStore.dispatch(action);
        state = testStore.getState();
        expect(state.subreddits.url).toBe(action.payload);
    });

    it('should dispatch fetchSubreddits thunk with mocked data', async () => {
        fetchReddit.mockResolvedValue(fakeSubreddits); //this took me awhile to figure out. I was attemping to do this at the top level scope and fetchreddit kept returning undefined no matter if I used mockReturnValue or mockResolvedValue. This has to be defined within the test scope.
        await testStore.dispatch(fetchSubreddits('https://www.reddit.com/subreddits.json'));
        state = testStore.getState();        
        expect(state.subreddits.subreddits.length).toBe(fakeSubreddits.children.length)
    });

    it('should have used fetchSubreddits to set a name property on the first item in the array', () => {
        const expectedName = fakeSubreddits.children[0].data.display_name;
        expect(state.subreddits.subreddits[0].name).toBe(expectedName);
    });

    it('should update subreddits when new data is dispatched', async () => {
        fakeSubreddits.children[0].data.display_name = 'NewSubreddit';
        fetchReddit.mockResolvedValue(fakeSubreddits);
        await testStore.dispatch(fetchSubreddits('https://www.reddit.com/subreddits.json'));
        state = testStore.getState();
        expect(state.subreddits.subreddits[0].name).toBe('NewSubreddit');
    });
});