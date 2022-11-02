import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import AppBackgroundGradient from '../components/AppBackgroundGradient';
import {DEVICE_WIDTH, StatusBarHeight} from '../utils/MDeviceInfo';
import {Circle, Path, Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import Icons from '../constants/Icons';
import MText from '../components/MText';

const DetailQrCode = ({route}) => {
  const navigation = useNavigation();
  const data = route?.params?.value || null;
  const onGoBack = () => {
    if (navigation?.goBack) {
      navigation.goBack();
    }
  };
  return (
    <AppBackgroundGradient>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
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
            backgroundColor: '#656565',
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            marginTop: 25,
            alignItems: 'center',
          }}>
          <ScrollView
            bounces={false}
            style={{flex: 1}}
            contentContainerStyle={{paddingBottom: 0}}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                width: 153,
                height: 153,
                backgroundColor: 'white',
                marginTop: 25,
                alignSelf: 'center',
              }}
            />

            <View
              style={{
                width: DEVICE_WIDTH * 0.95,
                height: 383,
                borderRadius: 25,
                backgroundColor: '#D9D9D9',
                marginTop: 25,
                padding: 10,
              }}>
              <MText>{data ? data : ''}</MText>
            </View>

            <View
              style={{
                marginTop: 38,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity>{Icons.link()}</TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 59}}>
                  {Icons.open()}
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 59}}>
                  {Icons.share()}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </AppBackgroundGradient>
  );
};
export default DetailQrCode;
