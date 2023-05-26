import { StyleSheet } from "react-native";
import { BackgroundColor, global } from "../../components/helpers/StyleVars";
export const loginStyles = StyleSheet.create({
  header:{ color:"white"},
  OuterContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: BackgroundColor,
    height: '100%'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
    borderColor: '#fff',
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10
  },
  thumbnail: {
    height: 190,
    aspectRatio: 1 / 1,
  },
  test: {
    flex: 2,
    flexDirection: "row"
  },
  card: {
    marginTop:30,
    backgroundColor: "#252525",
},
});