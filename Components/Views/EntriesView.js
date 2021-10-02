import React, { useState, useEffect, useRef, useCallback, useReducer } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';

import { PanGestureHandler } from 'react-native-gesture-handler'
// import Animated from 'react-native-reanimated'

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from './../Redux/entriesSlice';

import AudioEntryItem from './Audio/audioEntryItem';
import VideoEntryItem from './Video/videoEntryItem';
import TextEntryItem from './Text/textEntryItem';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import moment from 'moment';
import { set, Value } from 'react-native-reanimated';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorageGet from '../../AsyncStorage/AsyncStorageGet';

export default function EntriesView( param ) {
    // console.log('param in EntriesView: ', param)
    let audioEntryCount = 0, videoEntryCount = 0, textEntryCount = 0
    let dayCount = 0
    let audioEntryList = [], videoEntryList = [], textEntryList = []
    let monthsWithEntries = new Set()
    // monthsWithEntries.add('October 2021')
    // monthsWithEntries.add('September 2021')
    let daysWithEntries = new Set()
    // daysWithEntries.add('Sat 2 - October 2021')
    // daysWithEntries.add('Fri 1 - October 2021')
    // daysWithEntries.add('Tue 21 - September 2021')
    // daysWithEntries.add('Sat 25 - September 2021')
    // daysWithEntries.add('Sun 19 - September 2021')
    let entriesDict = {}
    const entries = useSelector((state) => state.entry);
    // console.log('Entries from top of EntriesView: ', entries)
    // console.log('\n\n', param.route.params.username, '\n\n')
    // let username = undefined

    let username = ''
    try {
        username = param.param.route.params.username
    } catch(error) {
        console.log('Error is param.param.route.params.username: ', error)
        username = param.route.params.username
    }
    
    // console.log('entries: ', entries)
    const [entriesShowing, setEntriesShowing] = useState(entries)
    const [displayDaysEntries, setDisplayDaysEntries] = useState(true)
    const [dataPersisted, setDataPersisted] = useState({})
    
    const [rerender, setRerender] = useState(0)
    const [monthDictHook, setMonthDictHook] = useState()

    const dispatch = useDispatch();

    // const importData = async() => {
    //     // AsyncStorage.clear()
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         const data = await AsyncStorage.multiGet(keys)
    //         return data
    //     } catch (error) {
    //         console.log('Error importing data from AsyncStorage: ', error)
    //     }
    // }

    // useEffect(() => {
    //     // const dataPersisted = importData()
    //     console.log('IN useEffect.')
    //     setDataPersisted(importData())
    // }, [])

    // if(dataPersisted._W !== null && dataPersisted._W !== undefined){ 
    //     // console.log('dataPersisted._W: ', dataPersisted._W)
    //     const dataPersistedEntries = []
    //     for(let i = 0; i < dataPersisted._W.length; i++){
    //         // if(dataPersisted._W[i])
    //         // console.log('dataPersisted._W ', i, ': ', dataPersisted._W[i][0].split('/')[1])
    //         if(dataPersisted._W[i][0].split('/')[0] === 'Entries' && dataPersisted._W[i][0].split('/')[1] === username){
    //             dataPersistedEntries.push(JSON.parse(dataPersisted._W[i][1]))
    //             // console.log('Entry: ', JSON.parse(dataPersisted._W[i][1]))
    //             // console.log('ID: ', JSON.parse(dataPersisted._W[i][1].id))
    //             // name: ', JSON.parse(dataPersisted._W[i][1].username))
    //             // console.log('awsPath: ', JSON.parse(dataPersisted._W[i][1].awsPath))
    //             // console.log('type: ', JSON.parse(dataPersisted._W[i][1].type))
    //             // console.log('entry: ', JSON.parse(dataPersisted._W[i][1].entry))
    //             // dispatch(addEntry({
    //             //     id: Date.now(),
    //             //     username: username,
    //             //     awsPath: awsPath,
    //             //     type: 'audio',
    //             //     entry: uri,
    //             // }))
    //         }
    //         // console.log('dataPersistedEntries 1: ', dataPersistedEntries)
    //         function compare(a, b) {
    //             return a.id - b.id;
    //         }
    //         dataPersistedEntries.sort(compare)
    //         // console.log('dataPersistedEntries 2: ', dataPersistedEntries)
            
    //         for(let i = 0; i < dataPersistedEntries.length; i++){
    //             // console.log('data ID ', i, ': ',dataPersistedEntries[i].id)
    //             const user = null, id = null, awsPath = null, type = null, title = null, entry = null
    //             const moodRating = null, joyIntensity = null, joyNote = null, trustIntensity = null, trustNote = null
    //             const fearIntensity = null, fearNote = null, surpriseIntensity = null, surpriseNote = null
    //             const sadnessIntensity = null, sadnessNote = null, disgustIntensity = null, disgustNote = null
    //             const angerIntensity = null, angerNote = null, anticipationIntensity = null, anticipationNote = null

    //             if(dataPersistedEntries[i].username !== undefined){
    //                 // console.log('User: ', dataPersistedEntries[i].username)
    //                 user = dataPersistedEntries[i].username
    //                 // console.log('User: ', user)
    //             }
    //             if(dataPersistedEntries[i].id !== undefined){
    //                 // console.log('ID: ', dataPersistedEntries[i].id)
    //                 id = dataPersistedEntries[i].id
    //                 // console.log('ID: ', id)
    //             }
    //             if(dataPersistedEntries[i].awsPath !== undefined){
    //                 // console.log('Path: ', dataPersistedEntries[i].awsPath)
    //                 awsPath = dataPersistedEntries[i].awsPath
    //                 // console.log('AWSPath: ', awsPath)
    //             }
    //             if(dataPersistedEntries[i].type !== undefined){
    //                 // console.log('Type: ', dataPersistedEntries[i].type)
    //                 type = dataPersistedEntries[i].type
    //                 // console.log('Type: ', type)
    //             }
    //             if(dataPersistedEntries[i].title !== undefined){
    //                 // console.log('Title: ', dataPersistedEntries[i].title)
    //                 title = dataPersistedEntries[i].title
    //             }
    //             if(dataPersistedEntries[i].entry !== undefined){
    //                 // console.log('Entry: ', dataPersistedEntries[i].entry)
    //                 entry = dataPersistedEntries[i].entry
    //             }
    //             if(dataPersistedEntries[i].moodRating !== undefined){
    //                 // console.log('Entry: ', dataPersistedEntries[i].entry)
    //                 moodRating = dataPersistedEntries[i].moodRating
    //             }
    //             if(dataPersistedEntries[i].joy !== undefined){
    //                 // console.log('Joy Intensity: ', dataPersistedEntries[i].joy)
    //                 joyIntensity = dataPersistedEntries[i].joy
    //             }
    //             if(dataPersistedEntries[i].joyNote !== undefined){
    //                 // console.log('Joy Note: ', dataPersistedEntries[i].joyNote)
    //                 joyNote = dataPersistedEntries[i].joyNote
    //             }
    //             if(dataPersistedEntries[i].trust !== undefined){
    //                 // console.log('Trust Intensity: ', dataPersistedEntries[i].trust)
    //                 trustIntensity = dataPersistedEntries[i].trust
    //             }
    //             if(dataPersistedEntries[i].trustNote !== undefined){
    //                 // console.log('Trust Note: ', dataPersistedEntries[i].trustNote)
    //                 trustNote = dataPersistedEntries[i].trustNote
    //             }
    //             if(dataPersistedEntries[i].fear !== undefined){
    //                 // console.log('Fear Intensity: ', dataPersistedEntries[i].fear)
    //                 fearIntensity = dataPersistedEntries[i].fear
    //             }
    //             if(dataPersistedEntries[i].fearNote !== undefined){
    //                 // console.log('Fear Note: ', dataPersistedEntries[i].fearNote)
    //                 fearNote = dataPersistedEntries[i].fearNote
    //             }
    //             if(dataPersistedEntries[i].surprise !== undefined){
    //                 // console.log('Surprise Intensity: ', dataPersistedEntries[i].surprise)
    //                 surpriseIntensity = dataPersistedEntries[i].surprise
    //             }
    //             if(dataPersistedEntries[i].surpriseNote !== undefined){
    //                 // console.log('Surprise  Note: ', dataPersistedEntries[i].surpriseNote)
    //                 surpriseNote = dataPersistedEntries[i].surpriseNote
    //             }
    //             if(dataPersistedEntries[i].sadness !== undefined){
    //                 // console.log('Sadness Intensity: ', dataPersistedEntries[i].sadness)
    //                 sadnessIntensity = dataPersistedEntries[i].sadness
    //             }
    //             if(dataPersistedEntries[i].sadnessNote !== undefined){
    //                 // console.log('Sadness Note: ', dataPersistedEntries[i].sadnessNote)
    //                 sadnessNote = dataPersistedEntries[i].sadnessNote
    //             }
    //             if(dataPersistedEntries[i].disgust !== undefined){
    //                 // console.log('Disgust Intensity: ', dataPersistedEntries[i].disgust)
    //                 disgustIntensity = dataPersistedEntries[i].disgust
    //             }
    //             if(dataPersistedEntries[i].disgustNote !== undefined){
    //                 // console.log('Disgust Note: ', dataPersistedEntries[i].disgustNote)
    //                 disgustNote = dataPersistedEntries[i].disgustNote
    //             }
    //             if(dataPersistedEntries[i].anger !== undefined){
    //                 // console.log('Anger Intensity: ', dataPersistedEntries[i].anger)
    //                 angerIntensity = dataPersistedEntries[i].anger
    //             }
    //             if(dataPersistedEntries[i].angerNote !== undefined){
    //                 // console.log('Anger Note: ', dataPersistedEntries[i].angerNote)
    //                 angerNote = dataPersistedEntries[i].angerNote
    //             }
    //             if(dataPersistedEntries[i].anticipation !== undefined){
    //                 // console.log('Anticipation Intensity: ', dataPersistedEntries[i].anticipation)
    //                 anticipationIntensity = dataPersistedEntries[i].anticipation
    //             }
    //             if(dataPersistedEntries[i].anticipationNote !== undefined){
    //                 // console.log('Anticipation Note: ', dataPersistedEntries[i].anticipationNote)
    //                 anticipationNote = dataPersistedEntries[i].anticipationNote
    //             }
                

    //             const doesEntryExist = (entry) => entry.id === id

    //             // console.log('dataPersistedEntries ID', i, ': ', dataPersistedEntries[i].id)
    //             // console.log('ID: ', id)
                
    //             const dispatchPersistedDataPromise = (
    //                 id, user, awsPath, type, title, entry, moodRating,
    //                 joyIntensity, joyNote, trustIntensity, trustNote,
    //                 fearIntensity, fearNote, surpriseIntensity, surpriseNote,
    //                 sadnessIntensity, sadnessNote, disgustIntensity, disgustNote,
    //                 angerIntensity, angerNote, anticipationIntensity, anticipationNote, dispatch) => new Promise((resolve, reject) => {
    //                 console.log('\nIn dispatchPersistedDataPromise\n')
    //                 dispatch(addEntry({
    //                     id: id,
    //                     user: user,
    //                     awsPath: awsPath,
    //                     type: type,
    //                     title: title,
    //                     entry: entry,
    //                     moodRating: moodRating,
    //                     joy: joyIntensity,
    //                     joyNote: joyNote,
    //                     trust: trustIntensity,
    //                     trustNote: trustNote,
    //                     fear: fearIntensity,
    //                     fearNote: fearNote,
    //                     surprise: surpriseIntensity,
    //                     surpriseNote: surpriseNote,
    //                     sadness: sadnessIntensity,
    //                     sadnessNote: sadnessNote,
    //                     disgust: disgustIntensity,
    //                     disgustNote: disgustNote,
    //                     anger: angerIntensity,
    //                     angerNote: angerNote,
    //                     anticipation: anticipationIntensity,
    //                     anticipationNote: anticipationNote,
    //                 }))
    //                 resolve()
    //             })
                
    //             for(let i = 0; i < entries.length; i++){
    //                 // console.log('Entry ', i, ': ', entries[i].id)
    //                 if(Math.abs(id-entries[i].id) < 1000) {
    //                     console.log("ID's Match:")
    //                     console.log(id)
    //                     console.log(entries[i].id)
    //                 } else {
    //                     const resolved = dispatchPersistedDataPromise(
    //                         id, user, awsPath, type, title, entry, moodRating,
    //                         joyIntensity, joyNote, trustIntensity, trustNote,
    //                         fearIntensity, fearNote, surpriseIntensity, surpriseNote,
    //                         sadnessIntensity, sadnessNote, disgustIntensity, disgustNote,
    //                         angerIntensity, angerNote, anticipationIntensity, anticipationNote, dispatch
    //                     )
    //                     console.log('resolved: ', resolved)
    //                     console.log("ID's DO NOT Match:")
    //                     console.log(id)
    //                     console.log(entries[i].id)
    //                 }
    //             }
                
    //             // console.log('ID: ', id )
    //             // if(entries.some(doesEntryExist) === false){
    //                 // dispatch(addEntry({
    //                 //     id: id,
    //                 //     user: user,
    //                 //     awsPath: awsPath,
    //                 //     type: type,
    //                 //     title: title,
    //                 //     entry: entry,
    //                 //     moodRating: moodRating,
    //                 //     joy: joyIntensity,
    //                 //     joyNote: joyNote,
    //                 //     trust: trustIntensity,
    //                 //     trustNote: trustNote,
    //                 //     fear: fearIntensity,
    //                 //     fearNote: fearNote,
    //                 //     surprise: surpriseIntensity,
    //                 //     surpriseNote: surpriseNote,
    //                 //     sadness: sadnessIntensity,
    //                 //     sadnessNote: sadnessNote,
    //                 //     disgust: disgustIntensity,
    //                 //     disgustNote: disgustNote,
    //                 //     anger: angerIntensity,
    //                 //     angerNote: angerNote,
    //                 //     anticipation: anticipationIntensity,
    //                 //     anticipationNote: anticipationNote,
    //                 // }))
    //             // }
                

    //         }
            
    //     }
    // }
    
    // console.log('dataPersisted._W: ', dataPersisted._W)

    for(let i = 0; i < entries.length; i++) {
        // console.log('Entry ID ', i, ': ', entries[i].id)
        // getDataAsyncStorage(entries[i].id)
        // if(currentDataAsyncStorage === {}){
        //     console.log('\nData was NOT in Async Storage.\n')
        // } else {
        //     // console.log('asyncStorageData: ', currentDataAsyncStorage)
        // }
        monthsWithEntries.add(moment(entries[i].id).format('MMMM YYYY'))
        daysWithEntries.add(moment(entries[i].id).format('ddd DD - MMMM YYYY'))
        if(entries[i].type === 'audio') {
            audioEntryCount++
            audioEntryList.push(entries[i])
        } else if(entries[i].type === 'video') {
            videoEntryCount++
            videoEntryList.push(entries[i])
        } else {
            textEntryCount++
            textEntryList.push(entries[i])
        }
    }

    // const storeDataAsyncStorage = async(key, value) => {
    //     // console.log('In storeDataAsyncStorage: Key: ', key, ' Value: ', value)
    //     try {
    //         const jsonValue = JSON.stringify(value)
    //         await AsyncStorage.setItem(key, jsonValue)
    //     } catch(error) {
    //         console.log('Error saving data to async storage: ', error)
    //     }
    // }

    const checkIfDayInMonth = (month, day, months, daysWithEntries) => {
        
        const days = daysWithEntries.size

        dayCount = dayCount + 1

        if(day.split('- ').pop() === month) {
            if(!(month in entriesDict)){
                entriesDict[month] = {};
            }
            entriesDict[month][day.split(' -')[0]] = []
            for(let i = 0; i < entries.length; i++) {
                if(moment(entries[i].id).format('ddd DD - MMMM YYYY') === day) {
                    entriesDict[month][day.split(' -')[0]].push(entries[i])
                }
            }
        }
    }

    const daysThisMonth = (month, monthsWithEntries) => {
        const months = monthsWithEntries.size
        daysWithEntries.forEach((day) => checkIfDayInMonth(month, day, months, daysWithEntries))
    }

    monthsWithEntries.forEach((month) => daysThisMonth(month, monthsWithEntries))
    
    // const updateEntriesShowing = (list) => {
    //     if(list === 'entries'){
    //         setEntriesShowing(entries)
    //     }
    //     else if(list === 'audioEntryList'){
    //         setEntriesShowing(audioEntryList)
    //     } else if(list === 'videoEntryList'){
    //         setEntriesShowing(videoEntryList)
    //     } else if(list === 'textEntryList'){
    //         setEntriesShowing(textEntryList)
    //     } 
    // }

    const mapDaysToTable = (day, month) => {
        // let displayDaysEntries = true
        // setDisplayDaysEntries(true)
        
        const toggleDisplayDaysEntries = () => {
            if(displayDaysEntries) {
                setDisplayDaysEntries(false)
            } else {
                setDisplayDaysEntries(true)
            }
            
            // console.log('displayDaysEntries: ', displayDaysEntries)
        }

        return(
            <View>

                <View style={styles.entriesScrollViewDayBarContainer}>

                    <TouchableOpacity 
                        style={styles.entriesScrollViewDayStampContainer}
                        onPress={() => toggleDisplayDaysEntries()}
                    >
                        <Text style={styles.entriesScrollViewDayText}>{day.split(' ')[0].toUpperCase()}</Text>
                        <Text style={styles.entriesScrollViewDayText}>{day.split(' ')[1]}</Text>
                    </TouchableOpacity>

                    <View style={styles.entriesScrollViewDayDetailsContainer}>
                        <Text style={styles.entriesScrollViewDayDetailsText}>Entries - {entriesDict[month][day].length}</Text>
                    </View>

                </View>
                { displayDaysEntries ? <View>{entriesDict[month][day].slice(0).reverse().map((entry) => mapEntriesToTable(entry, month, day))}</View> : null}
            </View>
        )
    }

    const mapMonthsToTable = (month) => {
        // console.log(Object.keys(entriesDict[month]))
        return(
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 4, backgroundColor: 'black', marginLeft: 10}} />
                    <View style={styles.entriesScrollViewMonthContainer}> 
                        <Text style={styles.entriesScrollViewMonthText}>{month}</Text>
                    </View>
                    <View style={{flex: 1, height: 4, backgroundColor: 'black', marginRight: 10}} />
                </View>
                {Object.keys(entriesDict[month]).reverse().map((day) => mapDaysToTable(day, month))}
            </View>
        )
    }

    const mapEntriesToTable = (entry, month, day) => {
        // console.log('Entry from mapEntriesToTable: ', entry)
        const navigation = useNavigation();
        let translate = new Animated.Value(0)

        const handlePanGesture = Animated.event([{nativeEvent: {translationX: translate}}], {useNativeDriver: false})
        
        let typeFile = entry.awsPath.split('/').pop().split('/').pop().split(/[0-9]/)[0]
        typeFile = typeFile.charAt(0).toUpperCase() + typeFile.slice(1)
        let file = entry.awsPath.split('/').pop().split('/').pop().split('.')[0] + '.txt'
        const awsClassificationPath = 'Classification/' + username + '/' + typeFile + '/' + file
        // console.log('awsClassificationPath: ', awsClassificationPath)
        const showDeleteEntry = () => {
            console.log('Show delete entry.')
        }

        // const handleEntryItemLongPress = () => {
        //     // alert('')
        //     setTranslateX(80)
        // }

        // const handleEntryItemPress = (id, entry, count) => {
        //     navigation.navigate('TextEntryItemExpanded', {id, entry, count})
        // }
        if(entry.type === 'text'){
            // console.log('Entry.awsPath: ', entry.awsPath)
            return (
                <View style={styles.entryItemContainer}>

                    <View style={styles.entryItemConnectorContainer}>
                        <View style={styles.entryItemConnectorTop}></View>
                        <Feather name="file-text" size={20} color="black" style={{alignSelf: 'center'}}/>
                        <View style={styles.entryItemConnectorBottom}></View>
                    </View>

                    <View style={styles.entryItemItemContainer}>
                        <TextEntryItem user={entry.user} entriesDict={entriesDict} month={month} day={day} key={entry.id} id={entry.id} awsPath={entry.awsPath} awsClassificationPath={awsClassificationPath} title={entry.title} entry={entry.entry} count={textEntryCount}></TextEntryItem>
                    </View>

                </View>
            )
        } else if(entry.type === 'video') {
            // console.log('Entry.awsPath: ', entry.awsPath)
            return (
                <View style={styles.entryItemContainer}>

                    <View style={styles.entryItemConnectorContainer}>
                        <View style={styles.entryItemConnectorTop}></View>
                        <Entypo name="video" size={20} color="black" style={{alignSelf: 'center'}}/>
                        <View style={styles.entryItemConnectorBottom}></View>
                    </View>

                    <View style={styles.entryItemItemContainer}>
                        <VideoEntryItem user={entry.user} key={entry.id} id={entry.id} awsPath={entry.awsPath} awsClassificationPath={awsClassificationPath} title={entry.title} videoLink={entry.entry} count={videoEntryCount} angerFearSlider={entry.angerFearSlider} anticipationSurpriseSlider={entry.anticipationSurpriseSlider} joySadnessSlider={entry.joySadnessSlider} disgustTrustSlider={entry.disgustTrustSlider}></VideoEntryItem>
                </View>
                
                </View>
            )
        } else if(entry.type === 'audio') {
            // console.log('Entry.awsPath: ', entry.awsPath)
            return (
                <View style={styles.entryItemContainer}>

                    <View style={styles.entryItemConnectorContainer}>
                        <View style={styles.entryItemConnectorTop}></View>
                        <MaterialIcons name="multitrack-audio" size={20} color="black" style={{alignSelf: 'center'}}/>
                        <View style={styles.entryItemConnectorBottom}></View>
                    </View>
                    
                    <View style={styles.entryItemItemContainer}>
                        <AudioEntryItem user={entry.user} key={entry.id} id={entry.id} awsPath={entry.awsPath} awsClassificationPath={awsClassificationPath} title={entry.title} audioLink={entry.entry} count={audioEntryCount}></AudioEntryItem>
                    </View>

                </View>
                
            )
        }
    }

    return (

        <View style={styles.EntriesViewContainer}>

            <View style={styles.EntriesViewHeaderContainer}>
                <View style={styles.EntriesViewHeaderTopContainer}>
                    <View style={styles.EntriesViewHeaderTopLeftContainer}>

                        <TouchableOpacity
                            style={styles.profileButton}
                        >
                            <View style={styles.profileButtonBorder}>
                                <MaterialCommunityIcons name="account" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.EntriesViewHeaderTopMiddleContainer}>
                        <TouchableOpacity 
                            style={styles.totalEntriesTrackerBox}
                            onPress={() => updateEntriesShowing('entries')}
                        >
                            <Text style={styles.totalEntriesTrackerCounterText}>Entries - {entries.length}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.EntriesViewHeaderTopRightContainer}>
                        
                        <TouchableOpacity
                            style={styles.EntriesViewSearchButton}
                        >
                            <View style={styles.entriesSearchButtonBorder}>
                                <Ionicons name={ Platform.OS === 'ios' ? "search" : 'md-search'} size={20} color="black" />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.EntriesViewHeaderBottomContainer}>
                    <TouchableOpacity 
                        style={styles.entriesTrackerBox}
                        onPress={() => updateEntriesShowing('audioEntryList')}
                    >
                        <Text style={styles.entriesTrackerCounterText}>Audio</Text>
                        <Text style={styles.entriesTrackerCounterNumber}>{audioEntryCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.entriesTrackerBox}
                        onPress={() => updateEntriesShowing('videoEntryList')}
                    >
                        <Text style={styles.entriesTrackerCounterText}>Video</Text>
                        <Text style={styles.entriesTrackerCounterNumber}>{videoEntryCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.entriesTrackerBox}
                        onPress={() => updateEntriesShowing('textEntryList')}
                    >
                        <Text style={styles.entriesTrackerCounterText}>Text</Text>
                        <Text style={styles.entriesTrackerCounterNumber}>{textEntryCount}</Text>
                    </TouchableOpacity>
                </View>
              
            </View>
            <ScrollView style={styles.entriesScrollViewContainer}>
                <View key={Date.now} style={styles.entriesListContainer}>
                    {Object.keys(entriesDict).map((month) => mapMonthsToTable(month))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    EntriesViewContainer: {
        flex: 1,
        paddingVertical: 20,
    },

    EntriesViewHeaderContainer: {
        marginTop: 10,
        //backgroundColor: 'yellow',

    },

    EntriesViewHeaderTopContainer: {
        //flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },

    EntriesViewHeaderTopLeftContainer: {

    },

    EntriesViewHeaderTopMiddleContainer: {
        justifyContent: 'center',
    },

    EntriesViewHeaderTopRightContainer: {
        flexDirection: 'row',
    },

    EntriesViewHeaderBottomContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'green',
    },

    EntriesViewSearchButton: {
        // paddingRight: 10,
    },

    entriesListContainer: {
        flex: 1,
        flexDirection: 'column',
        //backgroundColor: 'yellow',
    },

    entriesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        //color: 'white'
    },
    entriesSearchButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    entriesSearchButtonBorder: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    entriesAddButtonBorder: {
        height: 40,
        width: 40,
        //borderWidth: 4,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    profileButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    profileButtonBorder: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
    entriesTrackerContainer: {
        //flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'green'
    },

    totalEntriesTrackerBox: {
        // height: 60,
        width: 160,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
    },

    entriesTrackerBox: {
        // height: 60,
        width: 80,
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
    },

    totalEntriesTrackerCounterText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingVertical: 5,
    },

    entriesTrackerCounterText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: 5,
    },
    entriesTrackerCounterNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },

    entriesScrollViewContainer: {
        flex: 1,
        //backgroundColor: 'red'
    },
    entriesScrollViewMonthContainer: {
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // marginBottom: 10,
        marginHorizontal: 10,
    },

    entriesScrollViewMonthText: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    entriesScrollViewDayBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },

    entriesScrollViewDayStampContainer: {
        flex: 0.2,
        borderRadius: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow', 
        marginHorizontal: 5,
        marginVertical: 5,
    },

    entriesScrollViewDayText:{
        fontSize: 14,
        fontWeight: 'bold',
    },

    entriesScrollViewDayDetailsContainer: {
        flex: 0.8,
        height: '100%',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderColor: 'white',
        marginHorizontal: 5,
        marginVertical: 5,

    },

    entriesScrollViewDayDetailsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    entryItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // backgroundColor: 'green',
    },

    entryItemConnectorContainer: {
        flex: 0.2,
        justifyContent: 'center',
        // backgroundColor: 'green', 
        marginHorizontal: 5,
    },
    entryItemConnectorTop: {
        height: '42.5%',
        width: 4,
        backgroundColor: 'black',
        alignSelf: 'center',
    },
    entryItemConnectorBottom: {
        height: '42.5%',
        width: 4,
        backgroundColor: 'black',
        alignSelf: 'center',
        // marginBottom: 5,
    },

    entryItemItemContainer: {
        flex: 0.8,
        // flexDirection: 'row',
        // backgroundColor: 'blue',
    },

})