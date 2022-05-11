import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchReddit } from '../../app/redditAPI';


const convertTime = unixTime => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000; // getTimezoneOffset() in minutes * 60(seconds) * 1000(miliseconds) = 60000
    const date = new Date((unixTime * 1000) - timezoneOffset)
    return date.toDateString()
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (url) => {
        const response = await fetchReddit(url);
        return response.children.map(child => {
            return {
                author: child.data.author,
                title: child.data.title,
                date: convertTime(child.data.created),
                upvotes: child.data.score,
                text: child.data.selftext,
                images: child.data.gallery_data.map(media => {
                    if (child.data.media_metadata.[media.media_id].e === 'Image') {
                        return child.data.media_metadata.[media.media_id].p[4].u.replace('https://preview.redd.it', 'https://i.redd.it');
                    };
                })

            }
        })
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload
            state.isLoading = false;
            state.hasError = false;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export const selectPosts = (state) => state.posts.posts;

export default postsSlice.reducer