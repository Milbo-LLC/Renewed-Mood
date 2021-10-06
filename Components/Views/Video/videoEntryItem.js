import React, { useState, useRef } from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Animated, Alert } from 'react-native';
import { Video, Audio, AVPlaybackStatus } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { deleteEntry } from './../../Redux/entrySlice';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'

export default function VideoEntryItem({ user: user, id: id, awsPath: awsPath, awsClassificationPath, title: title, videoLink: videoLink, count, angerFearSlider: angerFearSlider, anticipationSurpriseSlider: anticipationSurpriseSlider, joySadnessSlider: joySadnessSlider, disgustTrustSlider: disgustTrustSlider  }) {
    const video = React.useRef(null);

    const entries = useSelector((state) => state.entry)
    const thisEntry = entries.filter((entry) => entry.id === id)
    const moodRating = thisEntry[0].moodRating

    const [status, setStatus] = React.useState({});
    const [removedAsyncStorage, setRemovedAsyncStorage] = useState(false);

    const dispatch = useDispatch();

    const [scale, setScale] = useState(1)
    const [translateX, setTranslateX] = useState(0)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [flexDirection, setFlexDirection] = useState('column')
    const navigation = useNavigation();

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

    const entryCount = awsPath.split('/')[3].split('.')[0].slice(-1)

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
                    onPress: () => handleDeleteEntry()
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

    const handleDeleteEntry = async() => {
        dispatch(deleteEntry({
            id: id,
        }))
        handleDeleteEntryAsyncStorage(user)
        await Storage.remove(awsPath)
        await Storage.remove(awsClassificationPath)
    }

    const videoEntryItemExpanded = (id, videoLink, entryCount) => {
        if(translateX === 0) {
            navigation.navigate('VideoEntryItemExpanded', {id, videoLink, entryCount})
        }
    }

    const handlePlayButtonPress = async() => {
        console.log('Video play button pressed.')
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
            })
        } catch(error) {
            console.log('Error with Playing Video audio in silent mode: ', error)
        }
        if(!status.isPlaying) {
            video.current.playFromPositionAsync(0)
        }
    }

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

            <Animated.View style={{ flex: 0.8, transform: [{ translateX: 0 }, { scale: scale }] }}>
                
                <TouchableWithoutFeedback 
                    onPressIn={() => handleEntryItemPressIn()}
                    onPress={() => videoEntryItemExpanded(id, videoLink, entryCount)}
                    onLongPress={() => handleEntryItemLongPress()}
                    onPressOut={() => handleEntryItemPressOut()}
                >
                    <View style={[styles.videoEntryItemContainer, {backgroundColor: entryMoodColor}]}>
                        <View style={styles.videoEntryHeaderContainer}>
                            <View style={styles.timeStampContainer}>
                                {/* <Text style={styles.dateStampText}>{Date(id).substring(0,3)}</Text> */}
                                <Text>{moment(id).format('h:mm a').toUpperCase()}</Text>

                            </View>
                            <View style={styles.videoEntryHeaderTextContainer}>
                                <View style={styles.videoEntryHeaderTitleContainer}>
                                    {/* <Text style={styles.videoEntryHeaderText}>{title}</Text> */}
                                    <Text style={styles.videoEntryHeaderText}>{'Video Entry ' + entryCount}</Text>
                                </View>
                                <View style={styles.videoEntryHeaderAuthorContainer}>
                                    {/* <Text style={styles.videoEntryHeaderText}>{author}</Text> */}
                                    {/* <Text style={styles.videoEntryHeaderText}>{angerFearSlider}</Text> */}

                                </View>
                            </View>   
                        </View>
                        <View style={styles.videoEntryVideoContainer}>
                            <Video
                                ref={video}
                                style={styles.videoContainer}
                                source={{uri: videoLink}}
                                resizeMode="cover"
                                onPlaybackStatusUpdate={status => setStatus(() => status)}
                            >
                            </Video>
                            <View style={styles.videoEntryPlayButtonContainer}>
                                { !status.isPlaying ? (
                                    <TouchableOpacity
                                        style={styles.videoPlaybackButton}
                                        onPress={
                                            () => handlePlayButtonPress()
                                        }
                                    >
                                        <Ionicons name={ Platform.OS === 'ios' ? "ios-play" : 'md-play'} size={20} color="white" />
                                    </TouchableOpacity>
                                ) : null

                                }
                                
                            </View>
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

    videoEntryItemContainer: {
        // flex: 0.8,
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'lightgrey',
    },

    videoEntryHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  
        padding: 5, 
    },

    videoEntryHeaderTextContainer: {
        height: '100%',
        justifyContent: 'center',
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

    videoEntryHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },

    dataDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    videoContainer: {
        height: 50,
        width: 50,
        borderRadius: 5,
        position: 'absolute',
    },

    videoPlaybackButton: {
        // flex: 1,
        // backgroundColor: 'blue',
    },

    videoPlaybackButtonText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        padding: 10,
    },

    videoEntryPlayButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        //backgroundColor: 'blue',
    },
    
    videoEntryHeaderTitleContainer: {
        paddingVertical: 2.5,
    },
    
    videoEntryItemTextContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    videoEntryItemText: {
        fontSize: 20,
    },
    
    
    videoEntryVideoContainer: {
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

})