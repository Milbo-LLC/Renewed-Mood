import { createSlice } from '@reduxjs/toolkit';

const persistedSlice = createSlice({
    name: 'persisted',
    initialState: {
        isPersisted: false
    },
    reducers: {
        updatePersisted: (state) => {
            state.isPersisted = true
        },
    },
});

export const { updatePersisted } = persistedSlice.actions
export default persistedSlice.reducer