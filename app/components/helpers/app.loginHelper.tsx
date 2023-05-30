import * as secureStore from 'expo-secure-store'
const save = async (key:string, value:any) => {
    await secureStore.setItemAsync(key, value)
  }
const getValueOf = async (key:string) => {
  var x = await secureStore.getItemAsync(key)
  return x
}
  
function getUserIdFromCookie() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith('user_id=')) {
      return cookie.substring('user_id='.length);
    }
  }
  return null; // Return null if the cookie is not found
}
import CookieManager from 'react-native-cookies';
import { ip } from './conf'

// Function to retrieve the value of a specific cookie
const getCookieValue = async (cookieName) => {
  try {
    // Fetch all cookies
    const cookies = await CookieManager.get(ip);
    
    // Check if the desired cookie exists
    if (cookies && cookies[cookieName]) {
      // Retrieve the cookie value
      const cookieValue = cookies[cookieName].value;
      return cookieValue;
    } else {
      // Cookie not found
      return null;
    }
  } catch (error) {
    // Handle any errors
    console.error('Error retrieving cookie:', error);
    return null;
  }
};

// Usage example
const retrieveCookie = async () => {
  const cookieName = 'user_id';
  const cookieValue = await getCookieValue(cookieName);
  console.log('Cookie Value:', cookieValue);
};
  
export {save, getValueOf, getUserIdFromCookie, getCookieValue}