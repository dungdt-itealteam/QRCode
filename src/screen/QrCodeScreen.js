import React from "react";
import AppBackgroundGradient from "../components/AppBackgroundGradient";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { StatusBarHeight } from "../utils/MDeviceInfo";
import QrCodeScanner from "./QrCodeScanner";
import { useNavigation } from "@react-navigation/native";
import MethodPicker from "./MethodPicker";
import QrCodeGenerate from "./QrCodeGenerate";

const QrCodeScreen = () => {
  const [state, setState] = React.useState({
    indexScreen: 0,
  });
  const navigation = useNavigation();
  const onGoBack = () => {
    if (navigation?.goBack()) {
      navigation.goBack();
    }
  };
  const onScreen = (index) => {
    setState(pre => {
      return {
        ...pre,
        indexScreen: index,
      };
    });
  };
  return (
    <AppBackgroundGradient>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingTop: StatusBarHeight,
            paddingLeft: 30,
          }}>
          <TouchableOpacity onPress={onGoBack}>
            <Svg width={48} height={48} fill="none">
              <Circle cx={24} cy={24} r={23.5} fill="#191919" stroke="#fff" />
              <Path
                d="M18.938 14 13 19.938l5.938 5.937"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Path
                d="M13 19.938h9.5c6.559 0 11.875 5.316 11.875 11.875V33"
                stroke="#fff"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {state.indexScreen === 0 ? <QrCodeScanner /> : <QrCodeGenerate />}
        </View>
        <MethodPicker onScreen={onScreen} />
      </ScrollView>
    </AppBackgroundGradient>
  );
};
export default QrCodeScreen;
