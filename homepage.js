import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { box_styles } from './boxStyles';

function HomeScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate('Login');
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
      <Text style={styles.header}>Your Groceries</Text>

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
