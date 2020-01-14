import { StyleSheet } from "react-native";

const colors = {
  grey: 'grey',
}

const elevation = 10;

const styles = StyleSheet.create({
  input: {
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
  card: {
    elevation,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
    backgroundColor: 'white',
    borderRadius: 15,
  }
});

module.exports = {
  styles: styles,
  colors: colors,
};