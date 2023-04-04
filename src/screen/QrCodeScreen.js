import React, {useEffect} from 'react';
import AppBackgroundGradient from '../components/AppBackgroundGradient';
import {Image, TouchableOpacity, View} from 'react-native';
import {StatusBarHeight} from '../utils/MDeviceInfo';
import QrCodeScanner from './QrCodeScanner';
import {useNavigation} from '@react-navigation/native';
import MethodPicker from './MethodPicker';
import QrCodeGenerate from './QrCodeGenerate';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {ADS_ID} from '../constants/Constants';

const interstitial = InterstitialAd.createForAdRequest(ADS_ID, {
  requestNonPersonalizedAdsOnly: true,
});

const QrCodeScreen = () => {
  const [state, setState] = React.useState({
    indexScreen: 0,
  });
  const navigation = useNavigation();

  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  const onGoBack = () => {
    if (navigation?.goBack()) {
      navigation.goBack();
    }
  };
  const onScreen = index => {
    interstitial.load();
    setState(pre => {
      return {
        ...pre,
        indexScreen: index,
      };
    });
  };
  return (
    <AppBackgroundGradient>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: StatusBarHeight,
          paddingLeft: 16,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onGoBack}>
          <Image
            source={require('../res/images/left-arrow.png')}
            style={{width: 30, height: 30, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {state.indexScreen === 0 ? <QrCodeScanner /> : <QrCodeGenerate />}
      </View>
      <MethodPicker onScreen={onScreen} />
    </AppBackgroundGradient>
  );
};
export default QrCodeScreen;
