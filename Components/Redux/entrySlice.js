import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// const updateEntries = createAsyncThunk(
//     'entry/updateEntries',
//     async (thunkAPI, entryData) => {
//         await thunkAPI.dispatch(addEntry({
//             user: entryData.user,
//             id: entryData.id,
//             awsPath: entryData.awsPath,
//             type: entryData.type,
//             title: entryData.title,
//             entry: entryData.entry,
//             moodRating: entryData.moodRating,
//             joy: entryData.joy,
//             joyNote: entryData.joyNote,
//             sadness: entryData.sadness,
//             sadnessNote: entryData.sadnessNote,
//             trust: entryData.trust,
//             trustNote: entryData.trustNote,
//             disgust: entryData.disgust,
//             disgustNote: entryData.disgustNote,
//             fear: entryData.fear,
//             fearNote: entryData.fearNote,
//             anger: entryData.anger,
//             angerNote: entryData.angerNote,
//             surprise: entryData.surprise,
//             surpriseNote: entryData.surpriseNote,
//             anticipation: entryData.anticipation,
//             anticipationNote: entryData.anticipationNote,
//         }))
//     }
// )

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
        // extraReducers: {
        //     [updateEntries.pending]: () => {
        //         console.log('Update Entries pending.')
        //     },
        //     [updateEntries.fulfilled]: () => {
        //         console.log('Update Entries fulfilled.')
        //     },
        //     [updateEntries.rejected]: () => {
        //         console.log('Update Entries rejected.')
        //     }
        // },
    },
});

export const { addEntry, deleteEntry } = entrySlice.actions
export default entrySlice.reducer