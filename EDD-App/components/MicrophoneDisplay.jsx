import React, { useState, useEffect } from 'react';
import { View, Text, Button, Stylesheet, PermissionsAndroid } from 'react-native';
import { Audio } from 'expo-av';
import useMicrophone from '../hooks/useMicrophone';

const MicrophoneDisplay = () => {
    return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{recording ? 'Recording' : 'Not Recording'}</Text>
        <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
        disabled={recording && soundBites.length >= 10} // limit to 10 sound bites
        />
        <Text>{`Sound Bites: ${soundBites.length}`}</Text>
    </View>
    )
}

export default MicrophoneDisplay;
