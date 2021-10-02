import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Vibration, TouchableWithoutFeedback, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function AsyncStorageSave(data, key, type) {

    console.log('\nInside of AsyncStorageSave.\n')
    // console.log('\nData: ', data)
    // console.log('\nKey: ', key)
    // console.log('\nType: ', type)
    try {
        const jsonData = JSON.stringify(data)
        await AsyncStorage.setItem(key, jsonData)
    } catch (error) {
        console.log('Error storing data to Async Storage: ', error)
    }
}
