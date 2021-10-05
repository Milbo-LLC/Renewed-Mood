import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, TextInput, Animated, Modal } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native'

export default function MediaEntryHeader({changeMedia, media, audioButtonColor, videoButtonColor, textButtonColor }) {

    const navigation = useNavigation();

    return (
        <View style={styles.MediaEntryHeaderContainer}>

            <View style={styles.MediaEntryHeaderButtonsContainer}>

                <View style={styles.MediaEntryHeaderLeftButtonsContainer}>
                    <TouchableOpacity
                        style={styles.MediaButton}
                        onPress={() => navigation.navigate('ProfileView')}
                    >
                        <View style={[styles.MediaButtonBorder, {backgroundColor: 'lightgrey'}]}>
                            <MaterialCommunityIcons name="account" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.MediaEntryHeaderRightButtonsContainer}>
        
                    <TouchableOpacity
                        style={styles.MediaButton}
                        onPress={() => changeMedia('Audio')}
                        // onPress={() => handleMediaButtonPress('Audio')}
                    >
                        <View style={[styles.MediaButtonBorder, {backgroundColor: audioButtonColor}]}>
                            <FontAwesome name={ Platform.OS === 'ios' ? "microphone" : 'md-micrphone'} size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={styles.MediaButton}
                        onPress={() => changeMedia('Video')}
                        // onPress={() => handleMediaButtonPress('Video')}
                    >
                        <View style={[styles.MediaButtonBorder, {backgroundColor: videoButtonColor}]}>
                            <FontAwesome name={ Platform.OS === 'ios' ? "camera" : 'md-camera'} size={20} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.MediaButton}
                        onPress={() => changeMedia('Text')}
                        // onPress={() => handleMediaButtonPress('Text')}
                    >
                        <View style={[styles.MediaButtonBorder, {backgroundColor: textButtonColor}]}>
                            <FontAwesome name={ Platform.OS === 'ios' ? "pencil" : 'md-pencil'} size={20} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.MediaEntryHeaderTitleContainer}>
                <TextInput
                    style={styles.MediaEntryHeaderTitle}
                    placeholder={media + ' Entry Title'}
                    // onChangeText={titleText => setTitleText(titleText)}
                    // value={titleText}
                ></TextInput>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    MediaEntryHeaderContainer: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        //backgroundColor: 'blue',
        marginHorizontal: 10,
    },
    MediaEntryHeaderTitleContainer: {
        flex: 0.5,
        width: '100%',
        justifyContent: 'center',
    },
    MediaEntryHeaderTitle: {
        height: 40,
        margin: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        paddingHorizontal: 10,
    },

    MediaEntryHeaderButtonsContainer: {
        width: '100%',
        flexDirection: 'row',
        //backgroundColor: 'green',
    },

    MediaEntryHeaderLeftButtonsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    MediaEntryHeaderRightButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'yellow',
    },
    MediaButton: {
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
        // backgroundColor: 'lightgrey'
    },
    
})