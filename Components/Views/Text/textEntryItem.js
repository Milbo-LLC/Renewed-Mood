import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Animated, Alert } from 'react-native';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { deleteEntry } from './../../Redux/entrySlice';

import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'

import { MaterialIcons } from '@expo/vector-icons'; 

const TextEntryItem = ({ user, entriesDict, month, day, id, awsPath, awsClassificationPath, title, author, entry, count }) => {
    const [scale, setScale] = useState(1)
    const [translateX, setTranslateX] = useState(0)
    const [showDeleteButton, setShowDeleteButton] = useState(false)
    const [flexDirection, setFlexDirection] = useState('column')
    const [removedAsyncStorage, setRemovedAsyncStorage] = useState(false);
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const entries = useSelector((state) => state.entry);
    
    const handleEntryItemPressIn = () => {
        setScale(0.95)
    }

    const handleEntryItemPressOut = () => {
        setScale(1)
    }

    const handleEntryItemLongPress = () => {
        // alert('')
        if(translateX === 0) {
            setTranslateX(40)
            setShowDeleteButton(true)
            setFlexDirection('row')
        } else {
            setTranslateX(0)
            setShowDeleteButton(false)
            setFlexDirection('column')
        } 
    }


    const deleteEntryAlert = () => {
        Alert.alert(
            'Are you sure?',
            'Once an entry is deleted, it cannot be undone.',
            [
                {
                    text: 'Confirm',
                    // onPress: () => dispatch(deleteEntry())
                    onPress: () => handleDeleteEntry()
                },
                {
                    text: 'Cancel',
                    onPress: () => handleEntryItemLongPress()
                }
            ]
        )
    }

    const handleDeleteEntryAsyncStorage = async(user) => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const entryKeys = []
            for(key in keys) {
                if(/^\d+$/.test(keys[key])) {
                    entryKeys.push(keys[key])
                }
            }
            for(key in entryKeys){
                console.log('entryKeys[key]: ', typeof parseInt(entryKeys[key], 10))
                if(Math.abs(parseInt(entryKeys[key], 10) - id) < 1000) {
                    console.log('Removing entry from AsyncStorage.')
                    try {
                        await AsyncStorage.removeItem(entryKeys[key])
                    } catch (error) {
                        console.log('Error removing entry from AsyncStorage: ', error)
                    }
                    setRemovedAsyncStorage(true)
                    // console.log('User: ', user)
                    // navigation.navigate('EntriesView', { username: user })
                }
            }
            // await AsyncStorage.removeItem()
        } catch(error) {
            console.log('Error deleting entry from AsyncStorage: ', error)
        }
        setRemovedAsyncStorage(false)
        // navigation.replace('EntriesView', {username: user})
    }

    const handleDeleteEntry = async() => {
        dispatch(deleteEntry({
            id: id,
        }))
        handleDeleteEntryAsyncStorage(user)
        await Storage.remove(awsPath)
        await Storage.remove(awsClassificationPath)

    }

    // const deleteEntry = () => {
    //     // dispatch(deleteEntry({id: id}))
    // }
    
    const textEntryItemExpanded = (id, TextLink, count) => {
        if(translateX === 0) {
            navigation.navigate('TextEntryItemExpanded', {id, entry, count})
        }
    }
    
    return (
        <View style={[styles.entryItemContainer, {flexDirection: flexDirection}]}>
        
            {showDeleteButton ? (
                <View style={styles.entryItemDeleteButtonContainer}>
                    <TouchableOpacity 
                        style={styles.entryItemDeleteButton}
                        onPress={() => deleteEntryAlert()}
                    >
                        <MaterialIcons name="delete-forever" size={35} color="white" />
                    </TouchableOpacity>
                </View>
            ) : null}

            <Animated.View style={{flex: 0.8, transform: [{ translateX: 0 }, { scale: scale }] }}>
                
                <TouchableWithoutFeedback
                    onPressIn={() => handleEntryItemPressIn()}
                    onPress={() => textEntryItemExpanded(id, entry, count)}
                    onLongPress={() => handleEntryItemLongPress()}
                    onPressOut={() => handleEntryItemPressOut()}
                    
                >
                    <View style={styles.textEntryItemContainer}>
                        <View style={styles.textEntryHeaderContainer}>
                            <View style={styles.timeStampContainer}>
                                {/* <Text style={styles.dateStampText}>{Date(id).substring(0,3)}</Text> */}
                                <Text>{moment(id).format('h:mm a').toUpperCase()}</Text>

                            </View>
                            <View style={styles.textEntryHeaderTextContainer}>
                                <View style={styles.textEntryHeaderTitleContainer}>
                                    {/* <Text style={styles.textEntryHeaderText}>{title}</Text> */}
                                    <Text style={styles.textEntryHeaderText}>{'Text Entry ' + count}</Text>
                                </View>
                            </View>    
                        </View>
                        <View style={styles.textEntryItemTextContainer}>
                            <Text style={styles.textEntryItemText}>{entry}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    )

}

const styles = StyleSheet.create({

    entryItemContainer: {
        flex: 1,
    },

    entryItemDeleteButtonContainer: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        // marginLeft: 20,
        // backgroundColor: 'blue',
    },

    entryItemDeleteButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        // marginBottom: 5,
        // marginHorizontal: 5,
        backgroundColor: 'red',
        borderRadius: 10,

    },

    textEntryItemContainer: {
        // flex: 0.8,
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 5,
        marginBottom: 5,
        backgroundColor: 'lightgrey',
    },
    textEntryHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',  
        padding: 5,  
    },

    textEntryHeaderTextContainer: {
        height: '100%',
        justifyContent: 'center',
    },

    textEntryItemTextContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingBottom: 5,
    },
    textEntryItemText: {
        fontSize: 20,
    },
    textEntryHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    timeStampContainer: {
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    timeStampText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
})

export default TextEntryItem;