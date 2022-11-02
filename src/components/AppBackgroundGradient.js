import React from "react";
import { View } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../utils/MDeviceInfo";
import { Defs, LinearGradient, Rect, Stop, Svg } from "react-native-svg";

const AppBackgroundGradient = props => {
  const begin = props?.begin || "#131313";
  const end = props?.end || "#494949";
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          width: DEVICE_WIDTH,
          height: DEVICE_HEIGHT,
          top: 0,
          left: 0,
        }}>
        <Svg width={`${DEVICE_WIDTH}`} height={`${DEVICE_HEIGHT}`}>
          <Defs>
            <LinearGradient
              id="grad"
              // gradientUnits="userSpaceOnUse"
              x1="39.17%"
              y1="-7.39%"
              x2="60.83%"
              y2="107.39%">
              <Stop offset={0.013} stopColor={begin} />
              <Stop offset={0.97} stopColor={end} />
            </LinearGradient>
          </Defs>
          <Rect
            width={`${DEVICE_WIDTH}`}
            height={`${DEVICE_HEIGHT}`}
            fill="url(#grad)"
          />
        </Svg>
      </View>
      <View style={{ flex: 1 }}>{props.children ? props.children : null}</View>
    </View>
  );
};
export default AppBackgroundGradient;
