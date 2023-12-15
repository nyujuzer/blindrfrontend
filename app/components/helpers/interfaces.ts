import { StackNavigationProp } from "@react-navigation/stack";
import { StyleProp, ViewStyle } from "react-native";

interface AppropriateDatePickerProps {
  style: any;
  visibility: boolean;
  onPress: () => void;
  onChange: (value: string) => void;
}
interface xhtmlrequestdetails {
  ip: string;
  route: string;
  _onReadyStateChange: Function;
  _requestType: "GET" | "POST";
  _body: object;
  _headers: Record<string, string>;
}

interface navProps {
  navigation: any;
}
interface imageUploadProps {
  handleSelection: (img: any) => void;
  uid: string;
}
interface styledbuttonProps {
  onPress: () => void;
  text: string | JSX.Element;
  style?: StyleProp<ViewStyle>;
  isDisabled?: boolean;
}

export {
  AppropriateDatePickerProps,
  xhtmlrequestdetails,
  navProps,
  imageUploadProps,
  styledbuttonProps,  
};  
