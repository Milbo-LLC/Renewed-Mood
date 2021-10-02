import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// AWS Amplify initalization
import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

// Import libraries for Redux
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './Components/Redux/store';

// Import libraries for screen navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import library for animations
import * as Animatable from 'react-native-animatable'

// Import library for AsyncStorage (Used for data persistence)
import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageGet from './Components/AsyncStorage/AsyncStorageGet';

// Import Login Views
import LoginLandingView from './Components/Views/Login/LoginLandingView';
import SignInView from './Components/Views/Login/SignInView';
import SignUpView from './Components/Views/Login/SignUpView';

// Import AWSUpload View
import AWSUpload from './Components/AWS/AWSUpload';

// Import Main View
import MainView from './Components/Views/MainView';

// Import Entries View
import EntriesView from './Components/Views/EntriesView'

// Import Media Entry Views
import AudioEntryView from './Components/Views/Audio/audioEntryView';
import VideoEntryView from './Components/Views/Video/VideoEntryView';
import TextEntryView from './Components/Views/Text/textEntryView';

// Import Media Item Views
import AudioEntryItemExpanded from './Components/Views/Audio/AudioEntryItemExpanded';
import VideoEntryItemExpanded from './Components/Views/Video/VideoEntryItemExpanded';
import TextEntryItemExpanded from './Components/Views/Text/TextEntryItemExpanded';

// Import Profile View
import ProfileView from './Components/Views/Profile/ProfileView';

// Import Classification View
import MoodClassificationView from './Components/Views/Classification/MoodClassificationView';
import EmotionClassificationSelectionView from './Components/Views/Classification/EmotionClassificationSelectionView';
import EmotionClassificationView from './Components/Views/Classification/EmotionClassificationView';
import AngerClassificationView from './Components/Views/Classification/AngerClassificationView';
import AnticipationClassificationView from './Components/Views/Classification/AnticipationClassificationView';
import DisgustClassificationView from './Components/Views/Classification/DisgustClassificationView';
import FearClassificationView from './Components/Views/Classification/FearClassificationView';
import JoyClassificationView from './Components/Views/Classification/JoyClassificationView';
import SadnessClassificationView from './Components/Views/Classification/SadnessClassificationView';
import SurpriseClassificationView from './Components/Views/Classification/SurpriseClassificationView';
import TrustClassificationView from './Components/Views/Classification/TrustClassificationView';

const Stack = createNativeStackNavigator();

export default function App() {

    // const [dataPersisted, setDataPersisted] = useState({})
    // const importData = async() => {
    //     // AsyncStorage.clear()
    //     try {
    //         const keys = await AsyncStorage.getAllKeys();
    //         console.log('AsyncStorage Keys: ', keys)
    //         if(keys.split('/')[0] === 'Entries'){
    //             console.log('AsyncStorage Keys: ', keys)
    //         }
    //         const data = await AsyncStorage.multiGet(keys)
    //         // console.log('AsyncStorage Data: ', data)
    //         return data
    //     } catch (error) {
    //         console.log('Error importing data from AsyncStorage: ', error)
    //     }
    // }

    // useEffect(() => {
    //     // const dataPersisted = importData()
    //     console.log('IN useEffect.')
    //     setDataPersisted(importData())
    // }, [])

    // async() => console.log('ASYNC STORAGE: ', await AsyncStorage.getAllKeys())
    // console.log('Data Persisted: ', dataPersisted)



    return (
        <Provider store={store}>
            <StatusBar barStyle="dark-content" />
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginLandingView" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="LoginLandingView" component={LoginLandingView} />
                    <Stack.Screen name="SignInView" component={SignInView} />
                    <Stack.Screen name="SignUpView" component={SignUpView} />
                    <Stack.Screen name="AWSUpload" component={AWSUpload} />
                    <Stack.Screen name="MainView" component={MainView} />
                    <Stack.Screen name="AudioEntryView" component={AudioEntryView} />
                    <Stack.Screen name="VideoEntryView" component={VideoEntryView} />
                    <Stack.Screen name="TextEntryView" component={TextEntryView} />
                    <Stack.Screen name="EntriesView" component={EntriesView} />
                    <Stack.Screen name="ProfileView" component={ProfileView} />
                    <Stack.Screen name="MoodClassificationView" component={MoodClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="EmotionClassificationSelectionView" component={EmotionClassificationSelectionView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="EmotionClassificationView" component={EmotionClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="AngerClassificationView" component={AngerClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="AnticipationClassificationView" component={AnticipationClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="DisgustClassificationView" component={DisgustClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="FearClassificationView" component={FearClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="JoyClassificationView" component={JoyClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="SadnessClassificationView" component={SadnessClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="SurpriseClassificationView" component={SurpriseClassificationView} options={{gestureEnabled: false}} />
                    <Stack.Screen name="TrustClassificationView" component={TrustClassificationView} options={{gestureEnabled: false}} />

                    <Stack.Screen name="AudioEntryItemExpanded" component={AudioEntryItemExpanded} />
                    <Stack.Screen name="VideoEntryItemExpanded" component={VideoEntryItemExpanded} />
                    <Stack.Screen name="TextEntryItemExpanded" component={TextEntryItemExpanded} />
                    
                    <Stack.Screen name="AsyncStorageGet" component={AsyncStorageGet} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
  );
}

const styles = StyleSheet.create({

});
