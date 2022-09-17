import subredditsReducer, {setSubredditsUrl, fetchSubreddits} from './subredditsSlice'
import { fakePosts } from '../../../__tests__/fakeReddit.data'

describe('subreddits reducer', () => {
    const initialState = {
        url: '',
        subreddits: [],
        isLoading: false,
        hasError: false
    };
    const fakePath = '/PATH'
    const fakePrefix = 'PREFIX'
    const fakeUrl = fakePrefix + fakePath;
    const fakeResult = [{fakeSubreddit: 'fake Subreddit'}, {fakeSubreddit: 'fake Subreddit'}]

    it('should handle initial state', () => {
        expect(subredditsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
    
    it('should set the URL by calling setSubredditsUrl with fakeUrl', () => {
        const actual = subredditsReducer(initialState, setSubredditsUrl(fakeUrl));
        expect(actual.url).toEqual('PREFIX/PATH');
    })

    it('should be in a loading state when fetchSubreddits is first called', async () => {
        const actual = subredditsReducer(initialState, fetchSubreddits.pending(fakeResult));
        expect(actual.isLoading).toEqual(true);
    })

    it('should be in a error state when fetchSubreddits is rejected', async () => {
        const actual = subredditsReducer(initialState, fetchSubreddits.rejected(fakeResult));
        expect(actual.hasError).toEqual(true);
    })

    it('should have fetched posts when fetchSubreddits is resolved', async () => {
        const actual = subredditsReducer(initialState, fetchSubreddits.fulfilled(fakeResult));
        expect(actual.subreddits).toBeTruthy();
        expect(actual.subreddits[0].fakeSubreddit).toBe('fake Subreddit')
    })
})