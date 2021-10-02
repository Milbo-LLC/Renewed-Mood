import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Platform,  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';

export default function EmotionClassificationSelectionView(params) {

    console.log('Params: ', params)
    const type = params.route.params.type
    const username = params.route.params.username
    const title = params.route.params.title
    const entry = params.route.params.entry
    const path = params.route.params.path
    const moodRating = params.route.params.moodRating
    

    const navigation = useNavigation();

    let joyButtonBorderWidth = 2
    let trustButtonBorderWidth = 2
    let fearButtonBorderWidth = 2
    let surpriseButtonBorderWidth = 2
    let sadnessButtonBorderWidth = 2
    let disgustButtonBorderWidth = 2
    let angerButtonBorderWidth = 2
    let anticipationButtonBorderWidth = 2
    const [emotionsSelected, setEmotionsSelected] = useState(new Set())
    const [emotionsCount, setEmotionsCount] = useState(0)
    const [joySelected, setJoySelected] = useState(false)
    const [trustSelected, setTrustSelected] = useState(false)
    const [fearSelected, setFearSelected] = useState(false)
    const [surpriseSelected, setSurpriseSelected] = useState(false)
    const [sadnessSelected, setSadnessSelected] = useState(false)
    const [disgustSelected, setDisgustSelected] = useState(false)
    const [angerSelected, setAngerSelected] = useState(false)
    const [anticipationSelected, setAnticipationSelected] = useState(false)
    // let emotionsSelected = new Set()

    const handleBackButton = () => {
        navigation.goBack()
    } 
    const updateEmotionsSelected = (emotion) => {
        
        if(emotion === 'Joy'){
            setJoySelected(!joySelected)
        }
        if(emotion === 'Trust'){
            setTrustSelected(!trustSelected)
        }
        if(emotion === 'Fear'){
            setFearSelected(!fearSelected)
        }
        if(emotion === 'Surprise'){
            setSurpriseSelected(!surpriseSelected)
        }
        if(emotion === 'Sadness'){
            setSadnessSelected(!sadnessSelected)
        }
        if(emotion === 'Disgust'){
            setDisgustSelected(!disgustSelected)
        }
        if(emotion === 'Anger'){
            setAngerSelected(!angerSelected)
        }
        if(emotion === 'Anticipation'){
            setAnticipationSelected(!anticipationSelected)
        }
        if(emotionsSelected.has(emotion)){
            emotionsSelected.delete(emotion)
            setEmotionsCount(emotionsCount-1)
        } else {
            setEmotionsCount(emotionsCount+1)
            // emotionsSelected.add(emotion)
            setEmotionsSelected(emotionsSelected.add(emotion))
            console.log(emotionsSelected)
        }
        
        
        
    }

    if(joySelected) {
        joyButtonBorderWidth = 4    }
    if(trustSelected) {
        trustButtonBorderWidth = 4
    }
    if(fearSelected) {
        fearButtonBorderWidth = 4
    }
    if(surpriseSelected) {
        surpriseButtonBorderWidth = 4
    }
    if(sadnessSelected) {
        sadnessButtonBorderWidth = 4
    }
    if(disgustSelected) {
        disgustButtonBorderWidth = 4
    }
    if(angerSelected) {
        angerButtonBorderWidth = 4
    }
    if(anticipationSelected) {
        anticipationButtonBorderWidth = 4
    }

    const handleEnterButtonPress = () => {
        console.log('In handleEnterButtonPress')
        navigation.navigate('EmotionClassificationView', {type: type, username: username, title: title, entry: entry, path: path, moodRating: moodRating, emotionsSelected: emotionsSelected})
    }

    const navigateToEmotion = (emotion) => {
        console.log('In navigateToEmotion')
        if(emotion === 'Joy') {
            navigation.navigate('JoyClassificationView')
        } else if(emotion === 'Trust') {
            navigation.navigate('TrustClassificationView')
        } else if(emotion === 'Fear') {
            navigation.navigate('FearClassificationView')
        } else if(emotion === 'Surprise') {
            navigation.navigate('SurpriseClassificationView')
        } else if(emotion === 'Sadness') {
            navigation.navigate('SadnessClassificationView')
        } else if(emotion === 'Disgust') {
            navigation.navigate('DisgustClassificationView')
        } else if(emotion === 'Anger') {
            navigation.navigate('AngerClassificationView')
        } else {
            navigation.navigate('AngerClassificationView')
        }
    }

    return(
        <SafeAreaView>
            <TouchableOpacity
                style={styles.ClassificationViewBackButton}
                onPress={() => handleBackButton()}
            >
                <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                {/* <Text style={{fontSize: 20}}>Back</Text> */}
            </TouchableOpacity>
            <View style={styles.EmotionClassificationSelectionViewContainer}>
                <View style={styles.EmotionClassificationSelectionHeaderContainer}>
                    { 
                        emotionsCount === 0 ? <Text style={styles.EmotionClassificationSelectionHeaderText}>Which emotions are you feeling right now?</Text> : 
                        <TouchableOpacity
                            style={styles.EnterButton}
                            onPress={() => handleEnterButtonPress()}
                        >
                            <Text>Enter</Text>
                        </TouchableOpacity>
                    }
                </View>
                <ScrollView contentContainerStyle={styles.EmotionClassificationSelectionButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.JoyButton, {borderWidth: joyButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Joy')}
                    >
                        <Text>Joy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.TrustButton, {borderWidth: trustButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Trust')}
                    >
                        <Text>Trust</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.FearButton, {borderWidth: fearButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Fear')}
                    >
                        <Text>Fear</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.SurpriseButton, {borderWidth: surpriseButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Surprise')}
                    >
                        <Text>Surprise</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.SadnessButton, {borderWidth: sadnessButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Sadness')}
                    >
                        <Text>Sadness</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.DisgustButton, {borderWidth: disgustButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Disgust')}
                    >
                        <Text>Disgust</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.AngerButton, {borderWidth: angerButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Anger')}
                    >
                        <Text>Anger</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.AnticipationButton, {borderWidth: anticipationButtonBorderWidth}]}
                        onPress={() => updateEmotionsSelected('Anticipation')}
                    >
                        <Text>Anticipation</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    ClassificationViewBackButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    EmotionClassificationSelectionViewContainer: {
        
    },

    EmotionClassificationSelectionHeaderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    EmotionClassificationSelectionHeaderText: {
        fontSize: 16,
        padding: 20,

    },
    EmotionClassificationSelectionButtonsContainer: {
        paddingVertical: 20,
        // backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    JoyButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    TrustButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    FearButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    SurpriseButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    SadnessButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    DisgustButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    AngerButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    AnticipationButton: {
        alignItems: 'center',
        padding: 20,
        margin: 5,
        width: '80%',
        borderWidth: 2,
        borderRadius: 10,
    },
    EnterButton: {
        alignItems: 'center',
        padding: 20,
        marginTop: 10,
        width: '80%',
        // borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'lightblue',
        // borderColor: 'lightblue'
    },
})

