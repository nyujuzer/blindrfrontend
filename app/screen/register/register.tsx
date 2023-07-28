import react, { useState, useCallback } from 'react';
import { SafeAreaView, TouchableOpacity, Image, View, ScrollView,} from 'react-native';
// import NumberField from 'react-number-field'
import { ip } from '../../components/helpers/conf';
import { save, getValueOf } from "../../components/helpers/app.loginHelper";
import { RegisterStyles } from './registerStyle';
import {  ActionColor, global } from '../../components/helpers/StyleVars';
import { RadioButton, Card, FAB } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import InputField from '../../components/inputfield';
import PasswordField from '../../components/passwordfield';
import EmailField from '../../components/emailfield';
import Hobbies from '../../components/hobbies';
import StyledButton from '../../components/styledbutton';
import AppropriateDatePicker from '../../components/datepicker';
import xhtmlrequestBuilder from '../../components/helpers/request';
import { navProps } from '../../components/helpers/interfaces';



const RegSite = (prop: navProps) => {
  enum Groups {
    PREFERENCES,
    GENDER
  }
  const mindate = new Date().getFullYear()

  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
        email: '',
        password: '',
        conf: '',
        name: '',
        gender: '',
        preferences: '',
        hobbies: new Array(),
        age: '' || new Date()
  });

  function handleStylehange(value: string, caller: Groups) {

    var type = caller === Groups.GENDER ? formData.gender : formData.preferences

    if (type === value) {
      return {
        ...RegisterStyles.radioLabelActive,
      };
    }
    return RegisterStyles.radioLabelPassive;
  }
  function handleDateChange(date: Date) {
    setFormData(prev => ({ ...prev, age: date  }))
    console.log(formData.age)
  }

  function openModal() {
    console.log("trugg")
    setOpen(!open)
  }
  const handleSelectHobby = (id) => {
    const updatedHobbies = [...formData.hobbies]; // Create a copy of the existing hobbies array

    // Check if the selected hobby is already in the array
    const index = updatedHobbies.indexOf(id);
    if (index !== -1) {
      updatedHobbies.splice(index, 1); // Remove the hobby from the array
    } else {
      updatedHobbies.push(id); // Add the hobby to the array
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      hobbies: updatedHobbies,
    }));

    console.log(updatedHobbies);
  };

  //#region validations
  const register = () => {
    if (/* Validate() */1 == 1) {
      const test = new xhtmlrequestBuilder()
      const xhr = new xhtmlrequestBuilder()
      .to(ip)
      .atRoute("/register/")
      .asType("POST")
      .setHeaders({ "Content-Type": "application/json" })
      .message((formData))
      .onCompletion(function (response) {
        if (JSON.parse(response)["success"]) {
          save("email", formData.email);
          save("pass", formData.password);
          console.log(JSON.parse(response)['uid'])
          save("uid", JSON.parse(response)['uid'])
          prop.navigation.navigate("Login");
          console.log(response)
        } else {
          alert("Email is already in use");
        }
      })
      .send();
    }
  }

  const Validate = () => {
    if (checkHobbies() && checkPassAndConf() && checkLength() && containsUpperCase() && containsNumber() && checkEmail()) {
      if (mindate - 0 < 18) {
        return false
      } else {
        return true
      }
    } else {
      console.log(formData.password, formData.conf)
    }
  }
  const checkLength = () => {
    if (formData.password.length >= 8) {
      return true;
    } else {
      alert('Password must be at least 8 characters long.');
      return false;
    }
  };

  const checkEmail = () => {
    if (formData.email !== '') {
      return true;
    } else {
      alert('Email field cannot be empty.');
      return false;
    }
  };

  const checkPassAndConf = () => {
    if (formData.password === formData.conf) {
      return true;
    } else {
      alert('Password and confirmation password do not match.');
      return false;
    }
  };

  const checkHobbies = () => {
    var length = formData.hobbies.length > 0
    if (length) {
      return length
    } else {
      alert("Please choose at least one hobby!")
      return length
    }
  }
  const containsNumber = (): boolean => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let hasNumber = false;

    nums.forEach(num => {
      formData.password.split("").forEach(letter => {
        if (num === parseInt(letter)) {
          hasNumber = true;
        }
      });
    });

    if (hasNumber) {
      return true;
    } else {
      alert('Password must contain at least one number.');
      return false;
    }
  };

  const containsUpperCase = (): boolean => {
    let hasCapital = false;

    formData.password.split("").forEach(letter => {
      if (letter === letter.toUpperCase()) {
        hasCapital = true;
      }
    });

    if (hasCapital) {
      return true;
    } else {
      alert('Password must contain at least one uppercase letter.');
      return false;
    }
  };

  //#endregion
  return (
    <SafeAreaView style={[RegisterStyles.box]}>
      <View style={[{paddingBottom:20, alignSelf:'center'}]}>
        <TouchableOpacity>
          <AntDesign onPress={() => { prop.navigation.navigate("Login") }} name="leftcircle" size={50} color={ActionColor} style={{
            position: 'absolute',
            left:300,
            marginTop: 15,
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
          }} />
        </TouchableOpacity>
        <Image source={require("../../../img/knsz.png")} style={global.logo}></Image>

      </View>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='on-drag'>
        <Card style={RegisterStyles.card}>
          <Card.Title titleStyle={{ color: "white" }} title="Let's start with some personal details!" />
          <Card.Content>
            <InputField onChangeText={(text: string) => { setFormData(prev => ({ ...prev, name: text })) }} placeholder={'Name'}></InputField>
            <EmailField onChangeText={(text: string) => { setFormData(prev => ({ ...prev, email: text })) }}></EmailField>
            <PasswordField onChangeText={(text: string) => { setFormData(prev => ({ ...prev, password: text })) }}></PasswordField>
            <PasswordField onChangeText={(text: string) => { setFormData(prev => ({ ...prev, conf: text })) }}></PasswordField>
          </Card.Content>
        </Card>
        <Card style={[RegisterStyles.card]}>
          <Card.Title titleStyle={{ color: "white" }} title="And i'd like to ask for your birthday as well" />
          <View style={RegisterStyles.center}>
            <StyledButton text={"Set Your Birthday"} onPress={() => { openModal() }} />
          </View>
          </Card>
          <Card style={[RegisterStyles.card]}>
          <AppropriateDatePicker
            visibility={open}
            onPress={() => { openModal() }}
            style={{container:RegisterStyles.modalContainer, modalView:RegisterStyles.modalView}}
            onChange={(text: any) => { handleDateChange(text) }} />
          </Card>
        <Card style={RegisterStyles.card}>
          <Card.Title titleStyle={{ color: "white" }} title="You identify as..." />
          <RadioButton.Group
            value={formData.gender}
            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
          >
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <RadioButton.Item
                color={ActionColor}
                labelStyle={handleStylehange('male', Groups.GENDER)}
                status={formData.gender === 'male' ? 'checked' : 'unchecked'}
                value='male' label='male'
              />
              <RadioButton.Item
                color={ActionColor}
                labelStyle={handleStylehange('female', Groups.GENDER)}
                value='female'
                label='female'
                status={formData.gender === 'female' ? 'checked' : 'unchecked'} />
              <RadioButton.Item
                color={ActionColor}
                labelStyle={handleStylehange('enby', Groups.GENDER)}
                value='enby'
                label='enby'
                status={formData.gender === 'male' ? 'checked' : 'unchecked'} />

            </View>
          </RadioButton.Group>
        </Card>
        <Card style={RegisterStyles.card}>
          <Card.Title titleStyle={{ color: "white" }} title="And i also need what you're into..." />
          <RadioButton.Group
            value={formData.preferences}
            onValueChange={(value) => setFormData(prev => ({ ...prev, preferences: value }))}
          >
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <RadioButton.Item
                color={ActionColor}
                labelStyle={handleStylehange('male', Groups.PREFERENCES)}
                status={formData.preferences === 'male' ? 'checked' : 'unchecked'}
                value='male' label='male' />
              <RadioButton.Item
                color={ActionColor}
                labelStyle={handleStylehange('female', Groups.PREFERENCES)}
                value='female'
                status={formData.preferences === 'female' ? 'checked' : 'unchecked'}
                label='female' />
              <RadioButton.Item
                color={ActionColor}
                status={formData.preferences === 'any' ? 'checked' : 'unchecked'}
                labelStyle={handleStylehange('any', Groups.PREFERENCES)}
                value='any'
                label='any' />
            </View>
          </RadioButton.Group>
        </Card>
        <Card style={RegisterStyles.card}>
          <Card.Title titleStyle={{ color: "white" }} title="What do you do for fun?" />
          <Hobbies onSelectHobby={(id) => { handleSelectHobby(id) }} apiUrl={ip + "/getHobbies"} />
        </Card>
        <StyledButton text={"Continue"} onPress={() => { register() }} />
      </ScrollView>
    </SafeAreaView>

  )
}
export { RegSite }