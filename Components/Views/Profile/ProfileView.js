import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, Touchable, Platform, Image, KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify';

import { Ionicons, Feather } from '@expo/vector-icons';
import moment from 'moment';

export default function ProfileView() {

    const navigation = useNavigation();

    const [signOutButtonScale, setSignOutButtonScale] = useState(1)

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [gender, setGender] = useState('')
    const [bio, setBio] = useState('')

    const handleSignOutButtonPressIn = () => {
        setSignOutButtonScale(0.9)
        
    }

    const handleSignOutButtonPressOut = () => {
        setSignOutButtonScale(1)
        handleSignOut()
    }

    const handleSignOut = async() => {
        try {
            await Auth.signOut();
            console.log('Successfully signed out.');
        } catch (error) {
            console.log('error signing out: ', error);
        }
        navigation.navigate('LoginLandingView')
    }

    const handleBackButton = () => {
        navigation.goBack()
    }

    Auth.currentUserInfo().then((userInfo) => {
        const firstName = userInfo.attributes.name
        const lastName = userInfo.attributes.family_name
        const name = `${firstName} ${lastName}`
        setName(name)
        setUsername(userInfo.username)
        setEmail(userInfo.attributes.email)
        const phoneDigits = userInfo.attributes.phone_number.split('+').pop()
        const phoneNumberFormatted = `(${phoneDigits.substring(0,3)})${phoneDigits.substring(3,6)}-${phoneDigits.substring(6,10)}`
        console.log('phoneNumberFormatted: ', phoneNumberFormatted)
        setPhoneNumber(phoneNumberFormatted)
        setBirthdate(userInfo.attributes.birthdate)
        const genderFormatted = userInfo.attributes.gender.charAt(0).toUpperCase() + userInfo.attributes.gender.slice(1)
        setGender(genderFormatted)
    })

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.ProfileViewContainer}>  
                <View style={styles.ProfileViewHeaderContainer}>

                    <TouchableOpacity
                        style={styles.ProfileViewBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                        {/* <Text style={{fontSize: 20}}>Back</Text> */}
                    </TouchableOpacity>
                    <Text style={styles.ProfileViewHeaderText}>Profile</Text>
                    <TouchableOpacity
                        style={styles.ProfileViewEditButton}
                        onPress={() => handleEditButton()}
                    >
                        <Feather name="edit" size={33} color="black" />
                    </TouchableOpacity>

                </View>

                <ScrollView style={{flex: 1}}>

                    <View style={styles.ProfilePhotoContainer}>
                        <View style={styles.ProfilePhoto}>
                            <Image
                                style={styles.UserIconImage}
                                source={require('./../../../Images/user-icon-initial.png')}
                            ></Image>
                        </View>
                        <TouchableOpacity
                            style={styles.UpdateProfilePhotoButton}
                        >
                            <Text style={styles.UpdateProfilePhotoButtonText}>Update Profile Photo</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ProfileInfoContainer}>
                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Name</Text>
                            <Text style={styles.ProfileInfoItemValue}>{name}</Text>
                        </View>

                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Username</Text>
                            <Text style={styles.ProfileInfoItemValue}>{username}</Text>
                        </View>

                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Email</Text>   
                            <Text style={styles.ProfileInfoItemValue}>{email}</Text>
                        </View>

                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Phone Number</Text>  
                            <Text style={styles.ProfileInfoItemValue}>{phoneNumber}</Text>
                        </View>

                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Birthdate</Text>
                            <Text style={styles.ProfileInfoItemValue}>{birthdate}</Text>
                        </View>

                        <View style={styles.ProfileInfoItemContainer}>
                            <Text style={styles.ProfileInfoItemTitle}>Gender</Text>
                            <Text style={styles.ProfileInfoItemValue}>{gender}</Text> 
                        </View>

                        <View style={[styles.ProfileInfoItemContainer, {borderBottomWidth: 2}]}>
                            <Text style={styles.ProfileInfoItemTitle}>Bio</Text>
                        </View>

                        
                    </View>

                    <View style={styles.SignOutButtonContainer}>
                        <TouchableWithoutFeedback
                            onPressIn={() => handleSignOutButtonPressIn()}
                            onPressOut={() => handleSignOutButtonPressOut()}
                        >
                            <View style={[styles.SignOutButton, {transform: [{scale: signOutButtonScale}]}]}>
                                <Text style={styles.SignOutButtonText}>Sign out</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ProfileViewContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },

    ProfileViewHeaderContainer: {
        // flex: 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'blue'
    },

    ProfileViewBackButton: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },

    ProfileViewHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    ProfileViewEditButton: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },

    ProfilePhotoContainer: {
        // flex: 0.5,
        marginTop: 10,
        backgroundColor: '#0EC27D',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },

    ProfilePhoto: {
        padding: 20,
        // alignItems: 'center',
    },

    UserIconImage: {
        height: 125,
        width: 125,
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: 'white',
    },

    UpdateProfilePhotoButton: {
        paddingBottom: 20,
    },

    UpdateProfilePhotoButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'blue',
    },

    ProfileInfoContainer: {
        // backgroundColor: 'red',
    },

    ProfileInfoItemContainer: {
        // backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        borderTopWidth: 2,
    },

    ProfileInfoItemTitle: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },

    ProfileInfoItemValue: {
        flex: 2,
        fontSize: 18,
        
    },

    SignOutButtonContainer: {
        // backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },

    SignOutButton: {
        backgroundColor: '#0EC27D',
        borderWidth: 2,
        borderRadius: 50,
        margin: 20,
        padding: 10,
    },

    SignOutButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

})

