import React, {useState, useEffect} from "react";
import { HomeStyles } from "./homeStyles";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MatchMaker } from "../../components/pre-styled/components";

interface ScreenProps {
  navigation: any;
}

const Home = (prop: ScreenProps) => {
const [currentProfile, setCurrentProfile] = useState(null);

  return (
    <SafeAreaView style={HomeStyles.container}>
      <ScrollView style={HomeStyles.content}>
        <MatchMaker></MatchMaker>
      </ScrollView>
    </SafeAreaView>
  )
}
export default Home;

//TODO: ask server for matches
//TODO: make it *P R E T T Y*