import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ActionColor } from "./helpers/StyleVars";

const DatabaseComponent = ({ apiUrl, onSelectHobby }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData && responseData.hobbies) {
          const hobbiesData = responseData.hobbies.map((item: any) => ({
            ...item,
            selected: false,
          }));
          setData(hobbiesData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleToggle = (index: number) => {
    const updatedData = data.map((item: any, idx: number) =>
      idx === index ? { ...item, selected: !item.selected } : item
    );
    setData(updatedData);

    const selectedHobby = updatedData.find((item: any) => item.selected);
    if (selectedHobby) {
      onSelectHobby(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item: any, index: number) => (
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
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    opacity:0.5,
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    minWidth: 80,
  },
  selectedItem: {
    opacity:1.0,
    backgroundColor: ActionColor,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default DatabaseComponent;
