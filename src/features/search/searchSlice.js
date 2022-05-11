import { createSlice } from '@reduxjs/toolkit';


export const searchSlice = createSlice({
    name: 'search',
    initialState: '',
    reducers: {
        search: (state, action) => {
            state  = action.payload;
        }
    }
})

export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
