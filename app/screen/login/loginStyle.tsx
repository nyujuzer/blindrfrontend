import { StyleSheet } from "react-native";
import { BackgroundColor, secondaryBg, SecondaryColor } from "../../components/helpers/StyleVars";
export const loginStyles = StyleSheet.create({
  container: {
    backgroundColor:BackgroundColor,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: secondaryBg,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: SecondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createAccountText: {
    color:"white",
    marginTop: 10,
    textAlign: 'center',
  },
  createAccountLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});