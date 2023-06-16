import React from "react";
import { Modal, View, Platform, StyleSheet, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-modern-datepicker";

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
  const currentDate = new Date();

  const handleDateChange = (event: any, date: Date | undefined) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      onChange(formattedDate);
    }
  };

  const renderDatePicker = () => {
    if (Platform.OS === "web") {
      return (
        <View style={style.modalContainer}>
          <View style={style.datePickerContainer}>
            <DatePicker
              mode="calendar"
              onSelectedChange={(value) => onChange(value)}
              options={{
                backgroundColor: "#252525",
                textHeaderColor: "blue",
                textDefaultColor: "white",
                selectedTextColor: "white",
                mainColor: "blue",
              }}
              maximumDate={new Date()}
            />
          </View>
          <Button title="Set Birthday" onPress={onPress} />
        </View>
      );
    } else {
      return (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      );
    }
  };

  return (
    <Modal visible={visibility} animationType="slide" transparent={true}>
      {renderDatePicker()}
    </Modal>
  );
};

export default AppropriateDatePicker;
