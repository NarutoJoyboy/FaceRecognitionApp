import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  const StartCamera = () => {
    setmodalvisible(true);
  };

  return (
    <View style={Styles.container}>
      <View>
        <Text>Hello</Text>
      </View>
      <Button title="Start" onPress={() => navigation.navigate('CameraButton')} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  }
})