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
  const [recipeDescription, setRecipeDecsription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepInput, setStepInput] = useState('');

  const openRecipeModal = recipe => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  const handleCreateNew = async () => {
    try {
      if (!recipeName.trim() || ingredients.length === 0) {
        console.log('Recipe name and ingredients are required.');
        return;
      }
      const recipesRef = firestore().collection('recipes');
      const newRecipeRef = recipesRef.doc(recipeName);

      await newRecipeRef.set({
        description: recipeDescription,
        ingredients: ingredients,
        steps: steps,
      });

      closeCreateModal();
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

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

  const addStep = () => {
    if (stepInput !== '') {
      setSteps([...steps, stepInput]);
      setStepInput('');
    }
  };

  const removeStep = index => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  useEffect(() => {
    // Fetch the 'recipes' collection from Firestore
    const recipeRef = firestore().collection('recipes');

    // Subscribe to real-time updates with onSnapshot
    const unsubscribe = recipeRef.onSnapshot(querySnapshot => {
      const recipeData = [];
      querySnapshot.forEach(documentSnapshot => {
        recipeData.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });
      setRecipes(recipeData);
    });

    // Unsubscribe from the Firestore subscription when the component unmounts
    return () => {
      unsubscribe();
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
              <Text style={box_styles.boxListItem}>{recipe.id}</Text>
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
                {selectedRecipe.description}
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
              <View>
                <Text style={styles.modalTitle}>Steps</Text>
                {selectedRecipe.steps && selectedRecipe.steps.length > 0 ? (
                  <Text>
                    {selectedRecipe.steps.map((step, index) => (
                      <Text key={index}>
                        {`\u2022 ${step}`}
                        {'\n'}
                      </Text>
                    ))}
                  </Text>
                ) : (
                  <Text>No steps provided</Text>
                )}
              </View>
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
              <Text style={modal_styles.modalHeader}>Description:</Text>
              <TextInput
                style={modal_styles.input}
                value={recipeDescription}
                onChangeText={text => setRecipeDecsription(text)}
                placeholder="Enter recipe description"
              />
            </View>

            <View>
              <Text style={modal_styles.modalHeader}>Ingredients:</Text>
              {ingredients.map((ingredient, index) => (
                <View key={index} style={modal_styles.ingredientsContainer}>
                  <View style={modal_styles.ingredientItem}>
                    <Text>{`${index + 1}. ${ingredient}`}</Text>
                  </View>
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

            <View>
              <Text style={modal_styles.modalHeader}>Steps:</Text>
              {steps.map((step, index) => (
                <View key={index} style={modal_styles.ingredientsContainer}>
                  <View style={modal_styles.ingredientItem}>
                    <Text>{`${index + 1}. ${step}`}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeStep(index)}>
                    <Text style={modal_styles.removeIngredient}>
                      Remove Step
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

              <View style={modal_styles.addIngredientContainer}>
                <TextInput
                  style={modal_styles.input}
                  value={stepInput}
                  onChangeText={text => setStepInput(text)}
                  placeholder="Enter Step"
                />
                <TouchableOpacity onPress={addStep}>
                  <Text style={modal_styles.addIngredient}>Add Step</Text>
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
