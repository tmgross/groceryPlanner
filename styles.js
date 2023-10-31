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
    backgroundColor: '#ed5440',
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
