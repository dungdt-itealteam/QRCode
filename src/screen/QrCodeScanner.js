import React from 'react';
import MText from '../components/MText';
import Colors from '../constants/Colors';
import {Alert, Linking, TouchableOpacity, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {CameraScreen, Camera} from 'react-native-camera-kit';
import {useNavigation} from '@react-navigation/native';
import NameScreen from '../constants/NameScreen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import {showAlertFailed} from '../utils/Utils';

const QrCodeScanner = () => {
  const navigation = useNavigation();
  const scanned = React.useRef(false);
  const navigateToBrowser = url => {
    Linking.canOpenURL(url)
      .then(supported => {
        scanned.current = false;
        Linking.openURL(url)
          .then(r => {})
          .catch(e => {
            showAlertFailed(() => {
              scanned.current = false;
              navigation.navigate(NameScreen.detailQrCode, {value: url});
            });
          });
      })
      .catch(e => {
        scanned.current = false;
        navigation.navigate(NameScreen.detailQrCode, {value: url});
      });
  };
  const checkIsLink = text => {
    if (
      text.includes('http') ||
      text.includes('https') ||
      text.includes('file://')
    ) {
      return true;
    }
    return false;
  };
  const getResultViaScanner = e => {
    console.log('EVENT', e);
    if (scanned.current === true) {
      return;
    }
    if (e && e.nativeEvent) {
      scanned.current = true;
      const codeStringValue = e?.nativeEvent?.codeStringValue || '';
      const isLink = checkIsLink(codeStringValue);
      if (isLink) {
        navigateToBrowser(codeStringValue);
      } else {
        scanned.current = false;
        navigation.navigate(NameScreen.detailQrCode, {value: codeStringValue});
      }
    }
  };
  const onSelectImage = () => {
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
        console.log('VALUE STINGF', values);
        if (values && values.length > 0) {
          const codeStringValue = values[0];
          const isLink = checkIsLink(codeStringValue);
          if (isLink) {
            navigateToBrowser(codeStringValue);
          } else {
            scanned.current = false;
            navigation.navigate(NameScreen.detailQrCode, {
              value: codeStringValue,
            });
          }
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
          marginTop: 92,
          color: Colors.white,
          fontSize: 18,
          alignSelf: 'center',
        }}>
        {'Scan QR Code of the device'}
      </MText>

      <View
        style={{
          marginTop: 36,
          borderWidth: 1,
          width: 305,
          height: 305,
          borderColor: Colors.white,
          alignSelf: 'center',
          overflow: 'hidden',
        }}>
        <CameraScreen
          // onBottomButtonPressed={hideQrCodeScreen}
          showFrame={false}
          scanBarcode={true}
          laserColor={'#38B9C0'}
          onReadCode={getResultViaScanner}
        />
      </View>

      <MText
        style={{
          marginTop: 36,
          color: '#A4A2A2',
          fontSize: 14,
          textAlign: 'center',
        }}>
        {
          'The QR Code will be automaticly detected\nwhen you position it between the guide lines'
        }
      </MText>

      <TouchableOpacity onPress={onSelectImage} style={{marginTop: 36}}>
        <View
          style={{
            width: 78,
            height: 78,
            borderRadius: 78,
            backgroundColor: '#282828',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: 62,
              height: 62,
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
  );
};
export default QrCodeScanner;