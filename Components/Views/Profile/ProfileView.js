import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, Touchable, Platform, Image, KeyboardAvoidingView } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify';

export default function ProfileView() {

    const navigation = useNavigation();

    const handleSignOut = async() => {
        try {
            await Auth.signOut();
            console.log('Successfully signed out.');
        } catch (error) {
            console.log('error signing out: ', error);
        }
        navigation.navigate('LoginLandingView')
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.ProfileViewContainer}>
                <TouchableOpacity
                    style={styles.signOutButton}
                    onPress={() => handleSignOut()}
                >
                    <Text>Sign out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ProfileViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

