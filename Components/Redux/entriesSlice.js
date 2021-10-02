import { createSlice } from '@reduxjs/toolkit';

const entriesSlice = createSlice({
    name: 'entries',
    initialState: {
        videoCount: 0,
        audioCount: 0,
        textCount: 0,
    },
    reducers: {
        incrementVideoCount: (state) => {
            state.videoCount += 1 
        },
        decrementVideoCount: (state) => {
            state.videoCount -= 1 
        },
        incrementAudioCount: (state) => {
            state.audioCount += 1 
        },
        decrementAudioCount: (state) => {
            state.audioCount -= 1 
        },
        incrementTextCount: (state) => {
            state.textCount += 1 
        },
        decrementTextCount: (state) => {
            state.textCount -= 1 
        },
    },
});

export const { incrementVideoCount, decrementVideoCount, incrementAudioCount,  decrementAudioCount, incrementTextCount, decrementTextCount } = entriesSlice.actions
export default entriesSlice.reducer