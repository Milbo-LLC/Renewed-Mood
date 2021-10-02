import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import moment from 'moment';

export default function MediaEntryItemExpandedHeader({ id, mediaLink, count }) {
    <View style={styles.MediaEntryItemExpandedContainer}> 
        <View style={styles.MediaEntryItemExpandedHeaderContainer}> 
            <View style={{flex: 1}}>
                <TouchableOpacity
                    style={styles.MediaEntryItemExpandedBackButton}
                    onPress={() => handleBackButton()}
                >
                    <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.MediaEntryItemExpandedHeaderTitleContainer}>
                <Text style={styles.MediaEntryItemExpandedHeaderTitleText}>{'Media Entry ' + count}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                <TouchableOpacity
                    onPress={() => handleEditButton()}
                >
                    <Feather style={{paddingHorizontal: 10}} name="edit" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>         
        
        <View style={styles.MediaEntryItemExpandedTimeStampContainer}>
            <Text style={styles.MediaEntryItemExpandedTimeStampText}>{moment(id).format('l') + ' @ ' + moment(id).format('h:mm a').toUpperCase()}</Text>
            {/* <Text style={styles.MediaEntryItemExpandedTimeStampText}>{moment(id).format('h:mm a').toUpperCase()}</Text> */}
        </View>
    </View>
}

const styles = StyleSheet.create({

    MediaEntryItemExpandedContainer: {
        flex: 1,
    },

    MediaEntryItemExpandedHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'orange',
        justifyContent: 'space-between',
    },
    
    MediaEntryItemExpandedBackButton: {
        flex: 1,
        paddingHorizontal: 10,
    },

    MediaEntryItemExpandedHeaderTitleContainer: {
        flex: 2,
        alignItems: 'center',
        margin: 10,
    },

    MediaEntryItemExpandedHeaderTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    MediaEntryItemExpandedTimeStampContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },

    MediaEntryItemExpandedTimeStampText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },


})