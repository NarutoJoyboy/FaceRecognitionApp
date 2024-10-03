import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import PictureTaken from './pictureTaken';
import RNFS from 'react-native-fs';
import {markAttendance} from './FaceRecognization';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function Cam() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const device = useCameraDevice('front');
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [picTaken, setPicTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendanceMessage, setAttendanceMessage] = useState(''); // Message to show if attendance is marked

  const navigation = useNavigation();

  useEffect(() => {
    const requestPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
      if (permission === 'denied') {
        Alert.alert(
          'Camera Permission',
          'Camera permission is required to use this app.',
        );
      }
    };

    requestPermission();
  }, []);

  if (cameraPermission === 'denied') {
    return (
      <Text>Camera permission is denied. Please enable it in settings.</Text>
    );
  }

  const TakePhoto = async () => {
    setLoading(true);
    const photo = await cameraRef.current.takePhoto();

    // Save image to a temporary directory using react-native-fs
    const imageUri = `file://${photo.path}`;
    const destinationPath = `file://${RNFS.TemporaryDirectoryPath}/photo.jpg`;
    // await RNFS.copyFile(imageUri, destinationPath); // Save photo to temp directory

    setPhoto(destinationPath); // Save the photo URI to state
    setPicTaken(true)

    // navigation.navigate('PictureTaken', { imageUri: destinationPath, picTaken: true })

    try {
      const result = await markAttendance(destinationPath); // Call the face recognition function
      if (result) {
        setAttendanceMessage('Attendance marked successfully.');
      } else {
        setAttendanceMessage('Face not recognized.');
      }
    } catch (error) {
      console.log('Error in face recognition:', error);
    }

    setLoading(false);
  };

  const LoadingSHown = () => {
    return (
      <View
        style={{
          backgroundColor: 'black',
          opacity: 0.8,
          width: width,
          height: height,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={60} color="white" />
      </View>
    );
  };

  return (
    <View>
      <Camera
        style={{width: width, height: height}}
        device={device}
        isActive={true}
        ref={cameraRef}
        photo={true}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 50,
          borderWidth: 5,
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: 'white',
          alignSelf: 'center',
          flex: 1,
        }}
        onPress={TakePhoto}></TouchableOpacity>
      {loading && <LoadingSHown />}
      {picTaken === true && (
        <PictureTaken
          photo={photo}
          setPicTaken={() => {
            setPicTaken(false);
          }}
          picTaken={picTaken}
        />
      )}
      {attendanceMessage ? (
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            fontSize: 20,
            color: 'white',
          }}>
          {attendanceMessage}
        </Text>
      ) : null}
    </View>
  );
}
