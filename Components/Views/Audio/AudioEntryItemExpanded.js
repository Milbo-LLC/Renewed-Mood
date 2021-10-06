import React, { useState, useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Audio } from 'expo-av';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import MediaEntryItemExpandedHeader from './../MediaEntryItemEpandedHeader';

import moment from 'moment';

export default function AudioEntryItemExpanded(params) {

    const id = params.route.params.id
    const audioLink = params.route.params.audioLink
    const count = params.route.params.entryCount

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const ratio = width/height

    const navigation = useNavigation();
    
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [shouldPlay, setShouldPlay] = useState(false)
    const [sound, setSound] = React.useState();

    const handleBackButton = () => {
        navigation.goBack()
    } 

    const handleEditButton = () => {
        
    }

    async function playSound() {
        if(!isPlaying) {
            console.log('\nLoading Sound.\n')
            setShouldPlay(true)
            const { sound } = await Audio.Sound.createAsync(
                {uri: audioLink},
                {shouldPlay: shouldPlay}
            );
            setSound(sound)
            console.log('Playing Sound.')
            setIsPlaying(true)
            await sound.playAsync()
        } else {
            setShouldPlay(false)
            const { sound } = await Audio.Sound.createAsync(
                {uri: audioLink},
                {shouldPlay: shouldPlay}
            );
            setIsPlaying(false)
        }
        
    }

    return (
        <SafeAreaView style={styles.AudioEntryItemExpandedContainer}>
            {/* <MediaEntryItemExpandedHeader
                id={id}
                mediaLink={audioLink}
                count={count}
            ></MediaEntryItemExpandedHeader> */}
            <View style={styles.AudioEntryItemExpandedHeaderContainer}> 
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={styles.AudioEntryItemExpandedBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.AudioEntryItemExpandedHeaderTitleContainer}>
                    <Text style={styles.AudioEntryItemExpandedHeaderTitleText}>{'Audio Entry ' + count}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => handleEditButton()}
                    >
                        <Feather style={{paddingHorizontal: 10}} name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>         
            
            <View style={styles.AudioEntryItemExpandedTimeStampContainer}>
                <Text style={styles.AudioEntryItemExpandedTimeStampText}>{moment(id).format('l') + ' @ ' + moment(id).format('h:mm a').toUpperCase()}</Text>
                {/* <Text style={styles.AudioEntryItemExpandedTimeStampText}>{moment(id).format('h:mm a').toUpperCase()}</Text> */}
            </View>

            <View style={[styles.audioEntryAudioContainer, { height: height*ratio*0.4, width: width*0.8 }]}>

                <TouchableOpacity 
                    style={styles.audioEntryPlayButton}
                    onPress={playSound}
                >
                    <Ionicons name={ isPlaying ? "ios-pause" : "ios-play"} size={40} color="white" />
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    AudioEntryItemExpandedContainer: {
        flex: 1,
    },

    AudioEntryItemExpandedHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'orange',
        justifyContent: 'space-between',
    },
    
    AudioEntryItemExpandedBackButton: {
        flex: 1,
        paddingHorizontal: 10,
    },

    AudioEntryItemExpandedHeaderTitleContainer: {
        flex: 2,
        alignItems: 'center',
        margin: 10,
    },

    AudioEntryItemExpandedHeaderTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    AudioEntryItemExpandedTimeStampContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },

    AudioEntryItemExpandedTimeStampText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    audioEntryAudioContainer: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        marginHorizontal: 5,
        marginBottom: 5,
    },
})