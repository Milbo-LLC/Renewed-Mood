import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, Touchable, Platform, Image, KeyboardAvoidingView } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { handleUsername } from './../../Redux/usernameSlice';

import { NavigationContainer } from '@react-navigation/native';

import { Auth } from 'aws-amplify';

import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';

// Import library for AsyncStorage (Used for data persistence)
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageGet from './../../AsyncStorage/AsyncStorageGet';
import { updatePersisted } from './../../Redux/persistedSlice';

export default function SignInView({ navigation }) {

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const entriesInRedux = useSelector((state) => state.entry)
    // const persistedState = useSelector((state) => state.persisted);
    // const dispatch = useDispatch();

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleHidePasswordButton = () => {
        if(secureTextEntry === true) {
            setSecureTextEntry(false)
        } else {
            setSecureTextEntry(true)
        }
            
    }

    const handeHidePasswordButtonIcon = () => {
        if(Platform.OS === 'ios'){
            if(secureTextEntry === true) {
                return 'eye'
            } else {
                return 'eye-off'
            }
        } else {
            if(secureTextEntry === true) {
                return 'md-eye'
            } else {
                return 'md-eye-off'
            }
        }
    }

    const handleUsernameTextInput = (text) => {
        setUsername(text)
    }


    const handlePasswordTextInput = (text) => {
        console.log('Password: ', text)
        setPassword(text)
    }

    // const handleUsernameSave = () => {
    //     dispatch(handleUsername({
    //         username: username
    //     }))
    // }

    const handleAWSSignIn = async() => {
        // if(entriesInRedux.length === 0) {
        //     console.log('Username from SignInView: ', username);
        //     console.log('About to go into AsyncStorageGet');
        //     AsyncStorageGet(username)
        // }
        try {
            await Auth.signIn(username, password)
            console.log('Successfully signed in.')
            navigation.navigate('MainView', {username: username})
            // navigation.navigate('AWSUpload')
        } catch(error) {
            console.log('Error signing in: ', error)
        }
    }

    // console.log('PersistedState.isPersisted: ', persistedState.isPersisted)
    // if(persistedState.isPersisted === false) {
    //     AsyncStorageGet().then(() => {
    //         dispatchUpdatePersisted(dispatch)
    //     })
    // }

    // // Local data persistence
    // if(persistedState.isPersisted === false) {
    //     AsyncStorageGet(false).then(() => {
    //         dispatch(updatePersisted())
    //     })
    // } else {
    //     AsyncStorageGet(true)
    // }

    console.log('Number of entries in entriesInRedux: ', entriesInRedux.length)
    
    if(entriesInRedux.length === 0) {
        console.log('Username from SignInView: ', username);
        console.log('About to go into AsyncStorageGet');
        AsyncStorageGet(username)
    }
    
    return(

        <View style={styles.SignInViewContainer}>

            <SafeAreaView style={styles.SignInViewHeaderContainer}>

                <TouchableOpacity
                    style={styles.SignInViewBackButton}
                    onPress={() => handleBackButton()}
                >
                    <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                    {/* <Text style={{fontSize: 20}}>Back</Text> */}
                </TouchableOpacity>

                <View style={styles.SignInViewHeaderRowContent}>
                    
                    <Text style={styles.SignInViewHeaderTitle}>Sign In!</Text>

                    <TouchableOpacity
                        style={styles.ConfirmButton}
                        onPress={() => handleAWSSignIn()}
                    >
                        <Text style={styles.ConfirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
            
            <Animatable.View style={styles.SignInViewFooterContainer} animation='slideInUp'>

                <ScrollView style={styles.ScrollView}>

                    <View style={styles.UsernameInputContainer}>
                        <Text style={styles.UsernameInputTitle}>Username</Text>
                        <TextInput 
                            style={styles.UsernameTextInput}
                            onChangeText={(text) => handleUsernameTextInput(text)}
                        ></TextInput>
                    </View>

                    <View style={styles.PasswordInputContainer}>
                        <Text style={styles.PasswordInputTitle}>Password</Text>
                        <View style={styles.PasswordTextInputContainer}>
                        
                            <TextInput 
                                style={styles.PasswordTextInput} 
                                secureTextEntry={secureTextEntry}
                                onChangeText={(text) => handlePasswordTextInput(text)}
                            ></TextInput>

                            <TouchableOpacity 
                                style={styles.PasswordTextHideButton}
                                onPress={() => handleHidePasswordButton()}
                            >
                                <Ionicons name={handeHidePasswordButtonIcon()} size={20} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.ForgotPasswordButtonContainer}>
                        <TouchableOpacity>
                            <Text style={{color: 'blue'}}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                
                </ScrollView>

            </Animatable.View>

        </View>
    )
}

const styles = StyleSheet.create({

// Sign in view styles

    ScrollView: {

    },

    SignInViewContainer: {
        flex: 1,
        backgroundColor: '#0EC27D',
    },

    SignInViewHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EC27D',
    },

    SignInViewHeaderTitle: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    SignInViewBackButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    SignInViewHeaderRowContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    SignInViewFooterContainer: {
        flex: 4,
        padding: 10,
        backgroundColor: '#F0F3EA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },

    UsernameInputContainer: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },

    UsernameInputTitle: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
    },

    UsernameTextInput: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 2,
        backgroundColor: '#F0F3EA',
        alignItems: 'center',
        fontSize: 20,
    },

    PasswordInputContainer: {
        height: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },

    PasswordTextInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    PasswordInputTitle: {
        width: '100%',
        fontSize: 20,
        fontWeight: 'bold',
    },

    PasswordTextInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 2,
        backgroundColor: '#F0F3EA',
        alignItems: 'center',
        fontSize: 20,
    },

    PasswordTextHideButton: {
        paddingHorizontal: 10,
    },

    ForgotPasswordButtonContainer: {
        paddingHorizontal: 20,
        alignSelf: 'flex-end',
    },

    ConfirmButtonContainer: {
        flex: 2,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        //backgroundColor: 'blue'
    },

    ConfirmButton: {
        height: 50,
        width: 100,
        // backgroundColor: '#0EC27D',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    ConfirmButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})