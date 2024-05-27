import React from "react";
import { Modal, View, Platform, StyleSheet, Button } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { theme } from "./helpers/StyleVars";
import StyledButton from "./styledbutton";
import { AppropriateDatePickerProps } from "./helpers/interfaces";

const CCDatePicker: React.FC<AppropriateDatePickerProps> = ({
  style,
  visibility,
  onPress,
  onChange,
}) => {
  const renderDatePicker = () => {
    const date = new Date();
    console.log(date.getDate());
      
      return (
        <View style={style.modalView}>
          <View style={style.datePickerContsainer}>
            <DatePicker
              mode="calendar"
              onDateChange={(value) => onChange(value)} // Corrected prop name
              options={{
                backgroundColor: theme.primary,
                textHeaderColor: theme.secondary,
                textDefaultColor: "white",
                selectedTextColor: "black",
                mainColor: theme.accent
              }}
              maximumDate={"2006-01-01"}
              minimumDate={'1970-01-01'}
              current={"2005-01-01"}
            />
          </View>
          <StyledButton text="Set Birthday" onPress={() => {onPress(); }} />
        </View>
      );
    }

  return (
    <Modal style={{width:30, height:30}} visible={visibility} animationType="slide" transparent={true}>
      {renderDatePicker()}
    </Modal>
  );
  };

export default CCDatePicker;
