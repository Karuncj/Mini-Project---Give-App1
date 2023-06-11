// SellForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import axios from 'axios';
import baseURL from '../assets/common/baseUrl';
import Error from '../Shared/Error';
import CommonButton from './Form/CommonButton';

const SellForm = ({ categoryName, imageUri }) => {
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState(null);

  const handleTypeChange = (text) => {
    setType(text);
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleAudienceSelection = (audience) => {
    setTargetAudience(audience);
  };

  const handleSubmit = async () => {
    try {
      setError('');
      if (!categoryName) {
        console.error('CategoryName prop is required');
        return;
      }
  
      const categoryResponse = await axios.get(`${baseURL}categories?name=${categoryName}`);
      const category = categoryResponse.data;
  
      if (!category) {
        console.error('Category not found');
        return;
      }
  
      const formData = new FormData();
      formData.append('categoryId', category._id);
      formData.append('type', type);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('targetAudience', targetAudience);
  
      if (imageUri) {
        formData.append('image', {
          uri: imageUri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      }
  
      const response = await axios.post(`${baseURL}products`, formData);
      if (response.status === 200) {
        console.log('Success');
        setError('Posted Successfully');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    console.log('Form submitted:', { type, title, description, targetAudience, categoryName, imageUri });
  };

    return (
      <View style={styles.container}>
        {imageUri && <Image source={{ uri: image.Uri }} style={styles.image} name='image'/>}
        <Text style={styles.label}>Product Company</Text>
        <TextInput style={styles.input} value={type} onChangeText={handleTypeChange} />

        <Text style={styles.label}>Name of the product</Text>
        <TextInput style={styles.input} value={title} onChangeText={handleTitleChange} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={handleDescriptionChange} />

        <Text style={styles.label}>Target Audience</Text>
        <TouchableOpacity
          style={[styles.button, targetAudience === 'male' && styles.selectedButton]}
          onPress={() => handleAudienceSelection('male')}
        >
          <Text style={styles.buttonText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, targetAudience === 'female' && styles.selectedButton]}
          onPress={() => handleAudienceSelection('female')}
        >
          <Text style={styles.buttonText}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, targetAudience === 'kids' && styles.selectedButton]}
          onPress={() => handleAudienceSelection('kids')}
        >
          <Text style={styles.buttonText}>Kids</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, targetAudience === 'common' && styles.selectedButton]}
          onPress={() => handleAudienceSelection('common')}
        >
          <Text style={styles.buttonText}>Common Use</Text>
        </TouchableOpacity>
        {error ? <Error message={error} /> : null}

        <CommonButton title={'Submit'} bgColor={'#9683dd'} textColor={'#ffffff'} onPress={handleSubmit} />
      </View>
    );
};
const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    width: deviceWidth - 60,
    height: deviceHeight - 280,
    padding: 20,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'grey',
  },
  input: {
    borderWidth: 0.7,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#9683DD',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SellForm;
