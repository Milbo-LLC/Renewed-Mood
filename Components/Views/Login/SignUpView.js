import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, Button, TouchableOpacity, View, TouchableWithoutFeedback, ScrollView, Touchable, Platform, Image, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

import { Auth } from 'aws-amplify';

import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons';

import { Ionicons } from '@expo/vector-icons';

import Moment from 'moment';

export default function SignUpView({ navigation }) {

    const [secureTextEntry, setSecureTextEntry] = useState(true)
    
    const [name, setname] = useState('')
    const [family_name, setFamily_Name] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phone_number, setPhone_Number] = useState('')
    const [authenticationCode, setAuthenticationCode] = useState('')
    const [gender, setGender] = useState(undefined)
    const [date, setDate] = useState(new Date())
    const [birthdate, setBirthdate] = useState('')

    const [maleButtonScale, setMaleButtonScale] = useState(1)
    const [femaleButtonScale, setFemaleButtonScale] = useState(1)
    const [nonbinaryButtonScale, setNonbinaryButtonScale] = useState(1)
    const [ratherNotSayButtonScale, setRatherNotSayButtonScale] = useState(1)
    const [maleButtonColor, setMaleButtonColor] = useState('lightgrey')
    const [femaleButtonColor, setFemaleButtonColor] = useState('lightgrey')
    const [nonbinaryButtonColor, setNonbinaryButtonColor] = useState('lightgrey')
    const [ratherNotSayButtonColor, setRatherNotSayButtonColor] = useState('lightgrey')

    const [signUpStage, setSignUpStage] = useState(0)

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

    const handleTextInput = (text, input) => {
        console.log('Birthdate: ', birthdate)
        if(input === 'name') {
            setname(text)
            console.log('name: ', name)
        } else if(input === 'family_name') {
            setFamily_Name(text)
            console.log('family_name: ', family_name)
        } else if(input === 'username') {
            setUsername(text)
            // console.log('username: ', username)
        } else if(input === 'email') {
            setEmail(text)
            console.log('email: ', email)
        } else if(input === 'phonenumber') {
            setPhone_Number('+' + text)
        } else if(input === 'password') {
            setPassword(text)
            console.log('password: ', password)
        } else if(input === 'authenticationcode') {
            setAuthenticationCode(text)
            console.log('authenticationcode: ', authenticationCode)
        }
    }

    const handleAWSSignUp = async() => {
        if(signUpStage === 0) {
            setSignUpStage(1)
        } else {
            try {
                const { user } = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        birthdate,
                        email,
                        family_name,
                        gender,
                        name,
                        phone_number,
                    }
                })
                console.log('User successfully signed up: ', user)
                setSignUpStage(2)
            } catch (error) {
                console.log('Error signing up: ', error)
            }
        }
    }

    const confirmSignUp = async () => {
        try {
            const { user } = await Auth.confirmSignUp(username, authenticationCode)
            console.log('User successfully confirmed sign up: ', user)
            navigation.navigate('LoginLandingView')
        } catch (error) {
            console.log('Error confirming sign up: ', error)
        }
    }

    const handleButtonPressIn = (gender) => {
        if(gender === 'male'){
            setMaleButtonScale(0.9)
        } else if(gender === 'female'){
            setFemaleButtonScale(0.9)
        } else if(gender === 'non-binary'){
            setNonbinaryButtonScale(0.9)
        }
        else {
            setRatherNotSayButtonScale(0.9)
        }
    }

    const handleButtonPressOut = (gender) => {
        if(gender === 'male'){
            setMaleButtonScale(1)
            if(maleButtonColor === 'lightgrey'){
                setMaleButtonColor('#0EC27D')
                setFemaleButtonColor('lightgrey')
                setNonbinaryButtonColor('lightgrey')
                setRatherNotSayButtonColor('lightgrey')
                setGender('male')
            } else {
                setMaleButtonColor('lightgrey')
                setGender('undefined')
            }
        } else if(gender === 'female'){
            setFemaleButtonScale(1)
            if(femaleButtonColor === 'lightgrey'){
                setFemaleButtonColor('#0EC27D')
                setMaleButtonColor('lightgrey')
                setNonbinaryButtonColor('lightgrey')
                setRatherNotSayButtonColor('lightgrey')
                setGender('female')
            } else {
                setFemaleButtonColor('lightgrey')
                setGender('undefined')
            }
        } else if(gender === 'non-binary'){
            setNonbinaryButtonScale(1)
            if(nonbinaryButtonColor === 'lightgrey'){
                setNonbinaryButtonColor('#0EC27D')
                setFemaleButtonColor('lightgrey')
                setMaleButtonColor('lightgrey')
                setRatherNotSayButtonColor('lightgrey')
                setGender('non-binary')
            } else {
                setNonbinaryButtonColor('lightgrey')
                setGender('undefined')
            }
        }  else {
            setRatherNotSayButtonScale(1)
            if(ratherNotSayButtonColor === 'lightgrey'){
                setRatherNotSayButtonColor('#0EC27D')
                setNonbinaryButtonColor('lightgrey')
                setMaleButtonColor('lightgrey')
                setFemaleButtonColor('lightgrey')
                setGender('rather-not-say')
            } else {
                setRatherNotSayButtonColor('lightgrey')
                setGender('undefined')
            }
        }
    }

    const handleDate = (event, value) => {
        setDate(value)
        const date = Moment(value).format('YYYY-MM-DD').toString()
        console.log(date)
        setBirthdate(date)
    }

    if(signUpStage === 0) {
        
        return(

            <View style={styles.SignUpViewContainer}>

                <SafeAreaView style={styles.SignUpViewHeaderContainer}>

                    <TouchableOpacity
                        style={styles.SignUpViewBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                        {/* <Text style={{fontSize: 20}}>Back</Text> */}
                    </TouchableOpacity>

                    <View style={styles.SignUpViewHeaderRowContent}>
                    
                        <Text style={styles.SingUpViewHeaderTitle}>Sign Up!</Text>

                        <TouchableOpacity
                            style={styles.ConfirmButton}
                            onPress={() => handleAWSSignUp()}
                        >
                            <Text style={styles.ConfirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                
                <Animatable.View style={styles.SignUpViewFooterContainer} animation='slideInUp'>

                    <ScrollView style={styles.SignUpScrollView}>


                        {/* First Name Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>First Name</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'name')}
                                value={name}
                            ></TextInput>
                        </View>

                        {/* Last Name Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Last Name</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'family_name')}
                                value={family_name}
                            ></TextInput>
                        </View>
                        
                        {/* Birthdate Input */}
                        <View>
                            {/* <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handlenameTextInput(text)}
                            ></TextInput> */}
                            <Text style={styles.SignUpInputText}>Birthdate</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                onChange={handleDate}
                                mode='date'
                                display="spinner"
                            ></DateTimePicker>
                        </View>

                        {/* Gender Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Gender</Text>
                            <View style={styles.genderButtonsContainer}>

                                <TouchableWithoutFeedback
                                    onPressIn={() => handleButtonPressIn('male')}
                                    onPressOut={() => handleButtonPressOut('male')}
                                >
                                    <View
                                        style={[styles.genderButton, { transform: [{scale: maleButtonScale}], backgroundColor: maleButtonColor }]}
                                    >
                                        <Text style={styles.genderButtonText}>Male</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                
                                <TouchableWithoutFeedback
                                    onPressIn={() => handleButtonPressIn('female')}
                                    onPressOut={() => handleButtonPressOut('female')}
                                >
                                    <View
                                        style={[styles.genderButton, { transform: [{scale: femaleButtonScale}], backgroundColor: femaleButtonColor  }]}
                                    >
                                        <Text style={styles.genderButtonText}>Female</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            <View style={styles.genderButtonsContainer}>
                                <TouchableWithoutFeedback
                                    onPressIn={() => handleButtonPressIn('non-binary')}
                                    onPressOut={() => handleButtonPressOut('non-binary')}
                                >
                                    <View
                                        style={[styles.genderButton, { transform: [{scale: nonbinaryButtonScale}], backgroundColor: nonbinaryButtonColor  }]}
                                    >
                                        <Text style={styles.genderButtonText}>Non-binary</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    onPressIn={() => handleButtonPressIn('rather-not-say')}
                                    onPressOut={() => handleButtonPressOut('rather-not-say')}
                                >
                                    <View
                                        style={[styles.genderButton, { transform: [{scale: ratherNotSayButtonScale}], backgroundColor: ratherNotSayButtonColor  }]}
                                    >
                                        <Text style={styles.genderButtonText}>Rather not say</Text>
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </View>



                        {/* Username Input */}
                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Username</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleUsernameTextInput(text)}
                            ></TextInput>
                        </View> */}

                        {/* Email Input */}
                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Email</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleEmailTextInput(text)}
                            ></TextInput>
                        </View> */}

                        {/* Password Input */}
                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Password</Text>
                            <View style={styles.PasswordTextInputContainer}>
                                <TextInput 
                                    style={styles.SignUpInputTextInput} 
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
                        </View> */}

                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Email</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleEmailTextInput(text)}
                            ></TextInput>
                        </View> */}

                        {/* Phone Number Input */}
                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Phone Number</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handlePhoneNumberTextInput(text)}
                            ></TextInput>
                        </View> */}
                    </ScrollView>

                </Animatable.View>

            </View>
        )
    } else if (signUpStage === 1) {
        return(

            <View style={styles.SignUpViewContainer}>

                <SafeAreaView style={styles.SignUpViewHeaderContainer}>

                    <TouchableOpacity
                        style={styles.SignUpViewBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                        {/* <Text style={{fontSize: 20}}>Back</Text> */}
                    </TouchableOpacity>

                    <View style={styles.SignUpViewHeaderRowContent}>
                    
                        <Text style={styles.SingUpViewHeaderTitle}>Sign Up!</Text>

                        <TouchableOpacity
                            style={styles.ConfirmButton}
                            onPress={() => handleAWSSignUp()}
                        >
                            <Text style={styles.ConfirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                
                <Animatable.View style={styles.SignUpViewFooterContainer} animation='slideInUp'>

                    <ScrollView style={styles.SignUpScrollView}>

                        {/* Username Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Username</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'username')}
                                value={username}
                            ></TextInput>
                        </View>

                        {/* Email Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Email</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'email')}
                                value={email}
                            ></TextInput>
                        </View>

                        {/* Phone Number Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Phone Number</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'phonenumber')}
                                // value={phone_number}
                            ></TextInput>
                        </View>

                        {/* Password Input */}
                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Password</Text>
                            <View style={styles.PasswordTextInputContainer}>
                                <TextInput 
                                    style={styles.SignUpInputTextInput} 
                                    secureTextEntry={secureTextEntry}
                                    onChangeText={(text) => handleTextInput(text, 'password')}
                                    value={password}
                                ></TextInput> 
                                <TouchableOpacity 
                                    style={styles.PasswordTextHideButton}
                                    onPress={() => handleHidePasswordButton()}
                                >
                                    <Ionicons name={handeHidePasswordButtonIcon()} size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Email</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleEmailTextInput(text)}
                            ></TextInput>
                        </View> */}

                        {/* Phone Number Input */}
                        {/* <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Phone Number</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handlePhoneNumberTextInput(text)}
                            ></TextInput>
                        </View> */}
                    </ScrollView>

                </Animatable.View>

            </View>
        )
    } else if (signUpStage === 2) {
        return(

            <View style={styles.SignUpViewContainer}>

                <SafeAreaView style={styles.SignUpViewHeaderContainer}>

                    <TouchableOpacity
                        style={styles.SignUpViewBackButton}
                        onPress={() => handleBackButton()}
                    >
                        <Ionicons name={ Platform.OS === 'ios' ? "chevron-back-circle-sharp" : 'md-chevron-back'} size={40} color="black" />
                        {/* <Text style={{fontSize: 20}}>Back</Text> */}
                    </TouchableOpacity>

                    <View style={styles.SignUpViewHeaderRowContent}>
                    
                        <Text style={styles.SingUpViewHeaderTitle}>Sign Up!</Text>

                        <TouchableOpacity
                            style={styles.ConfirmButton}
                            onPress={() => confirmSignUp()}
                        >
                            <Text style={styles.ConfirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
                
                <Animatable.View style={styles.SignUpViewFooterContainer} animation='slideInUp'>

                    <ScrollView style={styles.SignUpScrollView}>

                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Email</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'email')}
                                value={email}
                            ></TextInput>
                        </View>

                        <View style={styles.SignUpInputContainer}>
                            <Text style={styles.SignUpInputText}>Authentication Code</Text>
                            <TextInput 
                                style={styles.SignUpInputTextInput}
                                onChangeText={(text) => handleTextInput(text, 'authenticationcode')}
                            ></TextInput>
                        </View>

                    </ScrollView>

                </Animatable.View>

            </View>
        )
    }
}

const styles = StyleSheet.create({

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

// Sign up view styles

    ScrollView: {

    },

    SignUpViewContainer: {
        flex: 1,
        backgroundColor: '#0EC27D',
    },

    SignUpViewHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0EC27D',
    },

    SingUpViewHeaderTitle: {
        fontSize: 40,
        fontWeight: 'bold',
    },

    SignUpViewBackButton: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },

    SignUpViewHeaderRowContent: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    SignUpViewFooterContainer: {
        flex: 6,
        padding: 10,
        backgroundColor: '#F0F3EA',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    },

    SignUpScrollView: {
        padding: 10,
        height: '60%',
        //backgroundColor: 'yellow'
    },

    SignUpInputContainer: {
        //paddingVertical: 5,
    },

    SignUpInputText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingTop: 10,
    },

    SignUpInputTextInput: {
        flex: 1,
        fontSize: 20,
        borderBottomWidth: 2,
        padding: 5,
        marginHorizontal: 10,
    },

    genderButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 20,
        // backgroundColor: 'grey',
    },

    genderButton: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 10,
        backgroundColor: 'lightgrey'
    },

    genderButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

})