import React from "react";
import Modal from "react-native-modal";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  StatusBarHeight,
} from "../utils/MDeviceInfo";
import Icons from "../constants/Icons";
import AppBackgroundGradient from "../components/AppBackgroundGradient";
import MText from "../components/MText";
import Fonts from "../constants/Fonts";

const Component = (props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [input, setInput] = React.useState("");
  React.useImperativeHandle(ref, () => ({
    show: isVisible => {
      setVisible(isVisible);
    },
  }));
  const onChangeText = value => {
    setInput(value);
  };
  const onCancel = () => {
    setInput("");
    setVisible(false);
  };
  const onSubmit = text => {
    setVisible(false);
    if (props?.onSubmit) {
      props.onSubmit(text);
    }
  };
  const onSubmitEditing = ({ nativeEvent }) => {
    const text = nativeEvent?.text || "";
    if (text === "") {
      onSubmit(input);
    } else {
      onSubmit(text);
    }
  };
  return (
    <Modal isVisible={visible} style={{ justifyContent: "flex-end", margin: 0 }}>
      <AppBackgroundGradient>
        <View
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            paddingTop: StatusBarHeight,
          }}>
          <View style={{ flexDirection: "row", paddingHorizontal: 16 }}>
            <TouchableOpacity onPress={onCancel}>
              <Image source={require('../res/images/left-arrow.png')} style={{width: 30, height: 30, tintColor: 'white'}}/>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={() => onSubmit(input)}>
              <Image source={require('../res/images/check-mark.png')} style={{width: 30, height: 30, tintColor: 'white'}}/>
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 1, marginTop: 8 }}>
            <MText
              style={{
                fontSize: 20,
                fontFamily: Fonts.bold,
                color: "white",
                alignSelf: "center",
                textAlign: "center",
              }}>
              Enter your text
            </MText>
            <MText
              style={{
                fontSize: 13,
                fontFamily: Fonts.normal,
                color: "white",
                alignSelf: "center",
                marginTop: 27,
                textAlign: "center",
              }}>
              {'(Your QR code will be generated automatically)'}
            </MText>
            <TextInput
              autoFocus
              style={{
                fontFamily: Fonts.semiBold,
                color: 'white',
                fontSize: 14,
                width: DEVICE_WIDTH * 0.9,
                height: 80,
                borderRadius: 5,
                alignSelf: 'center',
                backgroundColor: 'gray',
                marginTop: 27,
              }}
              placeholder={'Enter text here...'}
              multiline
              numberOfLines={1000}
              cursorColor={"white"}
              textAlign={"center"}
              value={input}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
          </View>
        </View>
      </AppBackgroundGradient>
    </Modal>
  );
};
Component.displayName = "ModalEnterText";
const ModalEnterText = React.forwardRef(Component);
export default ModalEnterText;
