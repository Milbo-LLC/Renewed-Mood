import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, Vibration, TouchableWithoutFeedback, Alert} from 'react-native';
import { Audio } from 'expo-av';

import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from './../../Redux/entrySlice';

import { FontAwesome } from '@expo/vector-icons';
import MediaEntryHeader from '../MediaEntryHeader';

import * as Animatable from 'react-native-animatable';

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Import libraries for AWS Storage
import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'
import config from './../../../aws-exports';
Amplify.configure(config)

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import AsyncStorageSave from '../../AsyncStorage/AsyncStorageSave';
import AsyncStorageGet from '../../AsyncStorage/AsyncStorageGet';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AudioEntryView({changeMedia, media, username}) {

    const navigation = useNavigation();

    const [recording, setRecording] = useState();
    const [recordButtonInsideScale, setRecordButtonInsideScale] = useState(1)
    const [recordButtonInsideBorderRadius, setRecordButtonInsideBorderRadius] = useState(100)
    // const [uri, setUri] = React.useState();
    const [audioLink, setAudioLink] = useState();

    const [audioUploadCounter, setAudioUploadCounter] = useState(0)

    const [timer, setTimer] = useState(0);
//   const [sound, setSound] = React.useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const Player = useRef(new Audio.Sound());

    const [titleText, setTitleText] = useState('')
    const [authorText, setAuthorText] = useState('')

    // const [entryData, setEntryData] = useState({
    //     'id': undefined, 
    //     'username': undefined, 
    //     'awsPath': undefined, 
    //     'type': undefined, 
    //     'entry': undefined,
    //     'moodRating': undefined,
    //     'joyIntensity': undefined,
    //     'joyNote': undefined,
    //     'trustIntensity': undefined,
    //     'trustNote': undefined,
    //     'fearIntensity': undefined,
    //     'fearNote': undefined,
    //     'surpriseIntensity': undefined,
    //     'surpriseNote': undefined,
    //     'sadnessIntensity': undefined,
    //     'sadnessNote': undefined,
    //     'disgustIntensity': undefined,
    //     'disgustNote': undefined,
    //     'angerIntensity': undefined,
    //     'angerNote': undefined,
    //     'anticipationIntensity': undefined,
    //     'anticipationNote': undefined,
    // })

    let entryData = {
        'id': undefined, 
        'username': undefined, 
        'awsPath': undefined, 
        'type': undefined, 
        'entry': undefined,
        'moodRating': undefined,
        'joyIntensity': undefined,
        'joyNote': undefined,
        'trustIntensity': undefined,
        'trustNote': undefined,
        'fearIntensity': undefined,
        'fearNote': undefined,
        'surpriseIntensity': undefined,
        'surpriseNote': undefined,
        'sadnessIntensity': undefined,
        'sadnessNote': undefined,
        'disgustIntensity': undefined,
        'disgustNote': undefined,
        'angerIntensity': undefined,
        'angerNote': undefined,
        'anticipationIntensity': undefined,
        'anticipationNote': undefined,
    }
    
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition()


    const dispatch = useDispatch();
    const entries = useSelector((state) => state.entries);

    const saveAudioEntry = (uri, awsPath) => {
        entryData['id'] = Date.now(),
        entryData['username'] = username, 
        entryData['awsPath'] = awsPath, 
        entryData['type'] = 'audio', 
        entryData['entry'] = uri,

        // AsyncStorage.clear()
        AsyncStorageSave(entryData, entryData['id'].toString())
        AsyncStorageGet()
        // console.log('Entry Data in Audio Entry View: ', entryDataInAsyncStorage)

        // console.log('\n\nUSERNAME from audioEntryView: ', username)
        dispatch(addEntry({
            id: Date.now(),
            user: username,
            awsPath: awsPath,
            type: 'audio',
            entry: uri,
        }))
    }

    const classifyAudio = (uri, path) => {
        console.log('URI: ', uri)
        navigation.navigate('MoodClassificationView', {type: 'audio', username: username, title: titleText, entry: uri, path})
    }

    async function startRecording() {
        // Vibration.vibrate(10)
        setRecordButtonInsideScale(0.5)
        setRecordButtonInsideBorderRadius(10)
        SpeechRecognition.startListening
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
        }); 
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
        console.log('Recording started');
        
    } catch (err) {
        console.error('Failed to start recording', err);
    }
  }

    async function dataURI2Blob(path){

        const response = await fetch( path );
        const blob = await response.blob();
        // console.log( "TYPE", typeof(blob) )
        // console.log(  "SIZE", blob.size )
        return blob;
    }

    async function stopRecording() {
        // Vibration.vibrate(10)
        setRecordButtonInsideScale(1)
        setRecordButtonInsideBorderRadius(100)
        SpeechRecognition.stopListening
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioLink(uri)

        Alert.alert(
            "Would you like to classify this video entry?",
            "",
            [
                {
                    text: 'Classify',
                    onPress: () => classifyAudio(recording.getURI(), 'Entries/' + username + '/Audio/audio' + audioUploadCounter.toString() + '.mp3'),

                },
                {
                    text: 'Cancel',
                    onPress: () => saveAudioEntry(recording.getURI(), 'Entries/' + username + '/Audio/audio' + audioUploadCounter.toString() + '.mp3'),
                    style: 'cancel',
                },
                
            ]
        )
        console.log('HERE after alert')
        console.log('\n\nUsername: ', username, '\n\n')

        const path = 'Entries/' + username + '/Audio/audio' + audioUploadCounter.toString() + '.mp3'
        console.log(path)
        const audioDataBlob = await dataURI2Blob( uri )
        const result = await Storage.put(path, audioDataBlob, {
            contentType: 'audio/mp3'
        });

        setAudioUploadCounter(audioUploadCounter + 1)
        console.log('GET PATH: Entries/' + username + '/Audio/')
        console.log(await Storage.get(path, { download: true }))
    }


    return (
        
            <View style={styles.audioEntryContainer}> 
                <View style={styles.AudioEntryHeaderContainer}>
                    <MediaEntryHeader 
                        changeMedia={changeMedia} 
                        media={media} 
                        audioButtonColor={'red'}
                        videoButtonColor={'lightgrey'}
                        textButtonColor={'lightgrey'}
                    >
                    </MediaEntryHeader>
                </View>
                <View style={styles.AudioEntryTranscriptContainer}>
                    <Text>{transcript}</Text>
                </View>
                <View style={styles.AudioEntryFooterContainer}>
                    <View style={styles.audioRecordButtonContainer}>
                        <TouchableWithoutFeedback
                            onPress={recording ? stopRecording: startRecording}
                        >
                            {/* <Text>{recording ? 'Stop' : 'Record'}</Text> */}
                            <View style={styles.audioRecordButton}>
                                <Animatable.View style={[styles.audioRecordButtonInside, {
                                    transform: [{scale: recordButtonInsideScale}], 
                                    borderRadius: recordButtonInsideBorderRadius,
                                }]}>
                                </Animatable.View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
    )

}

const styles = StyleSheet.create({
    audioEntryContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // paddingVertical: 10,
        
    },

    AudioEntryHeaderContainer: {
        flex: 0.2,
        paddingVertical: 10,
        marginTop: 30,
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },

    AudioEntryTranscriptContainer: {
        // backgroundColor: 'green',
    },

    AudioEntryFooterContainer: {
        flex: 1,
    },

    audioRecordButtonContainer: {
        flex: 1,
        flexDirection:'column-reverse',
        paddingBottom: 20,
        // backgroundColor: 'blue',
        
    },
    audioRecordButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderColor: 'black',
        borderWidth: 7,
        borderRadius: 100,
        alignSelf: 'center',
    },
    
    audioRecordButtonInside: {
        width: 67,
        height: 67,
        backgroundColor: "red",

    },

    audioEntryHeaderMediaNavContainer: {
        alignItems: 'flex-start',
        //paddingHorizontal: 10,
    },

    audioEntryHeaderInputsContainer: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    // audioEntryBorderContainer:{
    //     flex: 1,
    //     // borderRadius: 10,
    //     // borderWidth: 4,
    //     margin: 10,
    // },
    audioEntryTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    titleTextInputContainer: {
        flex: 0.5,
        //height: 70,
        //paddingVertical: 5,
        //paddingRight: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
    },

    textInput: {
        //textAlign: 'left',
        flex: 1,
        //backgroundColor: 'lightgrey',
        //padding: 10,
        fontSize: 20,
        borderRadius: 10,
        textAlignVertical: 'top',

    },
    titleTextInput: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    authorTextInput: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        borderRadius: 10,
    },
    MediaButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    MediaButtonBorder: {
        height: 40,
        width: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey'
    },
})