import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles, box_styles, modal_styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

function InventoryScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const openAddModal = () => {
    setModalVisible(true);
  };

  const closeAddModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
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
    
        if (userData) { // Check if userData exists and is not null/undefined
          setIngredients(userData);
        } else {
          console.log("User document data is empty");
        }
      } else {
        console.log("User document does not exist");
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
        {/* {ingredients.map((userData, index) => (
          <View key={index}>
            {Object.keys(userData).map((key) => (
              <TouchableOpacity key={key}>
                <Text style={box_styles.boxListItem}>{userData[key]}</Text>
              </TouchableOpacity>
            ))}
            {index < ingredients.length - 1 && (
              <View style={box_styles.itemSeparator}></View>
            )}
          </View>
        ))} */}

      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeAddModal}
        animationIn="slideInUp"
        animationOut="slideOutDown">
        <View style={modal_styles.modalContainer}>
          <Text>placeholder</Text>

          <TouchableOpacity
            onPress={closeAddModal}
            style={modal_styles.closeModalButton}>
            <Text style={modal_styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default InventoryScreen;
