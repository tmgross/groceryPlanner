// styles.js

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loginScrn: {
    flex: 1,
    backgroundColor: '#282c34',
    color: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePageScrn: {
    flex: 1,
    backgroundColor: '#282c34',
    color: 'aliceblue',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    fontSize: 20,
    top: 20,
    height: 30,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  subTitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    padding: 30,
  },
  loginTextBox: {
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  loginBtn: {
    flex: 0.45,
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10,
    cursor: 'pointer',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loginGoogle: {
    backgroundColor: '#4285f4',
    borderColor: '#4285f4',
  },
  loginBtnMargin: {
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    left: 10,
  },

  logoutBtnTxt: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

// boxStyles.js

export const box_styles = StyleSheet.create({
  box: {
    width: '90%',
    flex: 1 / 3,
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    borderRadius: 10,
  },
  bigBox: {
    width: '90%',
    flex: 1,
    backgroundColor: '#dcdcdc',
    marginVertical: 10,
    borderRadius: 10,
  },
  boxText: {
    fontFamily: "'Trebuchet MS', Helvetica, sans-serif", //FIX THIS SO IT USES THE FONT
    fontSize: 18,
  },
  boxHeaderContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  boxHeader: {
    fontSize: 18,
    fontFamily: "'Trebuchet MS', Helvetica, sans-serif", //FIX THIS SO IT USES THE FONT
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  boxButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  lowerBoxButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 10,
    width: 'auto',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  boxButtonText: {
    color: 'white',
  },
  boxListItem: {
    paddingTop: 10,
    fontSize: 18,
  },
  recipeImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  recipeItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  recipeItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

// modal_styles

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientItem: {
    flex: 1,
  },
  removeIngredient: {
    backgroundColor: 'red',
    color: 'white',
    padding: 3,
    borderRadius: 5,
    marginLeft: 8,
  },
});
