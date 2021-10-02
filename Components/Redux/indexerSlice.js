import { createSlice } from '@reduxjs/toolkit';

const indexerSlice = createSlice({
    name: 'indexer',
    initialState: {
        horizontalIndex: 0,
        mediaIndex: 0,
    },
    reducers: {
        updateHorizontalIndex: (state, action) => {
            state.horizontalIndex = action.payload
        },
        updateMediaIndex: (state, action) => {
            state.mediaIndex = action.payload
        },
    },
});

export const { updateHorizontalIndex, updateMediaIndex } = indexerSlice.actions
export default indexerSlice.reducer