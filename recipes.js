import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { box_styles } from './boxStyles';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function RecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [numRecipes, setNumRecipes] = useState(0);

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    // Fetch the 'recipes' collection from Firestore

    const recipeRef = firestore()
      .collection('recipes')
      .get()
      .then(querySnapshot => {
        const recipeData = [];
        // console.log('Total recipes: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          recipeData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setRecipes(recipeData);
      });

    return () => {
      recipeRef();
    };
  }, []);

  const handleCreateNew = () => {};

  return (
    <ScrollView contentContainerStyle={styles.homePageScrn}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutBtnTxt}>Go Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Recipes</Text>

      <View style={box_styles.bigBox}>
        <View style={box_styles.boxHeaderContainer}>
          <Text style={box_styles.boxHeader}>Recipe List</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCreateNew()}
          style={box_styles.lowerBoxButton}>
          <Text style={box_styles.boxButtonText}>Create New Recipe</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
        {recipes.map(recipe => (
          <Text key={recipe.id}>{recipe.Description}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export default RecipeScreen;
