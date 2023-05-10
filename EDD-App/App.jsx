
/*This code is a React Native application that displays a grid of cells and a car image that can be moved around the grid. The app has a start/stop button and a set of direction buttons that change a stored direction value. when a direction is selected, an image with filepath ./assets/police.png flashes for three seconds in that corresponding cell? for example, if SE is selected, it flashes in the bottom right cell. this is for react native.*/
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Audio } from 'expo-av';
import logo from "./assets/logo.png";
import car from "./assets/car.png";
import police from "./assets/police.png";
//import useMicrophone from "./hooks/useMicrophone";
import MicrophoneDisplay from "./components/MicrophoneDisplay";
//import MicStream from 'react-native-microphone-stream';

// const listener = MicStream.addListener(data => console.log(data));
// MicStream.init({
//   bufferSize: 4096,
//   sampleRate: 44100,
//   bitsPerChannel: 16,
//   channelsPerFrame: 1,
// });
// MicStream.start();
// ...
// MicStream.stop();
// listener.remove();

function App() {
  const [isDriving, setIsDriving] = useState(false);
  const [direction, setDirection] = useState(null);
  const [flashingCell, setFlashingCell] = useState(null);
  const [recording, setRecording] = useState();

  // async function startRecording() {
  //   try {
  //     console.log('Requesting permissions..');
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });

  //     console.log('Starting recording..');
  //     const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
  //     );
  //     setRecording(recording);
  //     console.log('Recording started');
  //   } catch (err) {
  //     console.error('Failed to start recording', err);
  //   }
  // }

  // async function stopRecording() {
  //   console.log('Stopping recording..');
  //   setRecording(undefined);
  //   await recording.stopAndUnloadAsync();
  //   await Audio.setAudioModeAsync({
  //     allowsRecordingIOS: false,
  //   });
  //   const uri = recording.getURI();
  //   console.log('Recording stopped and stored at', uri);
  // }

  const toggleDriving = () => { 
    setIsDriving(!isDriving);
    //setIsRecording(!isRecording);
    console.log('changing driving state');
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
    setFlashingCell(getFlashingCell(newDirection));
  };

  const getFlashingCell = (direction) => {
    switch (direction) {
      case "N":
        return 1;
      case "NE":
        return 2;
      case "E":
        return 5;
      case "SE":
        return 8;
      case "S":
        return 7;
      case "SW":
        return 6;
      case "W":
        return 3;
      case "NW":
        return 0;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (flashingCell !== null) {
      const timer = setTimeout(() => {
        setFlashingCell(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashingCell]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.buttonText} onPress={toggleDriving} // changed to onPressIn; check because this stopped working
      >
        {isDriving ? "Stop Driving" : "Start Driving"}
      </Text>
      { isDriving && (
        <View style={styles.grid}>
          {[0, 1, 2].map((row) => (
            <View key={row} style={styles.row}>
              {[0, 1, 2].map((col) => (
                <View
                  key={`${row}-${col}`}
                  style={[
                    styles.cell,
                    row === 1 && col === 1 && styles.centerCell,
                    flashingCell === row * 3 + col && styles.flashingCell,
                  ]}
                >
                  {row === 1 && col === 1 && (
                    <Image source={car} style={styles.car} />
                  )}
                  {flashingCell === row * 3 + col && (
                    <Image source={police} style={[styles.police, { width: 60, height: 60 }]} />
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
      {isDriving && (
        <View style={styles.directionButtons}>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("N")}
          >
            <Text style={styles.directionButtonText}>N</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("NE")}
          >
            <Text style={styles.directionButtonText}>NE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("E")}
          >
            <Text style={styles.directionButtonText}>E</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("SE")}
          >
            <Text style={styles.directionButtonText}>SE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("S")}
          >
            <Text style={styles.directionButtonText}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("SW")}
          >
            <Text style={styles.directionButtonText}>SW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("W")}
          >
            <Text style={styles.directionButtonText}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.directionButton}
            onPress={() => handleDirectionChange("NW")}
          >
            <Text style={styles.directionButtonText}>NW</Text>
          </TouchableOpacity>
          <MicrophoneDisplay />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  grid: {
    width: 300,
    height: 300,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  flashingCell: {
    backgroundColor: "red",
  },
  car: {
    width: 90,
    height: 50,
    transform: [{ rotate: "-90deg" }]
  },
  police: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  directionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  directionButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  directionButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 20,
    color: "#841584",
    margin: 10,
  },
});

export default App;