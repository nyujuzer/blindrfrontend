import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation, Provider as PaperProvider} from 'react-native-paper';
import { ActionColor, SecondaryColor, darkColor, secondaryBg } from '../../components/helpers/StyleVars';
import ExploreScreen from './expore/explore';


const App = () => {
  const [index, setIndex] = useState(0);

  const handleNavigation = (newIndex) => {
    setIndex(newIndex);
  };

  const renderScene = () => {
    switch (index) {
      case 0:
        return (
          <ExploreScreen/>
        );
      case 1:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Screen</Text>
          </View>
        );
      case 2:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
          </View>
        );
      case 3:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Registration Screen</Text>
          </View>
        );
      case 4:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test Screen</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const [routes] =useState([
    { key: 'explore', title: 'Explore' },
    { key: 'matches', title: 'Matches' },
    { key: 'profile', title: 'Profile' },
    { key: 'Settings', title: 'Settings' },
  ]);

  
  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
      <BottomNavigation
        inactiveColor={SecondaryColor} 
        activeColor={ActionColor}
        labeled={true}
        theme={{colors: {secondaryContainer: ActionColor}}}
        barStyle={{backgroundColor:secondaryBg}}
        navigationState={{ index, routes }}
        onIndexChange={handleNavigation}
        renderScene={renderScene}
      />
      </PaperProvider>
    </View>
      
  );
};

export default App;
