import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Cam from './camFunction';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

export default function CameraButton() {
  const navigation = useNavigation();
  return (
    <View>
      <Cam />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}>
        <AntDesign name="close" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    left: 20,
    top: 20,
    elevation: 10,
  },
});
