import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./app/components/app.navigator";
import React from "react";
import { withTheme } from 'react-native-paper';
import { theme } from "./app/components/helpers/StyleVars";

export default function App() {
    return (
    <PaperProvider >
      <AppNavigator />
    </PaperProvider>
  );
}
