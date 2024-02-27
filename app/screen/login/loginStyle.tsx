import { StyleSheet } from "react-native";
import { theme } from "../../components/helpers/StyleVars";
export const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.secondary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: theme.primary,
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
    color: theme.accent,
    textAlign: "center",
  },
  createAccountLink: {
    marginTop: 10,
  },
});
