import { Provider as PaperProvider, Title } from "react-native-paper";
import AppNavigator from "./app/components/app.navigator";
import registerNNPushToken from 'native-notify';
import React from "react";

export default function App() {
  registerNNPushToken(10776, 'bMAL30KDs4RJB8RaFqimlb');
  console.log("PAIN")
    return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}

