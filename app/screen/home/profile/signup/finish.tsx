import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UploadField from "../../../../components/uploadfield";
import Slider from "@react-native-community/slider";
import StyledButton from "../../../../components/styledbutton";
import { getValueOf } from "../../../../components/helpers/app.loginHelper";
import { ip } from "../../../../components/helpers/conf";
import { theme } from "../../../../components/helpers/StyleVars";
import { Card } from "react-native-paper";
import TextArea from "../../../../components/textArea";
import { useNavigation } from "@react-navigation/native";

interface ImageProp {
  uri: string;
  type: string;
  name: string;
}

const Finish = () => {
  const nav = useNavigation();
  const [selectedImage, setSelectedImages] = useState<any | ImageProp>(null);
  const [bio, setBio] = useState<string>("");
  const [maxDist, setMaxDist] = useState(1);
  const [maxAge, setMaxAge] = useState(18);
  const [UID, setuid] = useState();

  useEffect(() => {
    getValueOf("uid").then((uid) => setuid(uid));
  }, [UID]);

  const handleSelection = (selection) => {
    setSelectedImages(selection);
  };
  const handleChange = (text) => {
    setBio(text);
  };
  const uploadImage = async (e) => {
    e.preventDefault()
    const data = new FormData(
      document.getElementById("form") as HTMLFormElement
    );
    // data.append("uid", UID);
    // data.append("maxDist", maxDist.toString());
    // data.append("maxAge", maxAge.toString());
    // data.append("image", selectedImage?.uri);
    // data.append("bio", bio);

    console.log(selectedImage, "\n", data, "THIS IS IT!!!");
    fetch(`${ip}/finishSignup/`, {
      method: "POST",
      mode: "no-cors",
      body: data,
      // headers: {"Content-Type": "multipart/form-data"}
    });
  };
  function fileSelectedHandler(event): void {
    console.log(event.target.file);
  }

  return (
    <View style={style.container}>
      <form id="form" onSubmit={uploadImage} method="post">
        <div>
          <img src="" alt="" />
          <input
            type="file"
            name="image"
            onChange={fileSelectedHandler}
            accept="image/*"
          />
          <input type="text" name="uid" id="" value={UID} />
          <textarea name="bio" id="" cols={30} rows={10}></textarea>
          <input type="range" name="maxDist" id="" />
          <input type="range" name="maxAge" id="" />
          <button>Submit</button>
        </div>
      </form>
      {/* <UploadField handleSelection={handleSelection} uid={UID} />
      <Card style={style.card}>
        <Card.Title titleStyle={{ color: "white" }} title="Bio" />
        <Card.Content>
          <TextArea 
            maxLength={150}
            value={bio}
            overlayText={`${bio.length}/150`}
            onChangeText={handleChange}
          ></TextArea>
        </Card.Content>
      </Card>
      <Card style={style.card}>
        <Card.Title
          title={"how far are you willing to go?"}
          titleStyle={{ color: "white" }}
        />
        <Card.Content>
          <Slider name="dist"
            minimumValue={1}
            maximumValue={110}
            step={1}
            minimumTrackTintColor={theme.secondary}
            maximumTrackTintColor={theme.secondary}
            thumbTintColor={theme.accent}
            onValueChange={(dist) => {
              setMaxDist(dist);
            }}
            value={maxDist}
            style={{ width: "100%", height: 20 }}
          ></Slider>
          <Text style={{ color: "white" }}>
            {maxDist < 100 ? maxDist : "Global"}KM
          </Text>
        </Card.Content>
      </Card>
      <Card style={style.card}>
        <Card.Title
          title={"What's the oldest You'll Date?"}
          titleStyle={{ color: "white" }}
        />
        <Card.Content>
          <Slider
            minimumValue={18}
            maximumValue={110}
            step={1}
            minimumTrackTintColor={theme.secondary}
            maximumTrackTintColor={theme.secondary}
            thumbTintColor={theme.accent}
            onValueChange={(dist) => {
              setMaxAge(dist);
            }}
            value={maxAge}
            style={{ width: "100%", height: 20 }}
          ></Slider>
          <Text style={{ color: "white" }}>
            {maxAge < 100 ? maxAge : "I don't care for age"}
          </Text>
        </Card.Content>
      </Card>
      <StyledButton text={"Upload Image"} onPress={uploadImage} />   */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.secondary,
  },
  card: {
    minWidth: "80%",
    width: "80%",
    backgroundColor: theme.primary,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default Finish;
