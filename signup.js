import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setValid] = useState(true);

  const __doSignUp = () => {
    if (!email) {
      setError('Email required *');
      setValid(false);
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError('Weak password, minimum 5 chars');
      Alert.alert('Erorr', 'Password should be atleast 5 characters long.');
      setValid(false);
      return;
    }
    //  else if (!__isValidEmail(email)) {
    //   setError('Invalid Email');
    //   setValid(false);
    //   return;
    // }

    __doCreateUser(email, password);
  };

  const __doCreateUser = async (email, password) => {
    try {
      let response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      if (response && response.user) {
        // The user has been successfully created
        await firestore()
          .collection('user_information')
          .doc(response.user.uid)
          .set({
            potato: 10,
          });

        Alert.alert('Success ✅', 'Account created successfully');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.loginScrn}>
      <Text style={styles.title}>Grocery Planner</Text>
      <Text style={styles.subTitle}>Create an Account</Text>

      <View style={styles.loginContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.loginTextBox}>Email:</Text>
          <TextInput
            label={'Email'}
            autoCapitalize={false}
            keyboardType="email-address"
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={text => {
              setError;
              setEmail(text);
            }}
            error={isValid}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.loginTextBox}>Password:</Text>
          <TextInput
            label={'Password'}
            secureTextEntry
            autoCapitalize={false}
            style={styles.input}
            selectionColor={'blue'}
            placeholder="Enter your password"
            error={isValid}
            onChangeText={text => setPassword(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.loginBtn, styles.loginBtnMargin]}>
            <Text style={styles.buttonText} onPress={__doSignUp}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Set the screen options to remove the header
SignUpScreen.navigationOptions = {
  headerShown: false,
};

export default SignUpScreen;
