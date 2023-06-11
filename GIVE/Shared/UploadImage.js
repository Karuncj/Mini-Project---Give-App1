import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SellForm from '../Shared/SellForm';

const UploadImage = ({ categoryName }) => {
  const [imageUri, setImageUri] = useState(null);

  const pickImageAsync = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.error) {
        console.error('Error selecting image:', response.error);
      } else {
        const { uri } = response;
        setImageUri(uri);
      }
    });
  };

  const ImagePickerIcon = require('../assets/ImageUploadIcon.png');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Include some details</Text>
      <Pressable onPress={pickImageAsync}>
        <Image source={ImagePickerIcon} style={styles.icon} />
      </Pressable>
      <Text style={styles.text}>Upload Image</Text>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
      <SellForm categoryName={categoryName} imageUri={imageUri} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginRight: 8,
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    color: 'grey',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default UploadImage;
