import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, PermissionsAndroid } from 'react-native';
import { Audio } from 'expo-av';

const SOUND_BITE_LENGTH = 3000; // in milliseconds

const useMicrophone = () => {
  const [recording, setRecording] = useState(false);
  const [soundBites, setSoundBites] = useState([]);

  useEffect(() => {
    requestMicrophonePermission();
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Driving Aid',
          message: 'This app needs access to your microphone.',
          buttonNegative: 'Don\'t Allow',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startRecording = async () => {
    const filePath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    try {
      await AudioRecorder.prepareRecordingAtPath(filePath, {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        AudioEncodingBitRate: 32000,
      });
      setRecording(true);
      await AudioRecorder.startRecording();
      console.log('Recording started');
    } catch (err) {
      console.warn(err);
    }
  }; 

  const stopRecording = async () => {
    try {
      await AudioRecorder.stopRecording();
      console.log('Recording stopped');
      setRecording(false);
      saveSoundBite();
    } catch (err) {
      console.warn(err);
    }
  };

  const saveSoundBite = async () => {
    const filePath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    try {
      const fileInfo = await AudioRecorder.getInfo();
      const duration = fileInfo.duration;
      const soundBite = {
        filePath: filePath,
        duration: duration,
      };
      setSoundBites((prevSoundBites) => [...prevSoundBites, soundBite]);
      console.log('Sound bite saved');
    } catch (err) {
      console.warn(err);
    }

    setTimeout(() => {
      if (recording) {
        stopRecording();
        startRecording();
      }
    }, SOUND_BITE_LENGTH);
  };

  // return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>{recording ? 'Recording' : 'Not Recording'}</Text>
    //   <Button
    //     title={recording ? 'Stop Recording' : 'Start Recording'}
    //     onPress={recording ? stopRecording : startRecording}
    //     disabled={recording && soundBites.length >= 10} // limit to 10 sound bites
    //   />
    //   <Text>{`Sound Bites: ${soundBites.length}`}</Text>
    // </View>
  // );
  return {startRecording, stopRecording}; // returns the most important functions
};

export default useMicrophone;
