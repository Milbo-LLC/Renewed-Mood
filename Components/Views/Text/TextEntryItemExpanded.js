import React, { useState, useRef, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 

import MediaEntryItemExpandedHeader from './../MediaEntryItemEpandedHeader';

import moment from 'moment';

export default function TextEntryItemExpanded(params) {

    const id = params.route.params.id
    const TextLink = params.route.params.TextLink
    const count = params.route.params.entryCount

    const navigation = useNavigation();

    const handleBackButton = () => {
        navigation.goBack()
    } 

    const handleEditButton = () => {
        
    }

    return (
        <SafeAreaView style={styles.TextEntryItemExpandedContainer}>
            {/* <MediaEntryItemExpandedHeader
                id={id}
                mediaLink={TextLink}
                count={count}
            ></MediaEntryItemExpandedHeader> */}
            <View style={styles.TextEntryItemExpandedHeaderContainer}> 
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        style={styles.TextEntryItemExpandedBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.TextEntryItemExpandedHeaderTitleContainer}>
                    <Text style={styles.TextEntryItemExpandedHeaderTitleText}>{'Text Entry ' + count}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress={() => handleEditButton()}
                    >
                        <Feather style={{paddingHorizontal: 10}} name="edit" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>         
            
            <View style={styles.TextEntryItemExpandedTimeStampContainer}>
                <Text style={styles.TextEntryItemExpandedTimeStampText}>{moment(id).format('l') + ' @ ' + moment(id).format('h:mm a').toUpperCase()}</Text>
                {/* <Text style={styles.TextEntryItemExpandedTimeStampText}>{moment(id).format('h:mm a').toUpperCase()}</Text> */}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    TextEntryItemExpandedContainer: {
        flex: 1,
    },

    TextEntryItemExpandedHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        // backgroundColor: 'orange',
        justifyContent: 'space-between',
    },
    
    TextEntryItemExpandedBackButton: {
        flex: 1,
        paddingHorizontal: 10,
    },

    TextEntryItemExpandedHeaderTitleContainer: {
        flex: 2,
        alignItems: 'center',
        margin: 10,
    },

    TextEntryItemExpandedHeaderTitleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    TextEntryItemExpandedTimeStampContainer: {
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 20,
    },

    TextEntryItemExpandedTimeStampText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },


})