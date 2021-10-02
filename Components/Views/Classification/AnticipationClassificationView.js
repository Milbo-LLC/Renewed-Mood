import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform, ScrollView, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Slider from '@react-native-community/slider'

import { Ionicons } from '@expo/vector-icons';

export default function AnticipationClassificationView({ navigation }) {
     
    const [AnticipationNote, setAnticipationNote] = useState('')
    const handleBackButton = () => {
        navigation.replace('EmotionClassificationSelectionView')
    } 

    const updateSliderColor = (value) => {
        console.log('Value: ', value)
    }
    
    return(
        <SafeAreaView style={{flex: 1}}>
            <TouchableOpacity
                style={styles.ClassificationViewBackButton}
                onPress={() => handleBackButton()}
            >
                <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                {/* <Text style={{fontSize: 20}}>Back</Text> */}
            </TouchableOpacity>
            <View style={styles.AnticipationClassificationViewContainer}>
                <Text style={styles.AnticipationClassificationHeaderText}>How intense is your feeling of Anticipation?</Text>
                <Slider
                    onValueChange={(value) => updateSliderColor(value)}
                    style={styles.AnticipationClassificationSlider}
                ></Slider>
                <Text style={styles.AnticipationClassificationHeaderText}>What are you anticipating?</Text>
                <View style={{flex: 0.3}}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder="A fun party!"
                        onChangeText={AnticipationNote => setAnticipationNote(AnticipationNote)}
                        value={AnticipationNote}
                        //onPressOut={Keyboard.dismiss()}
                        //returnKeyType='done'
                        //borderWidth={1}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    style={styles.AnticipationClassificationEnterButton}
                    onPress={() => navigation.navigate('EmotionClassificationSelectionView')}
                >
                  <Text style={styles.AnticipationClassificationEnterButtonText}>Enter</Text>  
                </TouchableOpacity>
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

    AnticipationClassificationViewContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 10,

    },

    AnticipationClassificationHeaderContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 20,
    },

    AnticipationClassificationHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20,
    },

    AnticipationClassificationSlider: {
        marginHorizontal: 20,
    },

    AnticipationClassificationEnterButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '95%',
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,

    },

    AnticipationClassificationEnterButtonText: {
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