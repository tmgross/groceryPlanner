import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles, box_styles, modal_styles } from './styles';
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
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');

  const openRecipeModal = recipe => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  const handleCreateNew = () => {};

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const addIngredient = () => {
    if (ingredientInput !== '') {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput('');
    }
  };

  const removeIngredient = index => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
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
          onPress={() => openCreateModal()}
          style={box_styles.lowerBoxButton}>
          <Text style={box_styles.boxButtonText}>Create New Recipe</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
        {recipes.map((recipe, index) => (
          <View key={recipe.id}>
            <TouchableOpacity onPress={() => openRecipeModal(recipe)}>
              <Text style={box_styles.boxListItem}>{recipe.Description}</Text>
            </TouchableOpacity>
            {index < recipes.length && (
              <View style={box_styles.itemSeparator}></View>
            )}
          </View>
        ))}
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeRecipeModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          {selectedRecipe && (
            <View>
              <Text style={modal_styles.modalTitle}>
                {selectedRecipe.Description}
              </Text>
              <View>
                <Text style={styles.modalTitle}>Ingredients</Text>
                {selectedRecipe.ingredients &&
                selectedRecipe.ingredients.length > 0 ? (
                  <Text>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <Text key={index}>
                        {`\u2022 ${ingredient}`}
                        {'\n'}
                      </Text>
                    ))}
                  </Text>
                ) : (
                  <Text>No ingredients provided</Text>
                )}
              </View>
              {/* Add more recipe information here */}
            </View>
          )}
          <TouchableOpacity
            onPress={closeRecipeModal}
            style={modal_styles.closeModalButton}>
            <Text style={modal_styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for creating a new recipe */}
      <Modal
        isVisible={isCreateModalVisible}
        onBackdropPress={closeCreateModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          <ScrollView>
            <Text style={modal_styles.modalTitle}>Create New Recipe</Text>
            <View>
              <Text style={modal_styles.modalHeader}>Name:</Text>
              <TextInput
                style={modal_styles.input}
                value={recipeName}
                onChangeText={text => setRecipeName(text)}
                placeholder="Enter recipe name"
              />
            </View>

            <View>
              <Text style={modal_styles.modalHeader}>Ingredients:</Text>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={modal_styles.ingredientsContainer}>
                  <Text>{`${index + 1}. ${ingredient}`}</Text>
                  <TouchableOpacity onPress={() => removeIngredient(index)}>
                    <Text style={modal_styles.removeIngredient}>
                      Remove Ingredient
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View style={modal_styles.addIngredientContainer}>
                <TextInput
                  style={modal_styles.input}
                  value={ingredientInput}
                  onChangeText={text => setIngredientInput(text)}
                  placeholder="Enter ingredient"
                />
                <TouchableOpacity onPress={addIngredient}>
                  <Text style={modal_styles.addIngredient}>Add Ingredient</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleCreateNew}
            style={modal_styles.acceptModalButton}>
            <Text style={modal_styles.acceptModalButtonText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closeCreateModal}
            style={modal_styles.closeModalButton}>
            <Text style={modal_styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default RecipeScreen;
