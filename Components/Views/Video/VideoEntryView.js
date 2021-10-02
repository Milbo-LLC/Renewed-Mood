import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Platform, Alert, TextInput, Animated, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import * as Animatable from 'react-native-animatable';

// import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import ProgressCircle from 'rn-animated-progress-circle';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../../Redux/entrySlice';

// import { addClassifiers } from './../../redux/classifierSlice';
// import MoodClassifier from './moodClassifier';
import { render } from 'react-dom';

// Import libraries for AWS Storage
import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'
import config from './../../../aws-exports';
Amplify.configure(config)

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import Slider from 'react-native-slider';

import MainView from '../MainView';

import MediaEntryHeader from '../MediaEntryHeader';

import AsyncStorageSave from '../../AsyncStorage/AsyncStorageSave';
import AsyncStorageGet from '../../AsyncStorage/AsyncStorageGet';

export default function VideoEntryView({changeMedia, media, username}) {
    
    const navigation = useNavigation();
    
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.front)
    const [recording, setRecording] = useState(false)
    const [cameraRef, setCameraRef] = useState(false)
    const [videoLink, setVideoLink] = useState('')
    const [videoUploadCounter, setVideoUploadCounter] = useState(0)
    const [titleText, setTitleText] = useState('')
    const [authorText, setAuthorText] = useState('')
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [counterHidden, setCounterHidden] = React.useState(true)
    const [classificationScreenEnabled, setClassificationScreenEnabled] = React.useState(false)
    const dispatch = useDispatch();
    const entries = useSelector((state) => state.entries);
    const classifier = useSelector((state) => state.classifier);
    const [classifierPage, setClassifierPage] = useState(0)

    const [recordButtonInsideScale, setRecordButtonInsideScale] = useState(1)
    const [recordButtonInsideBorderRadius, setRecordButtonInsideBorderRadius] = useState(100)

    // const [joyIntensity, setJoyIntensity] = useState(0)
    // const [trustIntensity, setTrustIntensity] = useState(0)
    // const [fearIntensity, setFearIntensity] = useState(0)
    // const [surpriseIntensity, setSurpriseIntensity] = useState(0)
    // const [sadnessIntensity, setSadnessIntensity] = useState(0)
    // const [disgustIntensity, setDisgustIntensity] = useState(0)
    // const [angerIntensity, setAngerIntensity] = useState(0)
    // const [anticipationIntensity, setAnticipationIntensity] = useState(0)

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

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    const saveVideo = (videoURI, awsPath) => {
        setVideoLink(videoURI.toString())
        // console.log('AWS PATH: ', awsPath)
        entryData['id'] = Date.now(),
        entryData['username'] = username, 
        entryData['awsPath'] = awsPath, 
        entryData['type'] = 'video', 
        entryData['entry'] = videoURI,
        AsyncStorageSave(entryData, entryData['id'].toString(), 'Video')
        dispatch(addEntry({
            id: Date.now(),
            username: username,
            awsPath: awsPath,
            type: 'video',
            title: titleText,
            entry: videoURI.toString(),
            // angerFearSlider: 0,
            // anticipationSurpriseSlider: 0,
            // joySadnessSlider: 0,
            // disgustTrustSlider: 0,
        }))
    }

    async function dataURI2Blob(path){

        const response = await fetch( path );
        const blob = await response.blob();
        // console.log( "TYPE", typeof(blob) )
        // console.log(  "SIZE", blob.size )
        return blob;
    }

    // const saveVideoClassification = (videoURI) => {
    //     setVideoLink(videoURI.toString())
    //     dispatch(addEntry({
    //         id: Date.now(),
    //         type: 'video',
    //         title: titleText,
    //         author: authorText,
    //         entry: videoURI.toString(),
    //         angerFearSlider: slider1Value,
    //         anticipationSurpriseSlider: slider2Value,
    //         joySadnessSlider: slider3Value,
    //         disgustTrustSlider: slider4Value,
    //     }))
    // }

    const classifyVideo = (videoURI, path) => {
        console.log('\n\nvideoURI: ', videoURI)
        // setClassifierPage(1)
        // setClassificationScreenEnabled(true)
        // setVideoLink(videoURI.toString())
        navigation.navigate('MoodClassificationView', {type: 'video', username: username, title: titleText, entry: videoURI, path})
        // navigation.navigate('MoodClassificationView', 'video', titleText, videoURI)
    }
    
    const handleCameraRecordButtonPress = async() => {
        if(!recording) {
            setRecordButtonInsideScale(0.5)
            setRecordButtonInsideBorderRadius(10)
            setRecording(true)
            setIsPlaying(true)
            let video = await cameraRef.recordAsync() //await setVideoLink(video.uri)
            if(video.uri !== '') {
                setVideoLink(video.uri)
                Alert.alert(
                    "Would you like to classify this video entry?",
                    "",
                    [
                        {
                            text: 'Classify',
                            onPress: (videoURI) => classifyVideo(video.uri, 'Entries/' + username + '/Video/video' + videoUploadCounter.toString() + '.mp4'),

                        },
                        {
                            text: 'Cancel',
                            onPress: (videoURI) => saveVideo(video.uri, 'Entries/' + username + '/Video/video' + videoUploadCounter.toString() + '.mp4'),
                            style: 'cancel',
                        },
                        
                    ]
                )
                path = 'Entries/' + username + '/Video/video' + videoUploadCounter.toString() + '.mp4'
                videoDataBlob = await dataURI2Blob( video.uri )
                result = await Storage.put(path, videoDataBlob, {
                    contentType: 'video/mp4'
                })
                setVideoUploadCounter(videoUploadCounter + 1)
            }
            
        }
        else {
            setRecordButtonInsideScale(1)
            setRecordButtonInsideBorderRadius(100)
            setRecording(false)
            setIsPlaying(false)
            cameraRef.stopRecording()
        }
    }

    const handleClassificationEnterPress = () => {
        if(classifierPage === 1) {
            classifyVideo
        } else {
            dispatch(addEntry({
                id: Date.now(),
                type: 'video',
                title: titleText,
                entry: videoLink,
                angerFearSlider: slider1Value,
                anticipationSurpriseSlider: slider2Value,
                joySadnessSlider: slider3Value,
                disgustTrustSlider: slider4Value,

            }))
            setClassificationScreenEnabled(false)
        }
    }

    const handleAudioEntryButtonPress = () => {
        console.log('Pressed Audio Entry Button.')
        // navigation.navigate('AudioEntryView')
        MainView.setMedia('Audio')

    }

    return (

        <View style={styles.VideoEntryViewContainer}>
            <Camera style={styles.cameraContainer} type={type} ref={ref => {
                setCameraRef(ref)
            }}>

                <View style={styles.VideoEntryHeaderContainer}>
                    <MediaEntryHeader 
                        changeMedia={changeMedia} 
                        media={media} 
                        audioButtonColor={'lightgrey'}
                        videoButtonColor={'red'}
                        textButtonColor={'lightgrey'}
                    >
                    </MediaEntryHeader>
                </View>
                <View style={styles.VideoEntryFooterContainer}>

                    <View style={styles.cameraFlipButtonContainer}>
                        <TouchableOpacity
                            style={styles.cameraFlipButton}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                )
                            }}
                        >
                            <Ionicons name={ Platform.OS === 'ios' ? "ios-camera-reverse" : 'md-camera-reverse'} size={40} color="white" />
                            {/* <Text style={styles.text}> Flip </Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.CountdownCircleTimerContainer}>
                        <ProgressCircle
                            value={0}
                            size={110}
                            thickness={10}
                            color='red'
                        >
                            {


                            <View style={styles.videoRecordButtonContainer}>
                                <TouchableWithoutFeedback
                                    onPress={() => handleCameraRecordButtonPress()}
                                >
                                    {/* <Text>{recording ? 'Stop' : 'Record'}</Text> */}
                                    <View style={styles.videoRecordButton}>
                                        <Animatable.View style={[styles.videoRecordButtonInside, {
                                            transform: [{scale: recordButtonInsideScale}], 
                                            borderRadius: recordButtonInsideBorderRadius,
                                        }]}>
                                        </Animatable.View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                                // <View style={styles.cameraRecordButtonContainer}>
                                //     <TouchableOpacity
                                //         style={styles.cameraRecordButton}
                                //         onPress={
                                //             () => handleCameraRecordButtonPress()
                                //         }
                                //     >
                                //         <Text>{recording ? 'Stop' : 'Record'}</Text>
                                //     </TouchableOpacity>
                                // </View>
                            
                            }
                        </ProgressCircle>
                    </View>
                </View>
            </Camera>
        </View>                
    )
} 

const styles = StyleSheet.create({
    VideoEntryViewContainer: {
        flex: 1,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    VideoEntryHeaderContainer: {
        flex: 0.2,
        paddingVertical: 10,
        marginTop: 30,
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },

    VideoEntryFooterContainer: {
        flex: 1,
    },

    cameraContainer: {
        flex: 1,
        borderRadius: 20,
        //borderWidth: 2,
        overflow: 'hidden',
    },
    cameraFlipButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        padding: 10,
    },
    cameraFlipButton: {

    },
    cameraFlipIcon: {
        
    },
    videoRecordButtonContainer: {
        flex: 1,
        // backgroundColor: 'blue',
        flexDirection:'column-reverse',
        paddingBottom: 10,
        
    },

    videoRecordButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderColor: 'black',
        borderWidth: 7,
        borderRadius: 100,
        alignSelf: 'center',
    },
    
    videoRecordButtonInside: {
        width: 67,
        height: 67,
        backgroundColor: "red",

    },
    // cameraRecordButton: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 80,
    //     height: 80,
    //     borderColor: 'white',
    //     borderWidth: 7,
    //     borderRadius: 100,
    // },
    titleTextInputContainer: {
        flex: 0.5,
        //height: 70,
        paddingVertical: 5,
        //paddingRight: 10,
        margin: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
    },
    // authorTextInputContainer: {
    //     //flex: 1,
    //     height: 50,
    //     paddingVertical: 5,
    //     paddingRight: 10,
    //     margin: 10,
    //     backgroundColor: 'lightgrey',
    //     borderRadius: 10,
    // },
    textInput: {
        //textAlign: 'left',
        flex: 1,
        //backgroundColor: 'lightgrey',
        //padding: 10,
        fontSize: 20,
        borderRadius: 10,
    },
    titleTextInput: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        borderRadius: 10,
        //borderColor: 'white',
    },
    authorTextInput: {
        flex: 1,
        padding: 10,
        fontSize: 15,
        borderRadius: 10,
        //borderColor: 'white',
    },

    CountdownCircleTimerContainer: {
        flex: 0.25,
        //backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // CountdownCircleTimer: {
    //     flex: 1,
    //     backgroundColor: 'blue',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    classificationScreenEnabledContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    MoodClassifier: {
        flex: 1,
        backgroundColor: 'yellow',
        //justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        flex: 0.15,
        //flexDirection: 'row',
        // backgroundColor: 'green',
    },
    sliderTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sliderText:{
        fontSize: 20,
        fontWeight: 'bold',
    },
    
    slidersContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    MediaButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
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