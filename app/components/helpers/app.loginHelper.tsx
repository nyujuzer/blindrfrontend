// import React from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'

// const saveLogin =async (key:string, value:string) => {
//     try {
//         await AsyncStorage.setItem(key, value);        
//         return
//     } catch (e) {
//         alert("something went wrong")
//     }    
// }
// const readStorage =async  (key:string) => {
//    try {
//      const value = await AsyncStorage.getItem(key)
//      if (value !== null){     
//          return value
//          }else{
//         return null
//      }
//    } catch (e) {
//         return null
//    }
// }
// const flushStorage = () =>{
//     AsyncStorage.clear()
// }

// export {saveLogin, readStorage }

import * as Keychain from 'react-native-keychain'
const saveLogin = async (key: string, value: string) => {
    try {
      await Keychain.setGenericPassword(key, value);
      return;
    } catch (error) {
      console.log('Error saving login:', error);
      // Handle the error
    }
  };
  const readStorage = async (key: string) => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        // Check if the stored key matches the requested key
        if (credentials.username === key) {
          return credentials.password;
        }
      }
      return null;
    } catch (error) {
      console.log('Error reading storage:', error);
      // Handle the error
      return null;
    }
  };
  const flushStorage = async () => {
    try {
      await Keychain.resetGenericPassword();
    } catch (error) {
      console.log('Error flushing storage:', error);
      // Handle the error
    }
  };
  
  
  
export {saveLogin, readStorage, flushStorage}