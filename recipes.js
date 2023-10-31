import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

function RecipeScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.homePageScrn}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Recipes</Text>
    </ScrollView>
  );
}

export default RecipeScreen;
