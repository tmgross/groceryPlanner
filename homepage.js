import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles, box_styles } from './styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function HomeScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user information when the component mounts
    const currentUser = auth().currentUser;
    setUserEmail(currentUser.email);
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleBoxPress = boxNumber => {
    if (boxNumber == 1) {
      navigation.navigate('Inventory');
    } else if (boxNumber == 2) {
      navigation.navigate('Recipes');
    } else {
      navigation.navigate('Planner');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.homePageScrn}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.header}>{userEmail}</Text>
{/* Your Groceries  */}
      <View style={box_styles.box}>
        <View style={box_styles.boxHeaderContainer}>
          <Text style={box_styles.boxHeader}>Inventory</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleBoxPress(1)}
          style={box_styles.boxButton}>
          <Text style={box_styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
      </View>

      <View style={box_styles.box}>
        <View style={box_styles.boxHeaderContainer}>
          <Text style={box_styles.boxHeader}>Recipes</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleBoxPress(2)}
          style={box_styles.boxButton}>
          <Text style={box_styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
      </View>

      <View style={box_styles.box}>
        <View style={box_styles.boxHeaderContainer}>
          <Text style={box_styles.boxHeader}>Planner</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleBoxPress(3)}
          style={box_styles.boxButton}>
          <Text style={box_styles.boxButtonText}>Go</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
