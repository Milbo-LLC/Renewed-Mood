import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Vibration, TouchableWithoutFeedback, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// Import libraries for Redux
import { useDispatch, useSelector } from 'react-redux';
import { addEntry } from './../Redux/entrySlice';
import { updatePersisted } from './../Redux/persistedSlice';

export default async function AsyncStorageGet() {
    console.log('\nInside of AsyncStorageGet.\n')
    const dataKeys = []
    const data = {}

    const dispatch = useDispatch();
    const entries = useSelector((state) => state.entry);
    // console.log(useSelector((state) => state.persisted))
    const persistedState = useSelector((state) => state.persisted);
    // const entriesCopy = Object.assign(entries)
    // console.log('entries: ', entries)
    console.log('Persisted State Begining: ', persistedState)
    if(persistedState.isPersisted === false) {
        // console.log('persistedState must be false.')
        try {
            const keys = await AsyncStorage.getAllKeys();
            // console.log('Keys: ', keys)
            // for(key in keys) {
            //     if(keys[key].split('/')[0] === 'Entries') {
            //         dataKeys.push(keys[key])
            //         data[keys[key]] = await AsyncStorage.getItem(keys[key])
            //         // const data = await AsyncStorage.multiGet(keys)
            //     }
            // }
            for(key in keys) {
                if(/^\d+$/.test(keys[key])) {
                    dataKeys.push(keys[key])
                    const data = await AsyncStorage.getItem(keys[key])
                    // dataObject = JSON.parse(data)
                    dataObject = JSON.parse(data)
                    if(entries.length !== 0) {
                        for(let i = 0; i < entries.length; i++) {
                            // console.log('Entry ', i, ': ', entries[i].id)
                            // console.log('Type of Entries.id: ', typeof entries[i].id)
                            if(Math.abs(entries[i].id - dataObject.id) < 1000) {
                                console.log('Should not dispatch Entry ', i, ': ', entries[i])
                                console.log('Before Dispatching updatePersisted()')
                                dispatch(updatePersisted())
                                console.log('Persisted State End: ', persistedState)
                                break
                            } else {
                                if(i === entries.length-1) {
                                    console.log('Dispatching Entry: ', dataObject)
                                    dispatch(addEntry({
                                        id: dataObject.id,
                                        user: dataObject.user,
                                        awsPath: dataObject.awsPath,
                                        type: dataObject.type,
                                        title: dataObject.title,
                                        entry: dataObject.entry,
                                        moodRating: dataObject.moodRating,
                                        joy: dataObject.joyIntensity,
                                        joyNote: dataObject.joyNote,
                                        trust: dataObject.trustIntensity,
                                        trustNote: dataObject.trustNote,
                                        fear: dataObject.fearIntensity,
                                        fearNote: dataObject.fearNote,
                                        surprise: dataObject.surpriseIntensity,
                                        surpriseNote: dataObject.surpriseNote,
                                        sadness: dataObject.sadnessIntensity,
                                        sadnessNote: dataObject.sadnessNote,
                                        disgust: dataObject.disgustIntensity,
                                        disgustNote: dataObject.disgustNote,
                                        anger: dataObject.angerIntensity,
                                        angerNote: dataObject.angerNote,
                                        anticipation: dataObject.anticipationIntensity,
                                        anticipationNote: dataObject.anticipationNote,
                                    }))
                                }
                            }
                        }
                    } else {
                        console.log('Dispatching Entry')
                        dispatch(addEntry({
                            id: dataObject.id,
                            user: dataObject.user,
                            awsPath: dataObject.awsPath,
                            type: dataObject.type,
                            title: dataObject.title,
                            entry: dataObject.entry,
                            moodRating: dataObject.moodRating,
                            joy: dataObject.joyIntensity,
                            joyNote: dataObject.joyNote,
                            trust: dataObject.trustIntensity,
                            trustNote: dataObject.trustNote,
                            fear: dataObject.fearIntensity,
                            fearNote: dataObject.fearNote,
                            surprise: dataObject.surpriseIntensity,
                            surpriseNote: dataObject.surpriseNote,
                            sadness: dataObject.sadnessIntensity,
                            sadnessNote: dataObject.sadnessNote,
                            disgust: dataObject.disgustIntensity,
                            disgustNote: dataObject.disgustNote,
                            anger: dataObject.angerIntensity,
                            angerNote: dataObject.angerNote,
                            anticipation: dataObject.anticipationIntensity,
                            anticipationNote: dataObject.anticipationNote,
                        }))
                    }                    
                }
            }
            console.log('Before Dispatching updatePersisted()')
            dispatch(updatePersisted())
            console.log('Persisted State End: ', persistedState)
            return data
        } catch (error) {
            console.log('Error importing data from AsyncStorage: ', error)
        } finally {
            console.log('Made it out of the try statement.')
        }
        // console.log('Entries', entries)
    }
}
