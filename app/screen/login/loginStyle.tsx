import { StyleSheet } from "react-native";
import { BackgroundColor, secondaryBg } from "../../components/helpers/StyleVars";

export const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: BackgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: secondaryBg,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 150,
    width: 150,
  },
  createAccountText: {
    color: "white",
    textAlign: "center",
  },
  createAccountLink: {
    marginTop: 10,
  },
});
