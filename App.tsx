import { Provider as PaperProvider, Title } from "react-native-paper";
import AppNavigator from "./app/components/app.navigator";
import registerNNPushToken from 'native-notify';

export default function App() {
  registerNNPushToken(10776, 'bMAL30KDs4RJB8RaFqimlb');
  console.log("PAIN")
    return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

  // Import the functions you need from the SDKs you need
  // import { useEffect } from "react";
  // import {initializeApp} from 'firebase/app';
  // import {getMessaging} from 'firebase/messaging';
  
  // const firebaseConfig = {
  //   apiKey: "AIzaSyCElfVwAJzEPqtdIFPIYyODLXN7QCeW6vo",
  //   authDomain: "blindr-97115.firebaseapp.com",
  //   projectId: "blindr-97115",
  //   storageBucket: "blindr-97115.appspot.com",
  //   messagingSenderId: "596899960719",
  //   appId: "1:596899960719:web:a827d0397eb902f42b9dfa",
  //   measurementId: "G-EJZ212SWB4"
  // };
  //   const app = initializeApp(firebaseConfig);
  
  // const messaging = getMessaging(app);