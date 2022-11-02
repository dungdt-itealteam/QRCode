import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "../screen/IntroScreen";
import NameScreen from "../constants/NameScreen";
import QrCodeScreen from "../screen/QrCodeScreen";
import DetailQrCode from "../screen/DetailQrCode";

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      initRouteName={NameScreen.introScreen}
      initRoute={IntroScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/*<Stack.Screen name={NameScreen.detailQrCode} component={DetailQrCode} />*/}
      <Stack.Screen name={NameScreen.introScreen} component={IntroScreen} />
      <Stack.Screen name={NameScreen.qrCodeScreen} component={QrCodeScreen} />
      <Stack.Screen name={NameScreen.detailQrCode} component={DetailQrCode} />
    </Stack.Navigator>
  );
};
export default RootNavigator;
