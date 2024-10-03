import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './component/Home'
import Cam from './component/camFunction'
import CameraButton from './component/CameraButton'
import PictureTaken from './component/pictureTaken'


const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
        <Stack.Screen name='CameraButton' component={CameraButton}/>
        {/* <Stack.Screen name='PictureTaken' component={PictureTaken} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}