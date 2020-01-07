import { StyleSheet } from "react-native";

const colors = {
  grey: 'grey',
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  }
});

module.exports = {
  styles: styles,
  colors: colors,
};