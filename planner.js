import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

function PlannerScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigate to the "Login" screen
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.homePageScrn}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.home}>Planner</Text>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
      <View style={styles.box}></View>
    </ScrollView>
  );
}

export default PlannerScreen;
