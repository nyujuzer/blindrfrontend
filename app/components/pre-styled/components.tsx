import react, { useState, memo, useCallback, useEffect } from "react"
import { Pressable, Text, SafeAreaView, Image, TextInput, StyleSheet, View, Button, TouchableOpacity, ScrollView, DatePickerIOS, Modal, Platform } from "react-native"
import { ip } from "../helpers/conf"
import * as ImagePicker from 'expo-image-picker';
import { ActionColor, BackgroundColor, darkColor, SecondaryColor } from "../helpers/StyleVars";
import { RadioButton, } from "react-native-paper";
import DateTimePickerAndroid from '@react-native-community/datetimepicker'
import DatePicker from 'react-native-modern-datepicker'


const style = StyleSheet.create({
  radio: {
    flex: 3,
    flexDirection: "row",
  },
  btn: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    borderRadius: 5,
    marginHorizontal: 30,
    flexDirection: "row",
    backgroundColor: ActionColor
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
  InputFieldStyle: {
    height: 45,
    width: 300,
    fontSize: 20,
    opacity: 0.4,
    color: 'white',
    borderRadius: 6,
    borderColor: 'white',
    backgroundColor: 'black',
    borderStyle: "solid",
    borderWidth: 1,
    margin: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 200,
    borderRadius: 3,
    borderColor: "red",
    borderWidth: 3,
  },
  widthPlus: {
    width: 150
  },
  radioButton: {
    width: 30,
    height: 30,
    borderColor: "#CACACA",
    borderWidth: 2,
    backgroundColor: BackgroundColor,
    borderRadius: 100,
  }
})

const InputField = ({ onChangeText, placeholder }: any) => {
  return (
    <TextInput
      style={[style.InputFieldStyle]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor={"white"} />
  )
}

const PasswordField = ({ onChangeText }: any) => {
  return (
    <TextInput
      style={style.InputFieldStyle}
      placeholder="Password"
      placeholderTextColor={"white"}
      secureTextEntry={true}
      onChangeText={onChangeText}
      autoComplete="off"
    />
  );
};

const PictureDisplayField = () => {
  return (
    <ScrollView>

    </ScrollView>
  )
}
const EmailField = ({ onChangeText }: any) => {
  return (
    <TextInput

      style={[style.InputFieldStyle]}
      placeholder="Email"
      placeholderTextColor={"white"}
      keyboardType="email-address"
      autoCapitalize="none"
      onChangeText={onChangeText}
    />
  );
};

const MyImage = () => (
  <Image
    source={{ uri: ip + '/test' }}
    style={{ width: 200, height: 200 }}
  />
);

const StyledButton = ({ onPress, text, _style = null }: any) => {
  return (
    <Pressable style={({ pressed }) => [style.btn, _style, pressed && { opacity: 0.8 }]} onPress={onPress} >
      <Text style={style.text}>{text}</Text>
    </Pressable>
  )
}
const UploadField = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({ allowsMultipleSelection: true });

    if (pickerResult.canceled === true) {
      return;
    }

    const images = pickerResult.assets.map((asset) => {
      return {
        uri: asset.uri,
        type: 'image/jpeg', // Change this if your image is of a different type
        name: 'image.jpg', // Change this if you want a different name for your image file
      };
    });

    setSelectedImages(images);
    console.log(pickerResult.assets.map((asset) => asset.uri));
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch(ip + '/uploadImages/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Images uploaded successfully:', data);
      return data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  };

  return (
    <View style={[style.container, { marginBottom: 50 }]}>
      {selectedImages.map((image, index) => (
        <Image key={index} style={style.image} source={image} />
      ))}
      <Pressable style={[style.btn, style.widthPlus]} onPress={handleImageUpload}>
        <Text>Select Profile Images</Text>
      </Pressable>
    </View>
  );
};

const RadioGroup = ({ children, output }: any) => {
  const [val, setValue]: any = useState();

  return (
    <RadioButton.Group
      onValueChange={(v: any) => { setValue(v); output(v) }}
      value={val} >
      <View style={[style.radio, { maxHeight: 100 }]}>
        {children}
      </View>
    </RadioButton.Group>
  );
};

const Selection = ({ children }: any) => {

  for (let i = 0; i < children.length; i++) {
    <Pressable>
      {children[i]}
    </Pressable>
  }
}

const AppropriateDatePicker = ({ style, visibility, onPress, onchange }) => {
  // var Cdate = new Date()
  // const date = (Cdate.getFullYear()-18)+'-'+(Cdate.getMonth()+1)+'-'+Cdate.getDate().toString()
  const date = '2005-05-10'
  return (
    Platform.OS === "web"?
    (<Modal visible={visibility}
        animationType='slide'
        transparent={true}>
          <View style={style[0]}>
            <View style={style[1]}>
            <DatePicker 
            options={{
              backgroundColor:"#252525",
              textHeaderColor:ActionColor,
              textDefaultColor:darkColor,
              selectedTextColor: "white",
              mainColor:SecondaryColor,
            }}
            maximumDate={date}
            minimumDate={'1970-05-10'}
            current={date}
            mode="calendar"
            onSelectedChange={(value)=>onchange(value)}
            />
            <StyledButton
            text={"Set Birthday"}
            onPress={()=>onPress()}/>
            </View>
          </View>
          </Modal>
        ):(
          <Modal visible={visibility}
        animationType='slide'
        transparent={true}>
<View>
      <DateTimePickerAndroid 
      onChange={(value)=>{onchange(new Date(value.nativeEvent.timestamp).toLocaleDateString())}}
       value={new Date()}
      display="spinner"
      mode="date"
      maximumDate={new Date(2005, 6, 10)}
      minimumDate={new Date(1970, 6, 10)}/>
</View>
</Modal>)
  )
}


const DatabaseComponent = ({ apiUrl, onSelectHobby }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        if (responseData && responseData.hobbies) {
          const hobbiesData = responseData.hobbies.map((item) => ({
            ...item,
            selected: false,
          }));
          setData(hobbiesData);
        }
      }
    };
    xhr.send();
  };

  const handleToggle = (index) => {
    const updatedData = data.map((item, idx) =>
      idx === index ? { ...item, selected: !item.selected } : item
    );
    setData(updatedData);

    const selectedHobby = updatedData.find((item) => item.selected);
    if (selectedHobby) {
      onSelectHobby(index+1);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleToggle(index)}
          style={[
            styles.item,
            item.selected ? styles.selectedItem : null,
          ]}
        >
          <Text style={styles.buttonText}>{item.hobby}</Text>
          {item.expanded && <Text>{item.description}</Text>}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedItem: {
    backgroundColor: ActionColor,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const MatchMaker = ()=>{
  return(
    <View style={{backgroundColor:"white",
    width:"100%", height:"100%"}}>
      <Text>hello world</Text>
    </View>
  )
}







export { DatabaseComponent, AppropriateDatePicker, Selection, PasswordField, EmailField, UploadField, StyledButton, InputField, RadioGroup, MatchMaker };