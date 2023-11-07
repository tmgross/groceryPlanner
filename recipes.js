import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { box_styles } from './boxStyles';
import { modal_styles } from './modalStyles';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

function RecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [numRecipes, setNumRecipes] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const openModal = recipe => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    // Fetch the 'recipes' collection from Firestore
    const recipeRef = firestore()
      .collection('recipes')
      .onSnapshot(querySnapshot => {
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
      // Unsubscribe from the Firestore subscription when the component unmounts
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
          <TouchableOpacity key={recipe.id} onPress={() => openModal(recipe)}>
            <Text style={box_styles.boxListItem}>{recipe.Description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          {selectedRecipe && (
            <View>
              <Text style={modal_styles.modalTitle}>{selectedRecipe.Description}</Text>
              <Text>{selectedRecipe.Description}</Text>
              {/* Add more recipe information here */}
            </View>
          )}
          <TouchableOpacity
            onPress={closeModal}
            style={modal_styles.closeModalButton}>
            <Text style={modal_styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default RecipeScreen;
