import React from "react";
import { Modal, View, Platform, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-modern-datepicker";
import { ActionColor, BackgroundColor, SecondaryColor } from "./helpers/StyleVars";
import StyledButton from "./styledbutton";

interface AppropriateDatePickerProps {
  style: any;
  visibility: boolean;
  onPress: () => void;
  onChange: (value: string) => void;
}

const AppropriateDatePicker: React.FC<AppropriateDatePickerProps> = ({
  style,
  visibility,
  onPress,
  onChange,
}) => {
  const renderDatePicker = () => {
    if (Platform.OS === "android") {
      return (
        <View style={style.modalContainer}>
          <View style={style.datePickerContainer}>
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
    // Add an else branch if necessary for other platforms
  };

  return (
    <Modal style={style.datePickerContainer} visible={visibility} animationType="slide" transparent={true}>
      {renderDatePicker()}
    </Modal>
  );
};

export default AppropriateDatePicker;
