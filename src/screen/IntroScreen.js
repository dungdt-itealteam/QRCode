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
      navigation.navigate(NameScreen.qrCodeScreen);
    }
  };
  return (
    <AppBackgroundGradient>
      <ScrollView bounces={false}>
        <View
          style={{
            marginTop: getOriginalSize(110),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.qrCode}
            style={{
              width: getOriginalSize(234),
              height: getOriginalSize(236),
            }}
          />
          <MText
            style={{
              marginTop: getOriginalSize(39),
              fontSize: 16,
              color: '#BDBDBD',
            }}>
            {'QRcode search engine'}
          </MText>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignSelf: 'center',
            width: 130,
            height: 130,
            backgroundColor: '#282828',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 130,
            marginTop: 84,
          }}>
          <View
            style={{
              width: 103.33,
              height: 103.33,
              borderRadius: 103,
              borderWidth: 1,
              borderColor: '#585353',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../res/images/camera.png')}
              style={{width: 42.5, height: 38.25}}
            />
          </View>
        </TouchableOpacity>
        <MText
          style={{
            fontSize: 16,
            color: '#BDBDBD',
            alignSelf: 'center',
            marginTop: getOriginalSize(24),
          }}>
          {'Click to Start'}
        </MText>
        <MText
          style={{
            fontSize: 16,
            color: '#BDBDBD',
            alignSelf: 'center',
            marginTop: getOriginalSize(138),
            textAlign: 'center',
          }}>
          {
            'The QR Code will be automaticly detected \nwhen you position it between the guide lines'
          }
        </MText>
      </ScrollView>
    </AppBackgroundGradient>
  );
};
export default IntroScreen;
