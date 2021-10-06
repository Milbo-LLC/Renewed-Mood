import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Animated, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { deleteEntry } from './../../Redux/entrySlice';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'

export default function AudioEntryItem({ user, id, awsPath, awsClassificationPath, audioLink, count, title }) {

    console.log('Title: ', title)
    const entries = useSelector((state) => state.entry)
    const thisEntry = entries.filter((entry) => entry.id === id)
    const moodRating = thisEntry[0].moodRating
    console.log('Mood Rating: ', moodRating)

    const entryCount = awsPath.split('/')[3].split('.')[0].slice(-1)

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [sound, setSound] = React.useState();
    const [removedAsyncStorage, setRemovedAsyncStorage] = useState(false);
    
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [scale, setScale] = useState(1)
    const [translateX, setTranslateX] = useState(0)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [flexDirection, setFlexDirection] = useState('column')

    const setMoodColor = (moodRating) => {
        if(moodRating === undefined){
            return 'lightgrey'
        } else {
            const value = 1 - moodRating
            //value from 0 to 1
            var hue=((1-value)*120).toString(10);
            return ["hsl(",hue,",100%,75%)"].join("");
        } 
    }
    
    const [entryMoodColor, setEntryMoodColor] = useState(setMoodColor(moodRating))


    const handleEntryItemPressIn = () => {
        setScale(0.95)
    }

    const handleEntryItemPressOut = () => {
        setScale(1)
    }

    const handleEntryItemLongPress = () => {
        // alert('')
        if(translateX === 0) {
            setTranslateX(40)
            setShowDeleteButton(true)
            setFlexDirection('row')
        } else {
            setTranslateX(0)
            setShowDeleteButton(false)
            setFlexDirection('column')
        } 
    }

    const deleteEntryAlert = () => {
        Alert.alert(
            'Are you sure?',
            'Once an entry is deleted, it cannot be undone.',
            [
                {
                    text: 'Confirm',
                    // onPress: () => dispatch(deleteEntry())
                    onPress: () => handleDeleteEntry(user)
                },
                {
                    text: 'Cancel',
                    onPress: () => handleEntryItemLongPress()
                }
            ]
        )
    }

    const handleDeleteEntryAsyncStorage = async(user) => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const entryKeys = []
            for(key in keys) {
                if(/^\d+$/.test(keys[key])) {
                    entryKeys.push(keys[key])
                }
            }
            for(key in entryKeys){
                console.log('entryKeys[key]: ', typeof parseInt(entryKeys[key], 10))
                if(Math.abs(parseInt(entryKeys[key], 10) - id) < 1000) {
                    console.log('Removing entry from AsyncStorage.')
                    try {
                        await AsyncStorage.removeItem(entryKeys[key])
                    } catch (error) {
                        console.log('Error removing entry from AsyncStorage: ', error)
                    }
                    setRemovedAsyncStorage(true)
                    // console.log('User: ', user)
                    // navigation.navigate('EntriesView', { username: user })
                }
            }
            // await AsyncStorage.removeItem()
        } catch(error) {
            console.log('Error deleting entry from AsyncStorage: ', error)
        }
        setRemovedAsyncStorage(false)
        // navigation.replace('EntriesView', {username: user})
    }

    const handleDeleteEntry = async(user) => {
        await dispatch(deleteEntry({
            id: id,
        }))
        
        handleDeleteEntryAsyncStorage(user)
        
        await Storage.remove(awsPath)
        await Storage.remove(awsClassificationPath)
    }

    const audioEntryItemExpanded = (id, audioLink, entryCount) => {
        if(translateX === 0) {
            navigation.navigate('AudioEntryItemExpanded', {id, audioLink, entryCount})
        }
    }

    async function playSound() {
        console.log('\nLoading Sound.\n')
        const { sound } = await Audio.Sound.createAsync(
            {uri: audioLink}
        );
        setSound(sound)
        console.log('Playing Sound.')
        await sound.playAsync()
    }

    React.useEffect(() => {
        return sound
        ? () => {
            console.log('Unloading Sound')
            sound.unloadAsync()
        }: undefined;
    }, [sound])



    return (
        <View style={[styles.entryItemContainer, {flexDirection: flexDirection}]}>
            
            {showDeleteButton ? (
                <View style={styles.entryItemDeleteButtonContainer}>
                    <TouchableOpacity 
                        style={styles.entryItemDeleteButton}
                        onPress={() => deleteEntryAlert()}
                    >
                        <MaterialIcons name="delete-forever" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            ) : null}

            <Animated.View style={{flex: 0.8, transform: [{ translateX: 0 }, { scale: scale }] }}>
                <TouchableWithoutFeedback
                    onPressIn={() => handleEntryItemPressIn()}
                    onPress={() => audioEntryItemExpanded(id, audioLink, entryCount)}
                    onLongPress={() => handleEntryItemLongPress()}
                    onPressOut={() => handleEntryItemPressOut()}
                >
                    <View style={[styles.audioEntryItemContainer, {backgroundColor: entryMoodColor}]}>
                        <View style={styles.audioEntryHeaderContainer}>
                            <View style={styles.timeStampContainer}>
                                <Text>{moment(id).format('h:mm a').toUpperCase()}</Text>
                            </View>
                            <View style={styles.audioEntryHeaderTextContainer}>
                                <View style={styles.audioEntryHeaderTitleContainer}>
                                    <Text style={styles.audioEntryHeaderText}>
                                        { title !== undefined ? {title} : `Audio Entry ${entryCount}` }
                                    </Text>
                                </View>
                            </View>    
                        </View>
                        <View style={styles.audioEntryAudioContainer}>

                            <TouchableOpacity 
                                style={styles.audioEntryPlayButton}
                                onPress={playSound}
                            >
                                <Ionicons name={ Platform.OS === 'ios' ? "ios-play" : 'md-play'} size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({

    entryItemContainer: {
        flex: 1,
    },

    entryItemDeleteButtonContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        // marginLeft: 20,
        // backgroundColor: 'blue',
    },

    entryItemDeleteButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        // marginBottom: 5,
        // marginHorizontal: 5,
        backgroundColor: 'red',
        borderRadius: 10,

    },

    audioEntryItemContainer: {
        // flex: 0.8,
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'lightgrey',
    },
    audioEntryHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  
        padding: 5,  
    },

    audioEntryHeaderTextContainer: {
        height: '100%',
        justifyContent: 'center',
    },
    audioEntryHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    timeStampContainer: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timeStampText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    audioEntryAudioContainer: {
        height: 50,
        width: 50,
        borderWidth: 2,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        marginHorizontal: 5,
        marginBottom: 5,
    },
  });