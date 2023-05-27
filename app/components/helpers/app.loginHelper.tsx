import * as Keychain from 'react-native-keychain'
import * as secureStore from 'expo-secure-store'
// const saveLogin = async (key: string, value: string) => {
//     try {
//       await Keychain.setGenericPassword(key, value);
//       return;
//     } catch (error) {
//       console.log('Error saving login:', error);
//       // Handle the error
//     }
//   };
//   const readStorage = async (key: string) => {
//     try {
//       const credentials = await Keychain.getGenericPassword();
//       if (credentials) {
//         // Check if the stored key matches the requested key
//         if (credentials.username === key) {
//           return credentials.password;
//         }
//       }
//       return null;
//     } catch (error) {
//       console.log('Error reading storage:', error);
//       // Handle the error
//       return null;
//     }
//   };
//   const flushStorage = async () => {
//     try {
//       await Keychain.resetGenericPassword();
//     } catch (error) {
//       console.log('Error flushing storage:', error);
//       // Handle the error
//     }
//   };
const save = async (key:string, value:any) => {
    await secureStore.setItemAsync(key, value)
  }
const getValueOf = async (key:string) => {
  var x = await secureStore.getItemAsync(key)
  return x
}
  
  
export {save, getValueOf}