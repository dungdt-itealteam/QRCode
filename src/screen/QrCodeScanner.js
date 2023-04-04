import React, {useEffect} from 'react';
import MText from '../components/MText';
import Colors from '../constants/Colors';
import {TouchableOpacity, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {CameraScreen} from 'react-native-camera-kit';
import {useNavigation} from '@react-navigation/native';
import NameScreen from '../constants/NameScreen';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import Utils, {showAlertFailed} from '../utils/Utils';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import {ADS_ID} from '../constants/Constants';

const interstitial = InterstitialAd.createForAdRequest(ADS_ID, {
  requestNonPersonalizedAdsOnly: true,
});
const QrCodeScanner = () => {
  const navigation = useNavigation();
  const scanned = React.useRef(false);
  const refCamera = React.useRef(null);
  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);
  useEffect(() => {
    Utils.checkPermissionCamera();
    Utils.checkPermissionReadStorage();
  }, []);
  const getResultViaScanner = e => {
    interstitial.load();
    // if (scanned.current === true) {
    //   return;
    // }
    scanned.current = true;
    if (e && e.nativeEvent) {
      const codeStringValue = e?.nativeEvent?.codeStringValue || '';
      scanned.current = false;
      navigation.navigate(NameScreen.detailQrCode, {value: codeStringValue});
    } else {
      scanned.current = false;
    }
  };
  const onSelectImage = () => {
    interstitial.load();
    launchImageLibrary({
      includeBase64: true,
      selectionLimit: 1,
      mediaType: 'photo',
    })
      .then(r => {
        if (r && r.assets && r.assets[0] && r.assets[0].uri) {
          detectQrCodeString(r.assets[0].uri);
        }
      })
      .catch(e => {});
  };
  const detectQrCodeString = path => {
    RNQRGenerator.detect({
      uri: path,
    })
      .then(response => {
        const {values} = response; // Array of detected QR code values. Empty if nothing found.
        if (values && values.length > 0) {
          const codeStringValue = values[0];
          scanned.current = false;
          navigation.navigate(NameScreen.detailQrCode, {
            value: codeStringValue,
          });
        }
      })
      .catch(error => {
        showAlertFailed();
      });
  };
  return (
    <View style={{flex: 1}}>
      <MText
        font={'bold'}
        style={{
          marginTop: 30,
          color: Colors.white,
          fontSize: 18,
          alignSelf: 'center',
        }}>
        {'Scan QR Code'}
      </MText>
      <View
        style={{
          marginTop: 36,
          borderWidth: 1,
          width: 305,
          height: 305,
          borderRadius: 5,
          borderColor: Colors.white,
          alignSelf: 'center',
          overflow: 'hidden',
        }}>
        <CameraScreen
          // onBottomButtonPressed={hideQrCodeScreen}
          ref={refCamera}
          showFrame={false}
          scanBarcode={true}
          laserColor={'#38B9C0'}
          onReadCode={getResultViaScanner}
          cameraFlipImage={require('../res/images/switch-camera.png')}
        />
      </View>
      <MText
        style={{
          color: '#A4A2A2',
          fontSize: 13,
          marginTop: 24,
          alignSelf: 'center',
          marginHorizontal: 24,
          textAlign: 'center',
          lineHeight: 21,
        }}>
        {
          'The QR Code will be automatically detected when you position it between the guide lines'
        }
      </MText>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={onSelectImage} style={{marginTop: 0}}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 78,
              backgroundColor: '#282828',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 62,
                borderColor: '#585353',
                borderWidth: 1,
              }}
            />
            <View style={{position: 'absolute'}}>
              <Svg width={22} height={20} fill="none">
                <Path
                  d="M19 12v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2Zm.008-12c.548 0 .992.445.992.993V10h-2V2H2v13.999L12 6l3 3v2.829l-3-3L4.827 16H12v2H.992A.993.993 0 0 1 0 17.007V.993A1 1 0 0 1 .992 0h18.016ZM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
                  fill="#fff"
                />
              </Svg>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QrCodeScanner;
