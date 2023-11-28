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

function InventoryScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isItemModalVisible, setItemModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCount, setSelectedCount] = useState(null);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const openItemModal = (item, count) => {
    setSelectedItem(item);
    setSelectedCount(count);
    setItemModalVisible(true);
  };

  const closeItemModal = () => {
    setSelectedItem(null);
    setSelectedCount(null);
    setItemModalVisible(false);
  };

  const openAddModal = () => {
    setModalVisible(true);
  };

  const closeAddModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  const decrementCount = () => {
    setSelectedCount(prevCount => Math.max(0, prevCount - 1));
  };

  const incrementCount = () => {
    setSelectedCount(prevCount => prevCount + 1);
  };

  const saveCount = () => {
    const currentUser = auth().currentUser;
    const userUID = currentUser.uid;

    // Update the count in the database for the selected item
    firestore()
      .collection('user_information')
      .doc(userUID)
      .update({
        [selectedItem]: selectedCount,
      })
      .then(() => {
        console.log('Count updated successfully in the database');
        closeItemModal(); // Close the modal after saving
      })
      .catch(error => {
        console.error('Error updating count in the database: ', error);
      });
  };

  const addIngredient = () => {
    const currentUser = auth().currentUser;
    const userUID = currentUser.uid;

    // Construct an object with the ingredient name and quantity
    const ingredientData = {
      [ingredientName]: Number(ingredientQuantity) || 0, // Ensure quantity is a number
    };

    const updateObj = {};
    updateObj[ingredientName] = Number(ingredientQuantity) || 0;
    // Update the ingredients in the database for the user
    firestore()
      .collection('user_information')
      .doc(userUID)
      .update(updateObj)
      .then(() => {
        console.log('Ingredient added successfully to the database');
        closeAddModal(); // Close the modal after adding the ingredient
      })
      .catch(error => {
        console.error('Error adding ingredient to the database: ', error);
      });
  };

  useEffect(() => {
    const currentUser = auth().currentUser;
    const userUID = currentUser.uid;

    // Reference the specific user document
    const userDocRef = firestore().collection('user_information').doc(userUID);

    // Subscribe to real-time updates with onSnapshot
    const unsubscribe = userDocRef.onSnapshot(documentSnapshot => {
      if (documentSnapshot.exists) {
        const userData = documentSnapshot.data();

        if (userData) {
          // Check if userData exists and is not null/undefined
          setIngredients(userData);
        } else {
          console.log('User document data is empty');
        }
      } else {
        console.log('User document does not exist');
      }
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
      <Text style={styles.header}>Inventory</Text>

      <View style={box_styles.bigBox}>
        <View style={box_styles.boxHeaderContainer}>
          <Text style={box_styles.boxHeader}>Inventory Count</Text>
        </View>
        <TouchableOpacity
          onPress={() => openAddModal()}
          style={box_styles.lowerBoxButton}>
          <Text style={box_styles.boxButtonText}>Add Ingredient</Text>
        </TouchableOpacity>
        <View style={box_styles.separator}></View>
        <View>
          {Object.entries(ingredients).map(([key, value], index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openItemModal(key, value)}>
              <Text style={box_styles.boxListItem}>{`${key}: ${value}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeAddModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          <Text>placeholder</Text>

          <TextInput
            style={modal_styles.input}
            placeholder="Ingredient Name"
            value={ingredientName}
            onChangeText={text => setIngredientName(text)}
          />
          <TextInput
            style={modal_styles.input}
            placeholder="Quantity"
            value={ingredientQuantity}
            onChangeText={text => setIngredientQuantity(text)}
            keyboardType="numeric"
          />

          <TouchableOpacity
            onPress={addIngredient}
            style={modal_styles.acceptModalButton}>
            <Text style={modal_styles.acceptModalButtonText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={closeAddModal}
            style={modal_styles.closeModalButton}>
            <Text style={modal_styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        isVisible={isItemModalVisible}
        onBackdropPress={closeItemModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          {selectedItem && (
            <View>
              <Text
                style={
                  modal_styles.modalTitle
                }>{`${selectedItem}: ${selectedCount}`}</Text>
              <View style={modal_styles.buttonContainer}>
                <TouchableOpacity
                  onPress={incrementCount}
                  style={modal_styles.incrementButton}>
                  <Text style={modal_styles.buttonText}>▼</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={decrementCount}
                  style={modal_styles.decrementButton}>
                  <Text style={modal_styles.buttonText}>▼</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={saveCount}
                style={modal_styles.acceptModalButton}>
                <Text style={modal_styles.acceptModalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeItemModal}
                style={modal_styles.closeModalButton}>
                <Text style={modal_styles.closeModalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

export default InventoryScreen;
