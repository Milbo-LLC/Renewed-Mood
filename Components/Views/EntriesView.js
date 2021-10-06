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

export default function EntriesView( params ) {

    console.log('params in EntriesView: ', params)

    let entriesDict = {}
    const entries = useSelector((state) => state.entry);
    const audioEntryCount = entries.reduce((numberOfAudioEntries, entry) => ((entry.type === 'audio') ? numberOfAudioEntries+1 : numberOfAudioEntries), 0)
    const videoEntryCount = entries.reduce((numberOfVideoEntries, entry) => ((entry.type === 'video') ? numberOfVideoEntries+1 : numberOfVideoEntries), 0)
    const textEntryCount = entries.reduce((numberOfTextEntries, entry) => ((entry.type === 'text') ? numberOfTextEntries+1 : numberOfTextEntries), 0)
    // let audioEntryCount = numberOfAudioEntries, videoEntryCount = numberOfVideoEntries, textEntryCount = numberOfTextEntries
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
    
    console.log('Number of Audio Entries: ', audioEntryCount)
    console.log('Number of Video Entries: ', videoEntryCount)
    console.log('Number of Text Entries: ', textEntryCount)
    // console.log('Number of Text Entries: ', numberOfTextEntries)
    // console.log('\n\nEntries from top of EntriesView: ', entries, '\n\n')
    // console.log('\n\n', param.route.params.username, '\n\n')
    // let username = undefined

    let username = ''
    try {
        username = params.username.route.params.username
        // setDisplayAudioEntries(true)
        // setDisplayVideoEntries(true)
        // setDisplayTextEntries(true)
    } catch(error) {
        console.log('Error is param.param.route.params.username: ', error)
        // username = param.route.params.username
        username = ''
    }
    
    // console.log('entries: ', entries)
    const [entriesShowing, setEntriesShowing] = useState(entries)
    const [displayDaysEntries, setDisplayDaysEntries] = useState(true)
    const [daysNotToDisplay, setDaysNotToDisplay] = useState([])
    
    const [displayAudioEntries, setDisplayAudioEntries] = useState(true)
    const [displayVideoEntries, setDisplayVideoEntries] = useState(true)
    const [displayTextEntries, setDisplayTextEntries] = useState(true)

    const [dataPersisted, setDataPersisted] = useState({})
    
    const [rerender, setRerender] = useState(0)
    const [monthDictHook, setMonthDictHook] = useState()

    const dispatch = useDispatch();
    const navigation = useNavigation();

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
            // audioEntryCount++
            audioEntryList.push(entries[i])
        } else if(entries[i].type === 'video') {
            // videoEntryCount++
            videoEntryList.push(entries[i])
        } else {
            // textEntryCount++
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
    
    const updateEntriesShowing = (list) => {
        setDaysNotToDisplay([])
        if(list === 'entries') {
            setDisplayAudioEntries(true)
            setDisplayVideoEntries(true)
            setDisplayTextEntries(true)
        } else if(list === 'audioEntryList') {
            setDisplayAudioEntries(true)
            setDisplayVideoEntries(false)
            setDisplayTextEntries(false)
        } else if(list === 'videoEntryList') {
            setDisplayAudioEntries(false)
            setDisplayVideoEntries(true)
            setDisplayTextEntries(false)
        } else if(list === 'textEntryList') {
            setDisplayAudioEntries(false)
            setDisplayVideoEntries(false)
            setDisplayTextEntries(true)
        }
    }

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
        
        const updateDaysNotToDisplay = (day, month) => {
            const dayMonth = day.concat(` ${month}`)
            if(daysNotToDisplay.findIndex(item => item === dayMonth)) {
                setDaysNotToDisplay(daysNotToDisplay => [...daysNotToDisplay, dayMonth])
            } else {
                setDaysNotToDisplay(daysNotToDisplay.filter(item => item !== dayMonth))
            }
        }

        // const toggleDisplayDaysEntries = () => {
        //     if(displayDaysEntries) {
        //         setDisplayDaysEntries(false)
        //     } else {
        //         setDisplayDaysEntries(true)
        //     }
        //     console.log('displayDaysEntries: ', displayDaysEntries)
        // }

        return(
            <View>

                <View style={styles.entriesScrollViewDayBarContainer}>

                    <TouchableOpacity 
                        style={styles.entriesScrollViewDayStampContainer}
                        onPress={() => updateDaysNotToDisplay(day, month)}
                    >
                        <Text style={styles.entriesScrollViewDayText}>{day.split(' ')[0].toUpperCase()}</Text>
                        <Text style={styles.entriesScrollViewDayText}>{day.split(' ')[1]}</Text>
                    </TouchableOpacity>

                    <View style={styles.entriesScrollViewDayDetailsContainer}>
                        <Text style={styles.entriesScrollViewDayDetailsText}>Entries - {entriesDict[month][day].length}</Text>
                    </View>

                </View>
                {/* { displayDaysEntries ? <View>{entriesDict[month][day].slice(0).reverse().map((entry) => mapEntriesToTable(entry, month, day))}</View> : null} */}
                { !daysNotToDisplay.includes(day.concat(` ${month}`)) ? <View>{entriesDict[month][day].slice(0).reverse().map((entry) => mapEntriesToTable(entry, month, day))}</View> : null }
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
        console.log('Entry from mapEntriesToTable: ', entry)
        // const navigation = useNavigation();
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
        if(entry.type === 'text' && displayTextEntries){
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
        } else if(entry.type === 'video' && displayVideoEntries) {
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
        } else if(entry.type === 'audio' && displayAudioEntries) {
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
                            onPress={() => navigation.navigate("ProfileView")}
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