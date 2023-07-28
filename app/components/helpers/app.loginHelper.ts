import * as secureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
const save = async (key: string, value: any) => {
  if (Platform.OS === "web") {
    await AsyncStorage.setItem(key, value);
    }
  await secureStore.setItemAsync(key, value);
};
const getValueOf = async (key: string) => {
  let value;
  if (Platform.OS === "web") {
    value = await AsyncStorage.getItem(key);
    console.log(value, "from AsyncStorage");
  } else {
    value = await secureStore.getItemAsync(key);
    console.log(value, "from secureStore");
  }

  // Additional validation or logging steps
  if (value === null) {
    console.log("Value not found for key:", key);
  } else {
    console.log("Value found:", value);
  }

  return value;
};
const getMultipleVals = async (keys: string[]) => {
  const values = {};

  for (const key of keys) {
    const value = await secureStore.getItemAsync(key);
    values[key] = value;
  }

  return values;
};
export { save, getValueOf, getMultipleVals };
