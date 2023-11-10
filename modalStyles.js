// modal_styles.js

import { StyleSheet } from 'react-native';

export const modal_styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeModalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeModalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  acceptModalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  acceptModalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  removeIngredient: {
    backgroundColor: '#DA043C',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  addIngredient: {
    backgroundColor: '#0185BE',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  },
  ingredientsContainer: {
    fontSize: 12,
    textAlign: 'center',
  },
});
