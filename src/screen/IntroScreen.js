import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity, StatusBar} from 'react-native';
import AppBackgroundGradient from '../components/AppBackgroundGradient';
import MText from '../components/MText';
import {useNavigation} from '@react-navigation/native';
import NameScreen from '../constants/NameScreen';
import {
  TestIds,
  InterstitialAd,
  AdEventType,
} from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

const IntroScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  const onPress = () => {
    interstitial.load();
    setTimeout(() => {
      navigation.navigate(NameScreen.qrCodeScreen);
    }, 100);
  };

  return (
    <AppBackgroundGradient>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View
        style={{
          marginTop: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../res/images/logo-2.jpg')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 20,
          }}
        />
        <MText
          style={{
            marginTop: 30,
            fontSize: 18,
            fontFamily: 'Montserrat-Bold',
            color: 'white',
          }}>
          {'QRCode Search Engine'}
        </MText>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          alignSelf: 'center',
          width: 100,
          height: 100,
          backgroundColor: '#282828',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 130,
          marginTop: 84,
        }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 103,
            borderWidth: 2,
            borderColor: '#585353',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../res/images/camera.png')}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style={{marginTop: 12}}>
        <MText
          style={{
            fontSize: 14,
            color: '#BDBDBD',
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          {'Click to Start'}
        </MText>
      </TouchableOpacity>
      <MText
        style={{
          fontSize: 14,
          color: '#BDBDBD',
          alignSelf: 'center',
          textAlign: 'center',
          position: 'absolute',
          bottom: 70,
          left: 12,
          right: 12,
          lineHeight: 21,
        }}>
        {
          'The QR Code will be automatically detected when you position it between the guide lines'
        }
      </MText>
    </AppBackgroundGradient>
  );
};
export default IntroScreen;
