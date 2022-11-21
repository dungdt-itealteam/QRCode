/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ThemeProvider from "./src/context/ThemeProvider";
import RootNavigator from "./src/navigator/RootNavigator";
import RNBootSplash from "react-native-bootsplash";
import { View } from "react-native";
import {
  AppOpenAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdEventType,
} from "react-native-google-mobile-ads";
import Utils, { checkAllPermission } from "./src/utils/Utils";

const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ["fashion", "clothing"],
});

const App = () => {
  useEffect(() => {
    checkAllPermission();
    const unsubscribeLoaded = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        appOpenAd.show().then();
      },
    );
    return () => {
      unsubscribeLoaded();
    };
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer
        onReady={() => {
          RNBootSplash.hide({ fade: true }).then();
          appOpenAd.load();
        }}>
        <RootNavigator />
      </NavigationContainer>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          justifyContent: "center",
        }}>
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
      </View>
    </ThemeProvider>
  );
};

export default App;
