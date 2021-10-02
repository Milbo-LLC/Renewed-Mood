import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, TextInput, Animated, Modal } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import AudioEntryView from './Audio/audioEntryView';
import VideoEntryView from './Video/VideoEntryView';
import TextEntryView from './Text/textEntryView';

export default function MediaEntryViews( { param } ) {
    const [media, setMedia] = useState('Video')
    // const [username, setUsername] = useState('')

    const changeMedia = (mediaType) => {
        setMedia(mediaType)
    }

    if(param.route.params.username !== undefined){
        () => setUsername(param.route.params.username)
    }

    const username = param.route.params.username

    if(media === 'Audio') {
        return(
            <View style={styles.MediaViewContainer}>
                <AudioEntryView 
                    changeMedia={changeMedia} 
                    media={media}
                    username={username}
                ></AudioEntryView>
            </View>
        )
    }

    if(media === 'Video') {
        return(
            <View style={styles.MediaViewContainer}>
                <VideoEntryView 
                    changeMedia={changeMedia} 
                    media={media} 
                    username={username}
                ></VideoEntryView>
            </View>
        )
    }

    if(media === 'Text') {
        return(
            <View style={styles.MediaViewContainer}>
                <TextEntryView
                    changeMedia={changeMedia} 
                    media={media} 
                    username={username}
                ></TextEntryView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    MediaViewContainer: {
        flex: 1,
        backgroundColor: 'black'
    }
})