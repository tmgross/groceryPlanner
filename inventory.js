import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { styles, box_styles, modal_styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

function InventoryScreen() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);


  const openAddModal = () => {
    setModalVisible(true);
  };

  const closeAddModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

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
        {/* {recipes.map((recipe, index) => (
          <View key={recipe.id}>
            <TouchableOpacity onPress={() => openRecipeModal(recipe)}>
              <Text style={box_styles.boxListItem}>{recipe.id}</Text>
            </TouchableOpacity>
            {index < recipes.length && (
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
