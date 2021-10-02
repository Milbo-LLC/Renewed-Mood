import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import Amplify, { Auth, loadingOverlay, Storage } from 'aws-amplify'
import config from './../../aws-exports';
Amplify.configure(config)
// Amplify.configure({
//   Auth: {
//     identityPoolId: 'us-east-1:75a044bc-9363-4291-a855-38213d459dc3',
//     region: 'us-east-1',
//   },
//   Storage: {
//     AWSS3: {
//       bucket: 'bucket150639-dev',
//       region: 'us-east-1',
//     }
//   },
// })

// Upload data to AWS
// Upload to file name: Test/test{UploadCounter Value}.txt
const awsTestUpload = async(uploadCounter, setUploadCounter) => {
  try {
    const location = 'Entries/Test/test' + uploadCounter.toString() + '.txt'
    console.log('In awsTestUpload (Upload Counter): ' + uploadCounter)
    console.log('In awsTestUpload (Location): ' + location)
    const result = await Storage.put(location, 'Example text')
  } catch (error){
    console.log('Error occured.', error)
  }
  setUploadCounter(uploadCounter + 1)
}

// Video Upload
const videoUpload = async(videoUploadCounter, setVideoUploadCounter, videoURI, classificationDictionary) => {
  try {
    const path = 'Entries/Video/video' + videoUploadCounter.toString() + '.txt'
    console.log(typeof videoURI)
    console.log("video URI: ", videoURI)
    const result = await Storage.put(path, videoURI)
  } catch (error) {
    console.log('Error: ', error)
  }
  console.log('HERE RIGHT NOW BOIIIII');
  classificationDictionaryUpload(videoUploadCounter, 'Video', classificationDictionary)
  setVideoUploadCounter(videoUploadCounter + 1)
}

// Audio Upload
const audioUpload = async(audioUploadCounter, setAudioUploadCounter, audioURI, classificationDictionary) => {
  try {
    const path = 'Entries/Audio/audio' + audioUploadCounter.toString() + '.txt'
    console.log(typeof audioURI)
    console.log("Audio URI: ", audioURI)
    const result = await Storage.put(path, audioURI)
  } catch (error) {
    console.log('Error: ', error)
  }
  classificationDictionaryUpload(audioUploadCounter, 'Audio', classificationDictionary)
  setAudioUploadCounter(audioUploadCounter + 1)
}

// Text Upload
const textUpload = async(textUploadCounter, setTextUploadCounter, textEntry, classificationDictionary) => {
  try {
    const path = 'Entries/Text/text' + textUploadCounter.toString() + '.txt'
    const result = await Storage.put(path, textEntry)
  } catch (error) {
    console.log('Error: ', error)
  }
  classificationDictionaryUpload(textUploadCounter,'Text', classificationDictionary)
  setTextUploadCounter(textUploadCounter + 1)
}

const classificationDictionaryUpload = async(uploadCounter, mediaType, classificationDictionary) => {
    
    console.log('In classificationDictionaryUpload function')
    const mediaForName = mediaType.charAt(0).toLowerCase() + mediaType.slice(1)

    try {
        const path = 'Classifications/' + mediaType + '/' + mediaForName + uploadCounter.toString() + '.txt'
        console.log('Path: ', path)
        const result = await Storage.put(path, classificationDictionary)
    } catch (error) {
        console.log('Error: ', error)
    }
}

export default function AWSUpload() {
  const [uploadCounter, setUploadCounter] = useState(0)
  const [videoUploadCounter, setVideoUploadCounter] = useState(0)
  const [textUploadCounter, setTextUploadCounter] = useState(0)
  const [audioUploadCounter, setAudioUploadCounter] = useState(0)
  const [classificationDictionary, setClassificationDictionary] = useState({
    angerRating: 0,
    joyRating: 0,
    trustRating: 0,
    fearRating: 0,
    surpriseRating: 0,
    sadnessRating: 0,
    disgustRating: 0,
    anticipationRating: 0,
    loveRating: 0,
    submissionRating: 0,
    aweRating: 0,
    disappointmentRating: 0,
    remorseRating: 0,
    contemptRating: 0,
    aggressivenessRating: 0,
    optimismRating: 0,
  })
  const [videoURI, setVideoURI] = useState('No Video Present.')
  const [audioURI, setAudioURI] = useState('No Recording Present.')
  const [textEntry, setTetxtEntry] = useState('No Text Entry.')

  return (

    <SafeAreaView style={styles.AppContainer}>
      <TouchableOpacity
        onPress={() => awsTestUpload(uploadCounter, setUploadCounter)}
      >
        <Text>Fucking Press me!</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => videoUpload(videoUploadCounter, setVideoUploadCounter, videoURI, classificationDictionary)}
      >
        <Text>Add Video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => audioUpload(audioUploadCounter, setAudioUploadCounter, audioURI, classificationDictionary)}
      >
        <Text>Add Audio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => textUpload(textUploadCounter, setTextUploadCounter, textEntry, classificationDictionary)}
      >
        <Text>Add Text</Text>
      </TouchableOpacity>
      <Text>{'Test Upload Counter: ', uploadCounter.toString()}</Text>
      <Text>{'Video Upload Counter: ', videoUploadCounter.toString()}</Text>
      <Text>{'Audio Upload Counter: ', audioUploadCounter.toString()}</Text>
      <Text>{'Text Upload Counter: ', textUploadCounter.toString()}</Text>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});