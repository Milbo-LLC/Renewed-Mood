import React, { useState, useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Video, Audio, AVPlaybackStatus } from 'expo-av';
import VideoPlayer from 'expo-video-player';

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import MediaEntryItemExpandedHeader from './../MediaEntryItemEpandedHeader';

import moment from 'moment';

export default function VideoEntryItemExpanded(params) {

    const id = params.route.params.id
    const videoLink = params.route.params.videoLink
    const count = params.route.params.entryCount
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const ratio = width/height
    console.log('ID: ', id)
    console.log('videoLink: ', videoLink)
    console.log('Count: ', count)
    const navigation = useNavigation();

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const handleBackButton = () => {
        navigation.goBack()
    } 

    const handleEditButton = () => {
        
    }

    const handlePlayButtonPress = async() => {
        console.log('Video play button pressed.')
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
            })
        } catch(error) {
            console.log('Error with Playing Video audio in silent mode: ', error)
        }
        if(!status.isPlaying) {
            video.current.playFromPositionAsync(0)
        }
    }

    return (
        <SafeAreaView style={styles.VideoEntryItemExpandedContainer}>
            {/* <MediaEntryItemExpandedHeader
                id={id}
                mediaLink={videoLink}
                count={count}
            ></MediaEntryItemExpandedHeader> */}
            <View style={styles.VideoEntryItemExpandedHeaderContainer}> 
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={styles.VideoEntryItemExpandedBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.VideoEntryItemExpandedHeaderTitleContainer}>
                    <Text style={styles.VideoEntryItemExpandedHeaderTitleText}>{'Video Entry ' + count}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => handleEditButton()}
                    >
                        <Feather style={{paddingHorizontal: 10}} name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>         
            
            <View style={styles.VideoEntryItemExpandedTimeStampContainer}>
                <Text style={styles.VideoEntryItemExpandedTimeStampText}>{moment(id).format('l') + ' @ ' + moment(id).format('h:mm a').toUpperCase()}</Text>
                {/* <Text style={styles.VideoEntryItemExpandedTimeStampText}>{moment(id).format('h:mm a').toUpperCase()}</Text> */}
            </View>

            <View style={[styles.videoEntryVideoContainer, {height: height*ratio*0.8, width: width*0.8 }]}>
                {/* <VideoPlayer
                    style={[styles.videoContainer, {height: height*ratio, width: width*0.8 }]}
                    videoProps={{
                        shouldPlay: true,
                        resizeMode: Video.RESIZE_MODE_COVER,
                        source: {
                            uri: videoLink
                        }
                    }}   
                /> */}
                <Video
                    ref={video}
                    style={[styles.videoContainer, {height: height*ratio, width: width*0.8 }]}
                    source={{uri: videoLink}}
                    resizeMode="cover"
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                    useNativeControls={true}
                    playFromPositionAsync={0}
                >
                </Video>
                {/* <View style={styles.videoEntryPlayButtonContainer}>
                    { !status.isPlaying ? (
                        <TouchableOpacity
                            style={styles.videoPlaybackButton}
                            onPress={
                                () => handlePlayButtonPress()
                            }
                        >
                            <Ionicons name={ Platform.OS === 'ios' ? "ios-play" : 'md-play'} size={100} color="white" />
                        </TouchableOpacity>
                    ) : null

                    }
                    
                </View> */}
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    VideoEntryItemExpandedContainer: {
        flex: 1,
    },

    VideoEntryItemExpandedHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'orange',
        justifyContent: 'space-between',
    },
    
    VideoEntryItemExpandedBackButton: {
        flex: 1,
        paddingHorizontal: 10,
    },

    VideoEntryItemExpandedHeaderTitleContainer: {
        flex: 2,
        alignItems: 'center',
        margin: 10,
    },

    VideoEntryItemExpandedHeaderTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    VideoEntryItemExpandedTimeStampContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },

    VideoEntryItemExpandedTimeStampText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    videoEntryVideoContainer: {
        borderWidth: 2,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        margin: 40,
        marginBottom: 5,
    },

    videoContainer: {
        borderRadius: 10,
        position: 'absolute',
    },

    videoEntryPlayButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        //backgroundColor: 'blue',
    },

    videoPlaybackButton: {
        // flex: 1,
        // backgroundColor: 'blue',
    },


})