import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        search: ''
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const selectSearch = (state) => state.search.search;
export const setSearch = searchSlice.actions.setSearch;

export default searchSlice.reducer;
