import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert, TextInput, Animated, Modal, Dimensions } from 'react-native';

import Swiper from 'react-native-swiper';

import EntriesView from './EntriesView';
import MediaEntryViews from './MediaEntryViews';

import { Ionicons } from '@expo/vector-icons'; 

export default function MainView( username ) {

    //const [currentHorizontalIndex, setCurrentHorizontalIndex] = useState(1)
    let currentHorizontalIndex = 1
    const horizontalSwiper = useRef(null)
    const [index, setIndex] = useState(1)
    const [entriesButtonColor, setEntriesButtonColor] = useState('white')
    const [mediaButtonColor, setMediaButtonColor] = useState('red')
    const [moodProfileButtonColor, setMoodProfileButtonColor] = useState('white')
    const [swipping, setSwipping] = useState(false)

    const handleHorizontalSwipe = async(index) => {
    
    //   currentHorizontalIndex = index
    //   if(index === 0) {
    //       setEntriesButtonColor('red')
    //       setMediaButtonColor('lightgrey')
    //       setMoodProfileButtonColor('lightgrey')

    //   } else if(index === 1){
    //       setEntriesButtonColor('lightgrey')
    //       setMediaButtonColor('red')
    //       setMoodProfileButtonColor('lightgrey')

    //   } else if(index === 2){
    //       setEntriesButtonColor('lightgrey')
    //       setMediaButtonColor('lightgrey')
    //       setMoodProfileButtonColor('red')

    //   }
    }

    const addBufferView = () => {
      return (
        <View>
          <Text>Hello</Text>
        </View>
      )
    }

    const handleSwippingTracker = (swipping) => {
      if(swipping === true) {
        console.log('Swipping.')
        setSwipping(true)
      } else if(swipping === false) {
        console.log('Stopped swipping.')
        setSwipping(false)
      }
    }

    return (
        <View style={styles.AppContainer}>
        {/* <AWSUpload></AWSUpload> */}
        <View style={styles.SwiperContainer}>
          <Swiper
            containerStyle={styles.HorizontalSwiper}
            ref={horizontalSwiper.current}
            onIndexChanged={(index) => handleHorizontalSwipe(index)}
            index={currentHorizontalIndex}
            loop={false}
            showsPagination={false}
            // onScrollBeginDrag={() => handleSwippingTracker(true)}
            // onMomentumScrollEnd={() => handleSwippingTracker(false)}
            //width={Dimensions.get('window').width}
          >
            <View style={styles.EntriesViewContainer}>
                <EntriesView param={username}></EntriesView>
            </View>
            <View style={styles.VideoEntryViewContainer}>
                <MediaEntryViews param={username}></MediaEntryViews>
            </View>
            <View style={styles.MediaViewContainer}>
              <Text style={styles.text}>Mood Profile</Text>
            </View>


          </Swiper>
          <View style={styles.HorizontalNavBarContainer}>
            <TouchableOpacity
                    style={[styles.HorizontalNavBarButton, {backgroundColor: entriesButtonColor}]}
                >
                    {/* <Text style={{fontSize: 12}}>Entries</Text> */}
                    <Ionicons name="list-circle" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.HorizontalNavBarButton, {backgroundColor: mediaButtonColor}]}

                >
                    {/* <Text style={{fontSize: 12}}>Media</Text> */}
                    <Ionicons name="chatbubble-ellipses-sharp" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.HorizontalNavBarButton, {backgroundColor: moodProfileButtonColor}]}
                >
                    {/* <Text style={{fontSize: 12}}>Profile</Text> */}
                    <Ionicons name="happy" size={30} color="black" />
                </TouchableOpacity>
          </View>
        </View>
      </View>
    )
}


const styles = StyleSheet.create({
    AppContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      //justifyContent: 'center',
    },
    SwiperContainer: {
  
    },
    HorizontalSwiper: {
  
    },
    EntriesViewContainer: {
      flex: 1,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },

    VideoEntryViewContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    MediaViewContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
    },

    HorizontalNavBarContainer: {
        flex: 0.075,
        padding: 7.5,
        //marginBottom: 10,
        // marginBottom: 30,
        //marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        backgroundColor: 'black',
    },

    HorizontalNavBarButton: {
        //flex: 0.2,
        height: 40,
        width: 40,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

  });