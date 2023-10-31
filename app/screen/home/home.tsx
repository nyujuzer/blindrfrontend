import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import { ActionColor, SecondaryColor, darkColor, secondaryBg } from '../../components/helpers/StyleVars';
import ExploreScreen from './expore/explore';
import { getValueOf } from '../../components/helpers/app.loginHelper';
import ProfileScreen from './profile/profile';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import MatchScreen from './chat/matchscreen';
import Stack from '../../components/app.navigator';
import { StackNavigationProp } from '@react-navigation/stack';

const App = () => {
  const [index, setIndex] = useState(0);
  const [uid, setUserId] = useState("");
  const handleNavigation = (newIndex) => {
    setIndex(newIndex);
  };

  useEffect(() => {
    getValueOf("uid").then((res: any) => {
      setUserId(res);
    });
  }, []);



  const renderScene = () => {
    switch (index) {
      case 0:
        return <ExploreScreen uid={uid}/>;
      case 1:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MatchScreen />
          </View>
        );
      case 2:
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ProfileScreen uid={uid} />
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

  const routes = [
    { key: 'explore', title: 'Explore', icon: 'camera', },
    { key: 'matches', title: 'Matches', icon: 'heart' },
    { key: 'profile', title: 'Profile', icon: 'user' },
    { key: 'settings', title: 'Settings', icon: 'cog' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <PaperProvider>
        <BottomNavigation
          inactiveColor={SecondaryColor}
          activeColor={ActionColor}
          labeled={true}
          theme={{ colors: { secondaryContainer: ActionColor } }}
          barStyle={{ backgroundColor: secondaryBg }}
          navigationState={{ index, routes }}
          onIndexChange={handleNavigation}
          renderScene={renderScene}
          renderIcon={({ route, color }) => {
            return(    <Icon
              name={route.icon}
              size={24}
              color={index === routes.indexOf(route) ? secondaryBg : color}
            />
        )}}
        />
      </PaperProvider>
    </View>
  );
};

export default App;
