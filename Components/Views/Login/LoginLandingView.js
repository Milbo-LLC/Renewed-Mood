import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, Touchable, Platform, Image, KeyboardAvoidingView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { Auth } from 'aws-amplify';

import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';

export default function LoginLandingView({ navigation }) {

    const [titleColor, SetTitleColor] = useState('#F0F3EA')
    const [titleAnimation, setTitleAnimation] = useState('bounceIn')
    const animationsList = ['bounce', 'flash', 'jello', 'pulse', 'rotate', 'rubberBand', 'shake', 'swing', 'tada', 'wobble']

    const handleSignIn = () => {
        console.log('Sign in button clicked.')
        navigation.navigate('SignInView')
    }

    const handleSignUp = () => {
        console.log('Sign up button clicked.')
        navigation.navigate('SignUpView')
    }

    const handleTitlePress = () => {
        if(titleColor === '#F0F3EA'){
            SetTitleColor('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
        } else {
            SetTitleColor('#F0F3EA')
        }
        let animation = titleAnimation
        while(animation === titleAnimation)
            animation = animationsList[Math.floor(Math.random() * (animationsList.length-1))]
        setTitleAnimation(animation)
    }

    return(
    
        <View style={styles.LoginLandingViewContainer}>

            <View style={styles.LoginLandingViewHeaderContainer}>

                <TouchableWithoutFeedback
                    onPress={() => handleTitlePress()}
                >
                    <Animatable.Image 
                        style={{height: 200, width: 200, backgroundColor: titleColor, borderRadius: 100}} animation={titleAnimation}
                        source={require('./../../../Images/logo.png')}
                    >
                    </Animatable.Image>
                    {/* <Animatable.Text style={{fontSize: 40, fontWeight: 'bold', color: titleColor}} animation={titleAnimation}>Renewed Mood</Animatable.Text> */}
                </TouchableWithoutFeedback>
            </View>

            <Animatable.View style={styles.LoginLandingViewFooterContainer} animation='slideInUp'>

                <Text style={styles.LoginLandingViewFooterMessage}>Sign in or sign up and start renewing your mood today!</Text>
                
                <View style={styles.LoginLandingViewFooterContent}>

                    <View style={styles.LoginLandingViewFooterUserIcon}>

                        <Image
                            style={styles.UserIconImage}
                            source={require('../../../Images/user-icon-initial.png')}
                        ></Image>

                    </View>
                
                    <View style={styles.LoginLandingViewFooterButtons}>
                    
                        <TouchableOpacity
                            style={styles.SignInButton}
                            onPress={() => handleSignIn()}
                        >
                            <Text style={styles.SignInButtonText}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.SignUpButton}
                            onPress={() => handleSignUp()}
                        >
                            <Text style={styles.SignUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Animatable.View>

        </View>

    )
}

const styles = StyleSheet.create({

    LoginLandingViewContainer: {
        flex: 1,
        backgroundColor: '#0EC27D',
    },

    LoginLandingViewHeaderContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EC27D',
        
    },

    LoginLandingViewFooterContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        backgroundColor: '#F0F3EA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },

    LoginLandingViewFooterMessage: {
        paddingHorizontal: 20,
        paddingTop: 20,
        fontSize: 18,
        fontWeight: 'bold',

    },

    LoginLandingViewFooterContent: {
        flex: 1,
        flexDirection: 'row',
        //backgroundColor: 'blue',
    },

    LoginLandingViewFooterUserIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },

    UserIconImage: {
        height: 100,
        width: 100,
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: 'white',
    },

    LoginLandingViewFooterButtons: {
        flex: 1, 
        //backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },

    SignInButton: {
        //alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0EC27D',
        borderRadius: 20,
        borderWidth: 2,
        width: '62%',
        height: '15%',
    },

    SignInButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    SignUpButton: {
        //alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        paddingHorizontal: 20,
        backgroundColor: '#0EC27D',
        borderRadius: 20,
        borderWidth: 2,
        width: '62%',
        height: '15%',
    },

    SignUpButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})  
