import { createSlice } from '@reduxjs/toolkit';

const usernameSlice = createSlice({
    name: 'username',
    initialState: '',
    reducers: {
        handleUsername: (state, action) => {
        },
    },
});

export const { handleUsername } = usernameSlice.actions
export default usernameSlice.reducer