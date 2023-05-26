import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import axios from "axios";
import { ip } from "../../components/helpers/conf";

const TestPage = () => {
  useEffect(() => {
    testEndpoints();
  }, []);

  const testEndpoints = async () => {
    try {
      // Test login endpoint
      const loginResponse = await axios.get(
        ip+"/login-username+password/"
      );
      console.log("Login Response:", loginResponse.data);

      // Test registration endpoint
      const registrationResponse = await axios.post(
        ip+"/register/",
        {
          email: "test@example.com",
          password: "testpassword",
          // Add other registration data here
        }
      );
      console.log("Registration Response:", registrationResponse.data);

      // Test other endpoints...
    } catch (error) {
      Alert.alert("Error", "An error occurred while testing endpoints.");
    }
  };

  return (
    <View>
      <Text>Testing Endpoints...</Text>
    </View>
  );
};

export default TestPage;
