import { createSlice } from '@reduxjs/toolkit';

const entrySlice = createSlice({
    name: 'entry',
    initialState: [],
    reducers: {
        addEntry: (state, action) => {
            const newEntry = {

                // Entry details
                user: action.payload.user,
                id: action.payload.id,
                awsPath: action.payload.awsPath,
                type: action.payload.type,
                title: action.payload.title,
                entry: action.payload.entry,

                // Classifications for entry
                // Primary Classifications
                moodRating: action.payload.moodRating,
                joy: action.payload.joy,
                joyNote: action.payload.joyNote,
                sadness: action.payload.sadness,
                sadnessNote: action.payload.sadnessNote,
                trust: action.payload.trust,
                trustNote: action.payload.trustNote,
                disgust: action.payload.disgust,
                disgustNote: action.payload.disgustNote,
                fear: action.payload.fear,
                fearNote: action.payload.fearNote,
                anger: action.payload.anger,
                angerNote: action.payload.angerNote,
                surprise: action.payload.surprise,
                surpriseNote: action.payload.surpriseNote,
                anticipation: action.payload.anticipation,
                anticipationNote: action.payload.anticipationNote,
            }
            state.push(newEntry)
        },
        deleteEntry: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id)
        },
    },
});

export const { addEntry, deleteEntry } = entrySlice.actions
export default entrySlice.reducer