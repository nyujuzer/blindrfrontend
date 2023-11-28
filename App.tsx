import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./app/components/app.navigator";
import registerNNPushToken from 'native-notify';
import React from "react";

export default function App() {
  registerNNPushToken(10776, 'bMAL30KDs4RJB8RaFqimlb');
    return (
    <PaperProvider>
      <AppNavigator />
    </PaperProvider>
  );
}
