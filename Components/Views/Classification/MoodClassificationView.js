import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform, } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import Slider from '@react-native-community/slider'

import { Ionicons } from '@expo/vector-icons';

export default function MoodClassificationView( params ) {

    const type = params.route.params.type
    const username = params.route.params.username
    const title = params.route.params.title
    const entry = params.route.params.entry
    const path = params.route.params.path

    // console.log('type\n', type)
    // console.log('title\n', title)
    console.log('entry\n', entry)
    // console.log('path\n', path)
    const [moodSliderValue, setMoodSliderValue] = useState(0)
    
    const navigation = useNavigation();
    
    const handleBackButton = () => {
        navigation.goBack()
    } 

    const updateSliderValue = (value) => {
        setMoodSliderValue(value)
    }

    return (
        <SafeAreaView style={styles.ClassificationViewContainer}>
            <TouchableOpacity
                style={styles.ClassificationViewBackButton}
                onPress={() => handleBackButton()}
            >
                <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                {/* <Text style={{fontSize: 20}}>Back</Text> */}
            </TouchableOpacity>
            <View style={styles.MoodClassificationViewContainer}>
                <Text style={styles.MoodClassificationHeaderContainer}>How are you feeling?</Text>
                <Slider
                    onValueChange={(value) => updateSliderValue(value)}
                    style={styles.MoodClassificationSlider}
                ></Slider>
                <TouchableOpacity
                    style={styles.MoodClassificationEnterButton}
                    onPress={() => navigation.navigate('EmotionClassificationSelectionView', {type: type, username: username, title: title, entry: entry, path: path, moodRating: moodSliderValue})}
                >
                    <Text style={styles.MoodClassificationEnterButtonText}>Enter</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    ClassificationViewContainer: {
        flex: 1,
        
    },

    ClassificationViewBackButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    MoodClassificationViewContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 10,
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },

    MoodClassificationHeaderContainer: {
        alignSelf: 'center',
        padding: 20,
    },

    MoodClassificationSlider: {
        marginHorizontal: 20,
    },

    MoodClassificationEnterButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '30%',
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,

    },

    MoodClassificationEnterButtonText: {

    },

})
