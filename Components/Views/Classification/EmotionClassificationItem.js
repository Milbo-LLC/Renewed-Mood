import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform, ScrollView, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from '../../Redux/entrySlice';

// Import libraries for AWS Storage
import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'
import config from './../../../aws-exports';
Amplify.configure(config)

import Slider from '@react-native-community/slider'

import { Ionicons } from '@expo/vector-icons';

import AsyncStorageSave from './../../AsyncStorage/AsyncStorageSave';

export default function EmotionClassificationItem({ emotions, type, username, title, entry, path, moodRating}) {
    
    // console.log('entry: ', entry)
    const entryCount = path.split('/').pop().split('/').pop().split('.')[0] + '.txt'
    const classificationDict = {}
    // console.log(entryCount)

    const navigation = useNavigation();

    let intensityWord = ''
    let noteQuestion = ''

    const [currentEmotion, setCurrentEmotion] = useState(0)
    const [emotionNote, setEmotionNote] = useState('')
    
    const [joyIntensity, setJoyIntensity] = useState(0)
    const [joyNote, setJoyNote] = useState('')

    const [trustIntensity, setTrustIntensity] = useState(0)
    const [trustNote, setTrustNote] = useState('')

    const [fearIntensity, setFearIntensity] = useState(0)
    const [fearNote, setFearNote] = useState('')

    const [surpriseIntensity,  setSurpriseIntensity] = useState(0)
    const [surpriseNote, setSurpriseNote] = useState('')

    const [sadnessIntensity, setSadnessIntensity] = useState(0)
    const [sadnessNote, setSadnessNote] = useState('')

    const [disgustIntensity, setDisgustIntensity] = useState(0)
    const [disgustNote, setDisgustNote] = useState('')

    const [angerIntensity, setAngerIntensity] = useState(0)
    const [angerNote, setAngerNote] = useState('')

    const [anticipationIntensity, setAnticipationIntensity] = useState(0)
    const [anticipationNote, setAnticipationNote] = useState('')

    const dispatch = useDispatch();

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

    // console.log(emotions[currentEmotion])

    const handleBackButton = () => {
        navigation.goBack()
    }

    const updateSliderValue = (value, emotion) => {
        if(emotions[currentEmotion] === 'Joy') {
            setJoyIntensity(value)
            console.log('joyIntensity: ', joyIntensity)
        } else if(emotions[currentEmotion] === 'Trust') {
            setTrustIntensity(value)
            console.log('trustIntensity: ', trustIntensity)
        } else if(emotions[currentEmotion] === 'Fear') {
            setFearIntensity(value)
            console.log('fearIntensity: ', fearIntensity)
        } else if(emotions[currentEmotion] === 'Surprise') {
            setSurpriseIntensity(value)
            console.log('surpriseIntensity: ', surpriseIntensity)
        } else if(emotions[currentEmotion] === 'Sadness') {
            setSadnessIntensity(value)
            console.log('sadnessIntensity: ', sadnessIntensity)
        } else if(emotions[currentEmotion] === 'Disgust') {
            setDisgustIntensity(value)
            console.log('disgustIntensity: ', disgustIntensity)
        } else if(emotions[currentEmotion] === 'Anger') {
            setAngerIntensity(value)
            console.log('disgustIntensity: ', disgustIntensity)
        } else if(emotions[currentEmotion] === 'Anticipation') {
            setAnticipationIntensity(value)
            console.log('anticipationIntensity: ', anticipationIntensity)
        }
    }

    const updateInputText = (text, emotion) => {
        setEmotionNote(text)
        if(emotions[currentEmotion] === 'Joy') {
            setJoyNote(text)
            console.log('JoyNote: ', joyNote)
        } else if(emotions[currentEmotion] === 'Trust') {
            setTrustNote(text)
            console.log('trustNote: ', trustNote)
        } else if(emotions[currentEmotion] === 'Fear') {
            setFearNote(text)
            console.log('fearNote: ', fearNote)
        } else if(emotions[currentEmotion] === 'Surprise') {
            setSurpriseNote(text)
            console.log('surpriseNote: ', surpriseNote)
        } else if(emotions[currentEmotion] === 'Sadness') {
            setSadnessNote(text)
            console.log('sadnessNote: ', sadnessNote)
        } else if(emotions[currentEmotion] === 'Disgust') {
            setDisgustNote(text)
            console.log('disgustNote: ', disgustNote)
        } else if(emotions[currentEmotion] === 'Anger') {
            setAngerNote(text)
            console.log('disgustNote: ', disgustNote)
        } else if(emotions[currentEmotion] === 'Anticipation') {
            setAnticipationNote(text)
            console.log('anticipationNote: ', anticipationNote)
        }
    }

    const reduxSave = () => {

        console.log('IN REDUXSAVE')
        entryData['id'] = Date.now()
        entryData['username'] = username
        entryData['awsPath'] = path 
        entryData['type'] = type
        entryData['entry'] = entry
        entryData['moodRating'] = moodRating
        entryData['joy'] = joyIntensity
        entryData['joyNote'] = joyNote
        entryData['trust'] = trustIntensity
        entryData['trustNote'] = trustNote
        entryData['fear'] = fearIntensity
        entryData['fearNote'] = fearNote
        entryData['surprise'] = surpriseIntensity
        entryData['surpriseNote'] = surpriseNote
        entryData['sadness'] = sadnessIntensity
        entryData['sadnessNote'] = sadnessNote
        entryData['disgust'] = disgustIntensity
        entryData['disgustNote'] = disgustNote
        entryData['anger'] = angerIntensity
        entryData['angerNote'] = angerNote
        entryData['anticipation'] = anticipationIntensity
        entryData['anticipationNote'] = anticipationNote

        AsyncStorageSave(entryData, path, type)

        dispatch(addEntry({
            id: Date.now(),
            username: username,
            awsPath: path,
            type: type,
            title: title,
            entry: entry,
            moodRating: moodRating,
            joy: joyIntensity,
            joyNote: joyNote,
            trust: trustIntensity,
            trustNote: trustNote,
            fear: fearIntensity,
            fearNote: fearNote,
            surprise: surpriseIntensity,
            surpriseNote: surpriseNote,
            sadness: sadnessIntensity,
            sadnessNote: sadnessNote,
            disgust: disgustIntensity,
            disgustNote: disgustNote,
            anger: angerIntensity,
            angerNote: angerNote,
            anticipation: anticipationIntensity,
            anticipationNote: anticipationNote,
        }))
    }

    const awsSaveEntry = async(path, moodRating, joyIntensity, trustIntensity, fearIntensity, surpriseIntensity, sadnessIntensity, disgustIntensity, angerIntensity, anticipationIntensity, joyNote, trustNote, fearNote, surpriseNote, sadnessNote, disgustNote, angerNote, anticipationNote) => {
        console.log('In saveEntry')
        // console.log('PATH: ', path)
        // console.log('moodRating: ', moodRating)
        // console.log('joyIntensity: ', joyIntensity)
        // console.log('trustIntensity: ', trustIntensity)
        // console.log('fearIntensity: ', fearIntensity)
        const typeFolder = entryCount.charAt(0).toUpperCase() + entryCount.split(/[0-9]/)[0].slice(1)
        const classificationPath = 'Classification/' + username + '/' + typeFolder + '/' + entryCount
        console.log('Classification Path: ', classificationPath)

        reduxSave()
        console.log('HERE\n\n\n')
        console.log('Classification Dict', classificationDict)        

        classificationDict['Path to Entry'] = path
        classificationDict['Mood Rating'] = moodRating
        classificationDict['Joy Intensity'] = joyIntensity
        classificationDict['Trust Intensity'] = trustIntensity
        classificationDict['Fear Intensity'] = fearIntensity
        classificationDict['Surprise Intensity'] = surpriseIntensity
        classificationDict['Sadness Intensity'] = sadnessIntensity
        classificationDict['Disgust Intensity'] = disgustIntensity
        classificationDict['Anger Intensity'] = angerIntensity
        classificationDict['Anticipation Intensity'] = anticipationIntensity
        classificationDict['Joy Note'] = joyNote
        classificationDict['Trust Note'] = trustNote
        classificationDict['Fear Note'] = fearNote
        classificationDict['Surprise Note'] = surpriseNote
        classificationDict['Sadness Note'] = sadnessNote
        classificationDict['Disgust Note'] = disgustNote
        classificationDict['Anger Note'] = angerNote
        classificationDict['Anticipation Note'] = anticipationNote

        const classificationJSON = JSON.stringify(classificationDict)
        result = await Storage.put(classificationPath, classificationJSON)
        // const classificationPath = 'Classification/Video/video' + videoUploadCounter.toString() + '.txt'
        // result = await Storage.put(path, videoDataBlob, {
        //     contentType: 'video/mp4'
        // })
    }

    if(emotions[currentEmotion] === 'Joy'){
        intensityWord = 'Joy'
        noteQuestion = 'What are you joyful for?'
    } else if(emotions[currentEmotion] === 'Trust'){
        intensityWord = 'Trust'
        noteQuestion = 'What do you find trustworthy?'
    } else if(emotions[currentEmotion] === 'Fear'){
        intensityWord = 'Fear'
        noteQuestion = 'What are you fearful of?'
    } else if(emotions[currentEmotion] === 'Surprise'){
        intensityWord = 'Surprise'
        noteQuestion = 'What surprises you?'
    } else if(emotions[currentEmotion] === 'Sadness'){
        intensityWord = 'Sadness'
        noteQuestion = 'What saddens you?'
    } else if(emotions[currentEmotion] === 'Disgust'){
        intensityWord = 'Disgust'
        noteQuestion = 'What disgusts you?'
    } else if(emotions[currentEmotion] === 'Anger'){
        intensityWord = 'Anger'
        noteQuestion = 'What angers you?'
    } else if(emotions[currentEmotion] === 'Anticipation'){
        intensityWord = 'Anticipate'
        noteQuestion = 'What are you anticipating?'
    } else {
        awsSaveEntry(path, moodRating, joyIntensity, trustIntensity, fearIntensity, surpriseIntensity, sadnessIntensity, disgustIntensity, angerIntensity, anticipationIntensity, joyNote, trustNote, fearNote, surpriseNote, sadnessNote, disgustNote, angerNote, anticipationNote)
        navigation.navigate('MainView', {username: username})
    }

    const handleEnterButton = () => {
        setCurrentEmotion(currentEmotion+1)
    }
        
    
    return(
        <View style={styles.EmotionClassificationViewContainer}>
            <Text style={styles.EmotionClassificationHeaderText}>How intense is your feeling of {intensityWord}?</Text>
            <Slider
                onValueChange={(value) => updateSliderValue(value, emotions[currentEmotion])}
                style={styles.EmotionClassificationSlider}
            ></Slider>
            <Text style={styles.EmotionClassificationHeaderText}>{noteQuestion}</Text>
            <View style={{flex: 0.3}}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="Enter here!"
                    onChangeText={emotionNote => updateInputText(emotionNote, emotions[currentEmotion])}
                    value={emotionNote}
                    //onPressOut={Keyboard.dismiss()}
                    //returnKeyType='done'
                    //borderWidth={1}
                ></TextInput>
            </View>
            <TouchableOpacity
                style={styles.EmotionClassificationEnterButton}
                onPress={() => handleEnterButton()}
            >
                <Text style={styles.EmotionClassificationEnterButtonText}>Enter</Text>  
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    ClassificationViewBackButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    EmotionClassificationViewContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 10,

    },

    EmotionClassificationHeaderContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 20,
    },

    EmotionClassificationHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20,
    },

    EmotionClassificationSlider: {
        marginHorizontal: 20,
    },

    EmotionClassificationEnterButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '95%',
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,

    },

    EmotionClassificationEnterButtonText: {
        // fontSize: 20,
        // color: 'black'
    },

    textInput: {
        flex: 1,
        fontSize: 20,
        marginHorizontal: 10,
        borderRadius: 10,
        padding: 20,
        paddingTop: 20,
        textAlignVertical: 'top',
        backgroundColor: 'lightgrey'

    },

})