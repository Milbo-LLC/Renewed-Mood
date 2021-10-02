import { createSlice } from '@reduxjs/toolkit';

const classifierSlice = createSlice({
    name: 'classifier',
    initialState: {
        classifierEnabled: false,
    },
    reducers: {
        changeClassifierState: (state) => {
            state.classifierEnabled = !classifierEnabled
        },
    },
});

export const { changeClassifierState} = classifierSlice.actions
export default classifierSlice.reducer