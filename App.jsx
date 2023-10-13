import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {styles} from './styles';

const App = () => {
  return (
    <View style={styles.container}>
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
            <Text style={styles.buttonText}>Login with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.loginBtn, styles.loginBtnMargin]}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;
