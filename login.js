import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

function LoginScreen({ navigation }) {
  const handleLoginClick = () => {
    navigation.navigate('Home');
  };
  const handleGoogleLoginClick = () => {
    navigation.navigate('Home');
  };
  const handleRegisterClick = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.loginScrn}>
      <Text style={styles.title}>Grocery Planner</Text>
      <View style={styles.loginContainer}>
        <View style={styles.inputRow}>
          <Text style={styles.loginTextBox}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.loginTextBox}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.loginBtn, styles.loginGoogle]}>
            <Text style={styles.buttonText} onPress={handleGoogleLoginClick}>
              Login with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginBtn, styles.loginBtnMargin]}>
            <Text style={styles.buttonText} onPress={handleLoginClick}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Text onPress={handleRegisterClick}>
              Don't have an account? Register here.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
// Set the screen options to remove the header
LoginScreen.navigationOptions = {
  headerShown: false,
};

export default LoginScreen;
