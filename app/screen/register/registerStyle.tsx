import { Platform, StyleSheet } from "react-native";
import { BackgroundColor, Red } from "../../components/helpers/StyleVars";
export const RegisterStyles = StyleSheet.create({
  center: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  box: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BackgroundColor,
  },
  borderTest: {
    borderColor: "#fff",
    borderWidth: 3,
  },
  card: {
    padding: 30,
    marginTop: 30,
    backgroundColor: "#252525",
    alignContent:"center",
    maxWidth:Platform.OS === "android" ? null:"33%"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    zIndex: 100,
    opacity: 0.8,
    borderRadius: 100,
    width: 50,
    height: 50,
    left: 10, // Adjust the value based on your desired position from the left edge
    top: 10, // Adjust the value based on your desired position from the top edge
    alignSelf: "flex-start", // To align the button to the left side
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    // You can add more styles as needed, such as background color, border, etc.
  },
  logo: {
    // Define your logo styles here, or use global.logo if it's already defined elsewhere
    // Example:
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  modalContainer: {
    alignContent: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    alignSelf: "center",
    width: "90%",
    borderRadius: 20,
  },
  header: {
    color: "white",
  },
  radio: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 100,
  },
  label: {
    color: "white",
    fontSize: 25,
  },
  radioLabelActive: {
    color: "white",
  },
  radioLabelPassive: {
    color: "gray",
  },
});
