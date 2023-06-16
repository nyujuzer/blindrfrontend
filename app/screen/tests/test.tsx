import React, { useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import { UploadField } from "../../components/pre-styled/components";

const TestPage = () => {
  return(
  <View style={{paddingTop:100}}>
    <UploadField></UploadField>
  </View>
  ) 
}
export default TestPage;
