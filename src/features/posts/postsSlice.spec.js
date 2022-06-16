import postsReducer, {
    selectPosts,
    selectPostsUrl,
    selectPostsPath,
    selectPostsPrefix,
    setPostsUrl,
    setPostsPrefix,
    setPostsPath,
    fetchPosts
} from './postsSlice'

describe('posts reducer', () => {
    const initialState = {
        prefix: 'https://www.reddit.com',
        path: '',
        url: '',
        posts: [],
        isLoading: false,
        hasError: false
    };
    const fakePath = '/PATH'
    const fakePrefix = 'PREFIX'
    const fakeUrl = fakePrefix + fakePath;
    const fakeResult = [{fakePost: 'fake post'}, {fakePost: 'fake post'}]

    it('should handle initial state', () => {
        expect(postsReducer(undefined, { type: 'unknown' })).toEqual(initialState)
    })
    
    it('should set the URL path using setPostsPath', () => {
        const actual = postsReducer(initialState, setPostsPath(fakePath));
        expect(actual.path).toEqual('/PATH');
    })

    it('should set the URL prefix and domain using setPostsPrefix', () => {
        const actual = postsReducer(initialState, setPostsPrefix(fakePrefix));
        expect(actual.prefix).toEqual('PREFIX');
    })

    it('should set the URL by calling setPostsUrl without arguments', () => {
        initialState.prefix = fakePrefix;
        initialState.path = fakePath;
        const actual = postsReducer(initialState, setPostsUrl());
        expect(actual.url).toEqual(fakeUrl);
    })

    it('should be in a loading state when fetchPosts is first called', async () => {
        const actual = postsReducer(initialState, fetchPosts.pending(fakeResult));
        expect(actual.isLoading).toEqual(true);
    })

    it('should be in a error state when fetchPosts is rejected', async () => {
        const actual = postsReducer(initialState, fetchPosts.rejected(fakeResult));
        expect(actual.hasError).toEqual(true);
    })

    it('should have fetched posts when fetchPosts is resolved', async () => {
        const actual = postsReducer(initialState, fetchPosts.fulfilled(fakeResult));
        expect(actual.posts).toBeTruthy();
        expect(actual.posts[0].fakePost).toBe('fake post')
    })
})

/*describe('Asyncronous thunk fecthPosts', () => {
    const fakeUrl = 'PREFIX/PATH'
    const realUrl = 'https://www.reddit.com/r/popular.json'
    const d = (thunk) => {
        return thunk;
    }
    const getState = () => {
        return {
            posts: {
                prefix: 'https://www.reddit.com',
                path: '',
                url: '',
                posts: [],
                isLoading: false,
                hasError: false
            }
        }
    }

    it('should be rejected if given a bad url', async () => {
        const initPromise = fetchPosts(realUrl);
        expect(initPromise(d, getState).unwrap()).toBe(Promise)

    })


})*/