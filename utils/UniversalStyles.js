import { StyleSheet } from "react-native";

const colors = {
  grey: 'grey',
}

module.exports = StyleSheet.create({
  input: {
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  }
});