import React from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {ThemContext} from '../context/ThemeProvider';
import AppBackgroundGradient from '../components/AppBackgroundGradient';
import Images from '../constants/Images';
import MText from '../components/MText';
import {Circle, ClipPath, Defs, G, Path, Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import NameScreen from '../constants/NameScreen';
import {getOriginalSize} from '../utils/AppInfo';

const IntroScreen = () => {
  const navigation = useNavigation();
  const onPress = () => {
    if (navigation?.navigate) {
      setTimeout(() => {
        navigation.navigate(NameScreen.qrCodeScreen);
      }, 100);
    }
  };
  return (
    <AppBackgroundGradient>
      <View
        style={{
          marginTop: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={Images.qrCode}
          style={{
            width: getOriginalSize(110),
            height: getOriginalSize(110),
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
