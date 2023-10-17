import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Navigate to the "Login" screen
    navigation.navigate('Login');
  };

  const handleBoxPress = boxNumber => {
    // Replace 'YourOtherPage' with the name of the page you want to navigate to
    navigation.navigate('YourOtherPage', { boxNumber });
  };

  return (
    <ScrollView contentContainerStyle={styles.homePageScrn}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Your Groceries</Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 1</Text>
        <TouchableOpacity
          onPress={() => handleBoxPress(1)}
          style={styles.boxButton}>
          <Text style={styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 2</Text>
        <TouchableOpacity
          onPress={() => handleBoxPress(2)}
          style={styles.boxButton}>
          <Text style={styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxText}>Box 3</Text>
        <TouchableOpacity
          onPress={() => handleBoxPress(3)}
          style={styles.boxButton}>
          <Text style={styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
