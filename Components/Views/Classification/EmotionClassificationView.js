import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, Platform,  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';

import EmotionClassificationItem from './EmotionClassificationItem';

export default function EmotionClassificationView(params) {

    console.log(params)
    const type = params.route.params.type
    const username = params.route.params.username
    const title = params.route.params.title
    const entry = params.route.params.entry
    const path = params.route.params.path
    const moodRating = params.route.params.moodRating
    const emotionsSelected = params.route.params.emotionsSelected

    console.log('Type: ', type)
    console.log('Title: ', title)
    console.log('Entry: ', entry)
    console.log('Mood rating: ', moodRating)
    console.log('Emotions Selected: ', emotionsSelected)

    const emotionsList = []

    const navigation = useNavigation();
    
    const handleBackButton = () => {
        navigation.goBack()
        
    } 
    
    emotionsSelected.forEach((emotion) => emotionsList.push(emotion))
    // console.log(emotionsList)

    return (
        <SafeAreaView style={{flex: 1,}}>
            <TouchableOpacity
                style={styles.ClassificationViewBackButton}
                onPress={() => handleBackButton()}
            >
                <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                {/* <Text style={{fontSize: 20}}>Back</Text> */}
            </TouchableOpacity>
            <View style={styles.EmotionClassificationViewContainer}>
                <EmotionClassificationItem emotions={emotionsList} type={type} username={username} title={title} entry={entry} path={path} moodRating={moodRating}></EmotionClassificationItem>
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

    EmotionClassificationViewContainer: {
        flex: 1,
    }
})