import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Platform, ScrollView, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Slider from '@react-native-community/slider'

import { Ionicons } from '@expo/vector-icons';

export default function FearClassificationView({ navigation }) {
     
    const [FearNote, setFearNote] = useState('')
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
            <View style={styles.FearClassificationViewContainer}>
                <Text style={styles.FearClassificationHeaderText}>How intense is your feeling of Fear?</Text>
                <Slider
                    onValueChange={(value) => updateSliderColor(value)}
                    style={styles.FearClassificationSlider}
                ></Slider>
                <Text style={styles.FearClassificationHeaderText}>What are you fearful of?</Text>
                <View style={{flex: 0.3}}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        placeholder="A tough exam."
                        onChangeText={FearNote => setFearNote(FearNote)}
                        value={FearNote}
                        //onPressOut={Keyboard.dismiss()}
                        //returnKeyType='done'
                        //borderWidth={1}
                    ></TextInput>
                </View>
                <TouchableOpacity
                    style={styles.FearClassificationEnterButton}
                    onPress={() => navigation.navigate('EmotionClassificationSelectionView')}
                >
                  <Text style={styles.FearClassificationEnterButtonText}>Enter</Text>  
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

    FearClassificationViewContainer: {
        flex: 1,
        // backgroundColor: 'green',
        margin: 10,

    },

    FearClassificationHeaderContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 20,
    },

    FearClassificationHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 20,
    },

    FearClassificationSlider: {
        marginHorizontal: 20,
    },

    FearClassificationEnterButton: {
        alignSelf: 'center',
        alignItems: 'center',
        width: '95%',
        margin: 10,
        padding: 20,
        borderWidth: 2,
        borderRadius: 10,

    },

    FearClassificationEnterButtonText: {
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