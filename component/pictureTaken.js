import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('screen');
export default function PictureTaken({photo, setPicTaken, picTaken}) {
  // const navigation = useNavigation();
  // const route = useRoute();
  // const {imageUri, picTaken} = route.params
  // console.log("........................./////")
  // console.log(imageUri,"...................................1")



// const checkIfImageExists = async (imageUri) => {
//   const fileExists = await RNFS.exists(imageUri);
//   if (!fileExists) {
//     console.log('Image does not exist:', imageUri);
//   } else {
//     console.log('Image exists:', imageUri);
//   }
// };

//   useEffect(() => {
//     checkIfImageExists(imageUri);
//   }, [imageUri]);

  return (
    <Modal visible={picTaken} >
    <View style={{backgroundColor: 'black', flex: 1}}>
      <Image source={{ uri: photo }}
          style={{ width: width, height: height }}
          resizeMode="contain"  />
      <TouchableOpacity
      activeOpacity={0.6}
      onPress={setPicTaken}
        style={{
          backgroundColor: 'white',
          width: 40,
          alignItems: 'center',
          borderRadius: 20,
          height: 40,
          alignContent: 'center',
          justifyContent:'center',
          margin:20,
          position:"absolute",
        }}>
        <FontAwesome6 name="arrow-left" size={27} color={'black'} />
      </TouchableOpacity>
    </View>
    </Modal>
  );
}
