import React from "react";
import { Alert, Linking, TouchableOpacity, View, Share } from "react-native";
import AppBackgroundGradient from "../components/AppBackgroundGradient";
import { DEVICE_WIDTH, StatusBarHeight } from "../utils/MDeviceInfo";
import { Circle, Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import Icons from "../constants/Icons";
import MText from "../components/MText";
import Clipboard from "@react-native-clipboard/clipboard";
import Fonts from "../constants/Fonts";
import QRCode from "react-native-qrcode-svg";
import { logoAppBase64 } from "../utils/AppInfo";

const DetailQrCode = ({ route }) => {
  const navigation = useNavigation();
  const data = route?.params?.value || "helafdlflsdflsflsfldsfsdf";
  const onGoBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };
  const onPress = () => {
    Clipboard.setString(data);
    Alert.alert("", "Copy success.");
  };
  const onOpenLink = () => {
    if (checkIsLink(data)) {
      navigateToBrowser(data);
    } else {
      Alert.alert("", "Invalid url.");
    }
  };
  const checkIsLink = text => {
    if (
      text.includes("http") ||
      text.includes("https") ||
      text.includes("file://")
    ) {
      return true;
    }
    return false;
  };
  const navigateToBrowser = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        Linking.openURL(url)
          .then(r => {
          })
          .catch(e => {
            Alert.alert("", "Cannot open url.");
          });
      })
      .catch(e => {
        Alert.alert("", "Cannot open url.");
      });
  };
  const onPressShare = () => {
    Share.share(
      {
        message: data,
      },
      {},
    )
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log("Share failed", e);
      });
  };
  return (
    <AppBackgroundGradient>
      <View style={{ flex: 1 }}>
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
        <View
          style={{
            flex: 1,
            backgroundColor: "#656565",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            marginTop: 25,
            alignItems: "center",
          }}>
          <View
            style={{
              // width: 153,
              // height: 153,
              backgroundColor: "white",
              marginTop: 25,
            }}
          >
            <QRCode
              style={{
                alignSelf: "center",
              }}
              size={130}
              value={data}
              logoBackgroundColor={"rgba(0,0,0,0)"}
            />
          </View>

          <View
            style={{
              width: DEVICE_WIDTH * 0.95,
              minHeight: 200,
              borderRadius: 25,
              backgroundColor: "#D9D9D9",
              marginTop: 25,
              padding: 10,
            }}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderColor: "gray",
                marginBottom: 10,
                paddingBottom: 10,
              }}>
              <MText style={{ fontSize: 18, fontFamily: Fonts.semiBold }}>
                {"Content"}
              </MText>
            </View>
            <MText onPress={onPress}>{data ? data : ""}</MText>
          </View>

          <View
            style={{
              marginTop: 38,
              marginBottom: 75,
              flexDirection: "row",
              alignItems: "space-around",
            }}>
            <TouchableOpacity
              onPress={onOpenLink}
              style={{ transform: [{ scale: 0.85 }] }}>
              {Icons.open()}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressShare}
              style={{ transform: [{ scale: 0.85 }] }}>
              {Icons.share()}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </AppBackgroundGradient>
  );
};
export default DetailQrCode;
