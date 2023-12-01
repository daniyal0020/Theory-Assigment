import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Clear error message when the component mounts
    setErrorMessage('');
  }, []);

  const handleLogin = async () => {
    try {
      // Retrieve user password from SecureStore
      const storedPassword = await SecureStore.getItemAsync(username);

      if (storedPassword && storedPassword === password) {
        // Navigate to the 'CVFormScreen' after successful login
        navigation.navigate('CVFormScreen');
      } else {
        // Show invalid login message
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* ... existing code ... */}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
});

export default LoginScreen;