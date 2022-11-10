/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ThemeProvider from './src/context/ThemeProvider';
import RootNavigator from './src/navigator/RootNavigator';
import RNBootSplash from 'react-native-bootsplash';
import {AppState, View} from 'react-native';
import {
  AppOpenAd,
  InterstitialAd,
  RewardedAd,
  BannerAd,
  TestIds,
  BannerAdSize,
  AdEventType,
} from 'react-native-google-mobile-ads';
const appOpenAd = AppOpenAd.createForAdRequest(TestIds.APP_OPEN, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

appOpenAd.load();
const App = () => {
  // const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = appOpenAd.addAdEventListener(
      AdEventType.LOADED,
      () => {
        appOpenAd.show().then();
      },
    );
    return () => {
      unsubscribeLoaded.remove();
    };
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer
        onReady={() => {
          RNBootSplash.hide({fade: true});
        }}>
        <RootNavigator />
      </NavigationContainer>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} />
      </View>
    </ThemeProvider>
  );
};

export default App;
