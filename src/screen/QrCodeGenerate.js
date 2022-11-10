import React, { useEffect } from "react";
import {TouchableOpacity, View, PermissionsAndroid, Alert} from 'react-native';
import MText from '../components/MText';
import Colors from '../constants/Colors';
import Icons from '../constants/Icons';
import ModalEnterText from './ModalEnterText';
import {APP_NAME, logoAppBase64} from '../utils/AppInfo';
import QRCode from 'react-native-qrcode-svg';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Lottie from 'lottie-react-native';
import IOS from '../utils/MDeviceInfo';
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

const QrCodeGenerate = props => {
  const refModalEnterText = React.useRef(null);
  const refQrCode = React.useRef(null);
  const [state, setState] = React.useState({
    valueQR: '',
  });

  useEffect(() => {
    return interstitial.addAdEventListener(AdEventType.LOADED, () => {
      interstitial.show().then();
    });
  }, []);

  const onGenerate = text => {
    if (text === '') {
      return null;
    } else {
      setState(pre => {
        return {
          ...pre,
          valueQR: text,
        };
      });
    }
  };
  const onSaveQrCodeImage = async () => {
    interstitial.load();
    const time = new Date().getTime();
    const fileName = `${APP_NAME}_${time}.png`;
    if (refQrCode?.current?.toDataURL) {
      refQrCode.current.toDataURL(data => {
        writeFileToStorage(fileName, data);
      });
    }
  };
  const onOpenEnterText = () => {
    interstitial.load();
    if (refModalEnterText?.current?.show) {
      refModalEnterText.current.show(true);
    }
  };

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const writeFileToStorage = (fileName, data) => {
    console.log('FILE NAME', fileName);
    let path =
      (IOS ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) + fileName;
    console.log('PATH', path);
    RNFS.writeFile(path, data, 'base64')
      .then(success => {
        saveToGallery(fileName, data).then().catch();
      })
      .catch(error => {
        console.log('WRITE FILE FAILED', error);
        Alert.alert('Save to gallery failed!.');
      });
  };
  const saveToGallery = async (fileName, data) => {
    let path =
      (IOS ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) + fileName;
    CameraRoll.save(path, 'photo')
      .then(r => {
        Alert.alert('Save to gallery successfully!.');
      })
      .catch(e => {
        console.log('SAVE GALLERY FAILED', error);
        Alert.alert('Save to gallery failed!.');
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
          textAlign: 'center',
        }}>
        {'Generate QRCode'}
      </MText>

      {!state || !state.valueQR || state.valueQR === '' ? (
        <TouchableOpacity
          style={{
            marginTop: 36,
            width: 305,
            height: 305,
            borderRadius: 5,
            alignSelf: 'center',
          }}>
          <Lottie
            source={require('../res/json/qrcode.json')}
            autoPlay
            loop
            style={{borderRadius: 12, overflow: 'hidden'}}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{alignSelf: 'center', width: 305, height: 305, marginTop: 36}}>
          <QRCode
            style={{
              alignSelf: 'center',
              width: 305,
              height: 305,
              borderRadius: 5,
            }}
            getRef={c => {
              refQrCode.current = c;
            }}
            value={state.valueQR}
            logo={{uri: logoAppBase64}}
            logoSize={100}
            size={305}
            logoBackgroundColor={'rgba(0,0,0,0)'}
          />
        </View>
      )}

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
        {'We use search engine like Google so you can search anything you want'}
      </MText>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 36}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={onOpenEnterText}>
            {Icons.link()}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSaveQrCodeImage}
            style={{marginLeft: 53}}>
            {Icons.download()}
          </TouchableOpacity>
        </View>
      </View>
      <ModalEnterText onSubmit={onGenerate} ref={refModalEnterText} />
    </View>
  );
};
export default QrCodeGenerate;
