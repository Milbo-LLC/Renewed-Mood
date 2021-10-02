import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform, ScrollView, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Slider from '@react-native-community/slider'

import { Ionicons } from '@expo/vector-icons';

export default function SurpriseClassificationView({ navigation }) {
     
    const [SurpriseNote, setSurpriseNote] = useState('')
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
            <View style={styles.SurpriseClassificationViewContainer}>
                <Text style={styles.SurpriseClassificationHeaderText}>How intense is your feeling of Surprise?</Text>
                <Slider
                    onValueChange={(value) => updateSliderColor(value)}
                    style={styles.SurpriseClassificationSlider}
                ></Slider>
                <Text style={styles.SurpriseClassificationHeaderText}>What are you surprised about?</Text>
                <View style={{flex: 0.3}}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder="Seeing a friend on a walk!"
                        onChangeText={SurpriseNote => setSurpriseNote(SurpriseNote)}
                        value={SurpriseNote}
                        //onPressOut={Keyboard.dismiss()}
                        //returnKeyType='done'
                        //borderWidth={1}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    style={styles.SurpriseClassificationEnterButton}
                    onPress={() => navigation.navigate('EmotionClassificationSelectionView')}
                >
                  <Text style={styles.SurpriseClassificationEnterButtonText}>Enter</Text>  
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

    SurpriseClassificationViewContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 10,

    },

    SurpriseClassificationHeaderContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 20,
    },

    SurpriseClassificationHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20,
    },

    SurpriseClassificationSlider: {
        marginHorizontal: 20,
    },

    SurpriseClassificationEnterButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '95%',
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,

    },

    SurpriseClassificationEnterButtonText: {
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