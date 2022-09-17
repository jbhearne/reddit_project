import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { computeHeadingLevel } from '@testing-library/react';
import { fetchReddit } from '../../app/redditAPI';

export const fetchSubreddits  = createAsyncThunk(
    'subreddits/fetchSubreddits',
    async (url) => {
        const response = await fetchReddit(url);
        return response.children.map(child => {
            return {
                name: child.data.display_name,
                icon: child.data.icon_img ? child.data.icon_img : '/r.png', //   ./ is different than /  I used ./ and that caused the link to break when the route changed.
                url: child.data.url,
                description: child.data.description,
                id: child.data.id
            }
        })
    }
)

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        url: '', 
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        setSubredditsUrl: (state, action) => {
            state.url = action.payload
        }
    },
    extraReducers: {
        [fetchSubreddits.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchSubreddits.fulfilled]: (state, action) => {
            state.subreddits = action.payload
            state.isLoading = false;
            state.hasError = false;
        },
        [fetchSubreddits.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export const selectSubreddits = (state) => state.subreddits.subreddits;
export const selectSubredditsUrl = (state) => state.subreddits.url;
export const setSubredditsUrl = subredditsSlice.actions.setSubredditsUrl;

export default subredditsSlice.reducer;