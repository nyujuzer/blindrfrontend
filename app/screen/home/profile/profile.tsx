import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { ip } from '../../../components/helpers/conf';
import {Video, ResizeMode} from 'expo-av'
import Player from '../../../components/Player';
const ProfileScreen = ({ uid }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [videos, setVideos] = useState([]);
const video = useRef(null)
const [status, setStatus] = useState({})
  useEffect(() => {
    // Fetch profile image from the server
    fetchProfileImage();

    // Fetch videos from the server
    fetchVideos();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`${ip}getFile/${uid}`);
      const imageBlob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(imageBlob);
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };


  const fetchVideos = async () => {
    try {
      const response = await fetch(`${ip}videos/${uid}`);
      const videoBlob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = () => {
        setVideos([...videos, reader.result]);
      };
      reader.readAsDataURL(videoBlob);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  return (
    <View style={styles.container}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ):null}
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Videos:</Text>
      <Player url={ip+"videos/"+uid}></Player>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoContainer: {
    marginBottom: 8,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  videoDescription: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProfileScreen;
