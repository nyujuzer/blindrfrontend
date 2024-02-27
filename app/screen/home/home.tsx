import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import { theme } from '../../components/helpers/StyleVars';
import ExploreScreen from './expore/explore';
import { getValueOf } from '../../components/helpers/app.loginHelper';
import ProfileScreen from './profile/profile';
import Icon from 'react-native-vector-icons/FontAwesome'
import MatchScreen from './chat/matchscreen';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { CustomBottomTab, CustomBottomTabElement, IconType, iconProp } from '../../components/customBottomNav';

import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

const App = () => {
  const [index, setIndex] = useState(0);
  const [uid, setUserId] = useState("");
  const handleNavigation = (newIndex) => {
    setIndex(newIndex);
  };
  const CameraIcon:iconProp = {icon:{value: {name:'camera',type:IconType.FontAweomseIcon}, size: 24}}
  useEffect(() => {
    getValueOf("uid").then((res: any) => {
      setUserId(res);
    });
  }, []);


  const renderScene = () => {
    switch (index) {
      case 0:
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ExploreScreen/>
        </View>
          )
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
  ];
  
  return (
    <View style={{ flex: 1 }}>
      {/* <CustomBottomTab>
        <CustomBottomTabElement icon={{value: {name:'camera',type:IconType.FontAweomseIcon}, size: 24}}/>
        <CustomBottomTabElement icon={{value: {name:'heart',type:IconType.FontAweomseIcon}, size: 24}}/>
        <CustomBottomTabElement icon={{value: {name:'user',type:IconType.FontAweomseIcon}, size: 24}}/>
        <CustomBottomTabElement icon={{value: {name:'cog',type:IconType.FontAweomseIcon}, size: 24}}/>
      </CustomBottomTab> */}
      <PaperProvider>
        <BottomNavigation
          inactiveColor={theme.accent}
          activeColor={theme.primary}
          labeled={false}
          theme={{ colors: { secondaryContainer: theme.secondary } }}
          compact
          
          style={{ paddingBottom:4, }}
          barStyle={{backgroundColor: theme.primary, height:50, }}
          navigationState={{ index, routes }}
          onIndexChange={handleNavigation}
          renderScene={renderScene}
          renderIcon={({ route, color }) => {
            return(    <Icon
              name={route.icon}
              size={20}
              color={index === routes.indexOf(route) ? theme.primary : color}
            />
        )
      }
    }
        />
      </PaperProvider>
    </View>
  );
};

export default App;
