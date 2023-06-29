import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import {useNavigation} from '@react-navigation/native'
const ProfileScreen = (props) => {
  const showPrompt = true; // Set to true if the profile picture is not available
  const [profilePicture, setImage] = useState<any>();
  const navigation = useNavigation();

  const renderProfilePicture = () => {
    const avatar = createAvatar(lorelei, {
      seed: 'Kitty',
      // ... other options
    });
    return (
      <View>
        {/* Render the avatar component */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderProfilePicture()}

      {showPrompt && (
        <View style={styles.promptContainer}>
          <Text style={styles.promptText}>Please complete your signup</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Finish")}
          >
            Finish Signup
          </Button>
          <Button onPress={()=>{}}>

          </Button>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  diceBearAvatar: {
    backgroundColor: '#FFC107',
    marginVertical: 20,
  },
  promptContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  promptText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;
