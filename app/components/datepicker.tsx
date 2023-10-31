import React from "react";
<<<<<<< HEAD
import { Modal, View, Platform, StyleSheet, Button } from "react-native";
=======
import { Modal, View } from "react-native";
>>>>>>> eb47efea84703bbca855e74576b672acd0b8aa82
import DatePicker from "react-native-modern-datepicker";
import { ActionColor, BackgroundColor, SecondaryColor } from "./helpers/StyleVars";
import StyledButton from "./styledbutton";
import { AppropriateDatePickerProps } from "./helpers/interfaces";

const AppropriateDatePicker: React.FC<AppropriateDatePickerProps> = ({
  style,
  visibility,
  onPress,
  onChange,
}) => {
  const renderDatePicker = () => {
    
      return (
        <View style={style.modalView}>
          <View style={style.datePickerContsainer}>
            <DatePicker
              mode="calendar"
              onDateChange={(value) => onChange(value)} // Corrected prop name
              options={{
                backgroundColor: BackgroundColor,
                textHeaderColor: SecondaryColor,
                textDefaultColor: "white",
                selectedTextColor: "black",
                mainColor: ActionColor,
              }}
              maximumDate={'2005-05-10'}
              minimumDate={'1970-01-01'}
              current={'2005-05-10'}
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

export default AppropriateDatePicker;
