import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Vibration, TouchableWithoutFeedback, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import libraries for Redux
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from './../Redux/entrySlice';

export default async function AsyncStorageGet( user ) {
    console.log('User: ', user)
    console.log('In AsyncStorageGet')
    const dispatch = useDispatch()
    console.log('After dispatch initailized.')
    try {
        console.log('In AsyncStorageGet Try statement')
        const allKeys = await AsyncStorage.getAllKeys()
        // console.log('All Keys: ', allKeys)
        const entryKeys = allKeys.filter(key => /^\d+$/.test(key)).sort()
        console.log('Entry Keys: ', entryKeys)

        let entryDataObject = {}
        for(let i = 0; i < entryKeys.length; i++) {                    
            const entryDataStringify = await AsyncStorage.getItem(entryKeys[i])
            const entryData = JSON.parse(entryDataStringify)
            console.log('User: ', user)
            console.log('Username: ', entryData.username)
            dispatch(addEntry({
                id: entryData.id,
                username: entryData.username,
                awsPath: entryData.awsPath,
                type: entryData.type,
                title: entryData.title,
                entry: entryData.entry,
                moodRating: entryData.moodRating,
                joy: entryData.joy,
                joyNote: entryData.joyNote,
                trust: entryData.trust,
                trustNote: entryData.trustNote,
                fear: entryData.fear,
                fearNote: entryData.fearNote,
                surprise: entryData.surprise,
                surpriseNote: entryData.surpriseNote,
                sadness: entryData.sadness,
                sadnessNote: entryData.sadnessNote,
                disgust: entryData.disgust,
                disgustNote: entryData.disgustNote,
                anger: entryData.anger,
                angerNote: entryData.angerNote,
                anticipation: entryData.anticipation,
                anticipationNote: entryData.anticipationNote,
            }))
            entryDataObject[entryKeys[i]] = entryData
        }
        // console.log('Entry Data AsyncStorageGet: ', entryDataObject)
    } catch (error) {
        console.log('Error getting keys from AsyncStorage: ', error)
    }
    console.log('Here after the try')
}
