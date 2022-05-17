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
                icon: child.data.icon_img,  // I might want to put a ternary here to apply a default icon if none exists.
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
        subreddits: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
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

export default subredditsSlice.reducer;