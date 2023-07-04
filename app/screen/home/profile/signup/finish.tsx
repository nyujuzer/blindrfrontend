import React, { useState } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import UploadField from '../../../../components/uploadfield';
import axios from 'axios'
import StyledButton from '../../../../components/styledbutton';
import { getValueOf } from '../../../../components/helpers/app.loginHelper';
import { ip } from '../../../../components/helpers/conf';
import Form from '../../../../components/form';
import { Button } from 'react-native-paper';


const Finish = ()=>{
    const [selectedImage, setSelectedImages] = useState();
    const [UID, setuid] = useState()
    getValueOf("uid").then((uid)=>setuid(uid))

    
      return (
        <View style={{paddingTop:30}}>
          <UploadField uid={UID}></UploadField>
        </View>
        )
}
export default Finish