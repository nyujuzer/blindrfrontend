import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { ip } from '../../../components/helpers/conf';
import { getValueOf } from '../../../components/helpers/app.loginHelper';

const ExploreScreen = ({uid}) => {
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [userId, setUserId] = useState("")
  useEffect(() => {
    fetchNearbyUsers();
  }, []);

  const fetchNearbyUsers = () => {
    console.log(uid)
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const response = JSON.parse(xhttp.responseText);
          setNearbyUsers(response);
        } else {
          console.error('Error fetching nearby users:', xhttp.status);
        }
      }
    };





    xhttp.open('GET', ip+'/getUsers/'+userId, true);
    xhttp.setRequestHeader('Content-type', 'application/json');
    xhttp.send();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>{uid}</Text>
        {/* {nearbyUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <Image source={{ uri: user.image }} style={styles.userImage} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        ))} */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  userCard: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExploreScreen;
