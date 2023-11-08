// boxStyles.js

import { StyleSheet } from 'react-native';

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
