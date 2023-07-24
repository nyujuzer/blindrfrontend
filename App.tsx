import { Provider as PaperProvider } from "react-native-paper"
import AppNavigator from "./app/components/app.navigator"

//git

export default function App() {
  return(
    <PaperProvider >
        <AppNavigator/>
    </PaperProvider>
    )
}

