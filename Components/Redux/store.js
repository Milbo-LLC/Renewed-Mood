import { configureStore } from '@reduxjs/toolkit';
import entryReducer from './entrySlice';
import entriesReducer from './entriesSlice';
import usernameReducer from './usernameSlice';
import indexerReducer from './indexerSlice';
import classifierReducer from './classifierSlice';
import persistedReducer from './persistedSlice';

export const store = configureStore({
    reducer: {
        entry: entryReducer,
        entries: entriesReducer,
        username: usernameReducer,
        indexer: indexerReducer,
        classifier: classifierReducer,
        persisted: persistedReducer,
    }
})