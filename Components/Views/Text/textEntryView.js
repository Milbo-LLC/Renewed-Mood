import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from './../../Redux/entrySlice';

// Import libraries for AWS Storage
import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'
import config from './../../../aws-exports';
Amplify.configure(config)

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { FontAwesome } from '@expo/vector-icons';

import TextEntryItem from './textEntryItem';

import MediaEntryHeader from '../MediaEntryHeader';

import AsyncStorageSave from '../../AsyncStorage/AsyncStorageSave';

export default function TextEntryView({changeMedia, media, username}) {
    const [id, setID] = useState('')
    const [titleText, setTitleText] = useState('')
    const [entryText, setEntryText] = useState('')
    const [textUploadCounter, setTextUploadCounter] = useState(0)
    const dispatch = useDispatch();
    const entries = useSelector((state) => state.entry);

    const navigation = useNavigation();

    let entryObject = {}

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

    const saveEntry = () => {
        const idDate = Date.now().toString()
        console.log('ID Date: ', idDate)
        let idString = idDate.slice()
        console.log('ID STRING 1: ', idString)
        entryData['id'] = Date.now(),
        entryData['username'] = username, 
        entryData['awsPath'] = 'Entries/' + username + '/Text/text' + textUploadCounter.toString() + '.txt', 
        entryData['type'] = 'text', 
        entryData['entry'] = entryText,
        AsyncStorageSave(entryData, entryData['id'].toString(), 'Text')
        if( entryText !== ''){
            dispatch(addEntry({
                id: idString,
                username: username,
                awsPath: 'Entries/' + username + '/Text/text' + textUploadCounter.toString() + '.txt',
                type: 'text',
                title: titleText,
                entry: entryText,
            }))
            console.log('ID STRING 2: ', idString)
            setEntryText('')
            setTitleText('')
        }
    }
    const saveEntryAWS = async() => {
        const path = 'Entries/' + username + '/Text/text' + textUploadCounter.toString() + '.txt'
        const result = await Storage.put(path, entryText)
        setTextUploadCounter(textUploadCounter + 1)
    }

    const classifyEntry = (entry, path) => {
        navigation.navigate('MoodClassificationView', {type: 'text', username: username, title: titleText, entry: entry, path: path})
        setEntryText('')
        setTitleText('')
    }

    async function handleEnterButtonPress(){
        Alert.alert(
            "Would you like to classify this text entry?",
            "",
            [
                {
                    text: 'Classify',
                    onPress: () => classifyEntry(entryText, 'Entries/' + username + '/Text/text' + textUploadCounter.toString() + '.txt'),

                },
                {
                    text: 'Cancel',
                    onPress: (videoURI) => saveEntry(),
                    style: 'cancel',
                },
                
            ]
        )
        
        saveEntryAWS()
        setAudioUploadCounter(audioUploadCounter + 1)
        
    }


    return (
        <View style={styles.textEntryContainer}>

            <View style={styles.TextEntryHeaderContainer}>
                <MediaEntryHeader 
                    changeMedia={changeMedia} 
                    media={media} 
                    audioButtonColor={'lightgrey'}
                    videoButtonColor={'lightgrey'}
                    textButtonColor={'red'}
                >
                </MediaEntryHeader>
            </View>
            <View style={styles.TextEntryFooterContainer}>
            
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder="What's on your mind?"
                        onChangeText={entryText => setEntryText(entryText)}
                        value={entryText}
                        //onPressOut={Keyboard.dismiss()}
                        //returnKeyType='done'
                        //borderWidth={1}
                    ></TextInput>
                </View>
                <View style={styles.textEnterButtonContainer}>
                    <TouchableOpacity
                        style={styles.textEnterButton}
                        onPress={(entryText) => handleEnterButtonPress()}
                    >
                        <Text style={styles.textEnterButtonText}>Enter</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({

    textEntryContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        //paddingVertical: 10,
    
    },
    TextEntryHeaderContainer: {
        flex: 0.2,
        paddingVertical: 10,
        marginTop: 30,
        flexDirection: 'row',
        // backgroundColor: 'blue',
    },

    TextEntryFooterContainer: {
        flex: 1,
    },

    textInputContainer: {
        flex: 1,
        padding: 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'lightgrey',
    },
    titleTextInputContainer: {
        flex: 0.5,
        //height: 70,
        paddingVertical: 5,
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
    textEnterButtonContainer: {
        flex: 0.1,
        //backgroundColor: 'yellow',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textEnterButton: {
        //padding: 10,
        flex: 1,
        backgroundColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textEnterButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    MediaButtonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
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
