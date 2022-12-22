import {Platform, Dimensions, StatusBar, NativeModules} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const IOS = Platform.OS === 'ios';
const iPhone12And12Pro = {w: 390, h: 844};
const iPhone12Mini = {w: 375, h: 812};
const iPhone12ProMax = {w: 428, h: 926};
const iPhoneSE2nd = {w: 375, h: 667};
const iPhone8PlusAnd7PlusAnd6SPlusAnd6Plus = {w: 414, h: 736};
const iPhone5S = {w: 320, h: 568};
const iPhone11And11ProMaxAndXRAndXSMax = {w: 414, h: 896};
const iPhone11ProAndXSAndX = {w: 375, h: 812};
const listIphone12 = [iPhone12And12Pro, iPhone12Mini, iPhone12ProMax];
const {height, width} = Dimensions.get('window');
export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;
export const isIPhoneSE2nd = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? (iPhoneSE2nd.w === width && iPhoneSE2nd.h === height) ||
      (iPhone8PlusAnd7PlusAnd6SPlusAnd6Plus.w === width &&
        iPhone8PlusAnd7PlusAnd6SPlusAnd6Plus.h === height) ||
      (iPhone5S.w === width && iPhone5S.h === height)
    : false;

export const isIPhone12 = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? listIphone12.findIndex(x => x.w === width && x.h === height) >= 0
    : false;

export const isIPhoneX = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? iPhone11ProAndXSAndX.w === width && iPhone11ProAndXSAndX.h === height
    : false;

export const isIPhoneXMax = () =>
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? iPhone11And11ProMaxAndXRAndXSMax.w === width &&
      iPhone11And11ProMaxAndXRAndXSMax.h === height
    : false;

export const StatusBarHeight = Platform.select({
  ios: isIPhone12() || isIPhoneXMax() ? 47 : isIPhoneX() ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export const getAndroidDeviceInfo = dim => {
  if (Platform.OS !== 'android') {
    console.warn(
      'react-native-extra-dimensions-android is only available on Android. Trying to access',
      dim,
    );
    return 0;
  } else {
    // android
    try {
      if (!NativeModules.AndroidDeviceInfo) {
        throw 'AndroidDeviceInfo not defined. Try rebuilding your project. e.g. react-native run-android';
      }
      const result = NativeModules.AndroidDeviceInfo[dim];

      if (typeof result !== 'number') {
        return result;
      }
      return result;
    } catch (e) {
      console.error(e);
    }
  }
};

export const getAndroidSoftMenuBarHeight = () => {
  return getAndroidDeviceInfo('SOFT_MENU_BAR_HEIGHT');
};

export const getAndroidSmartBarHeight = () => {
  return getAndroidDeviceInfo('SMART_BAR_HEIGHT');
};

export const isAndroidSoftMenuBarEnabled = () => {
  return getAndroidDeviceInfo('SOFT_MENU_BAR_ENABLED');
};

export const androidBottomBar = isAndroidSoftMenuBarEnabled()
  ? getAndroidSoftMenuBarHeight()
  : 0;

export const iOSBottomBar =
  isIPhoneXMax() || isIPhoneX() || isIPhone12() ? 34 : 0;

export const devicePaddingBottom = IOS
  ? 50 + StatusBarHeight
  : 50 + androidBottomBar;

const deviceName = '';
export const getDeviceName = async () => {
  return await DeviceInfo.getDeviceName();
};

const userAgent = '';
const getUserAgent = async () => {
  return await DeviceInfo.getUserAgent();
};

const uniqueId = DeviceInfo.getUniqueId();

export default {
  IOS,
  StatusBarHeight,
  isIPhone12,
  isIPhoneXMax,
  isIPhoneX,
  iPhoneSE2nd,
  androidBottomBar,
  devicePaddingBottom,
  iOSBottomBar,
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  getUserAgent,
  getDeviceName,
  deviceName,
  userAgent,
  uniqueId,
};
