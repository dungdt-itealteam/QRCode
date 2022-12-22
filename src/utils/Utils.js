import {Alert, Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from 'react-native-permissions';

export const showAlertFailed = callback => {
  Alert.alert('Opps!', 'Somethings went wrong.', [
    {
      text: 'OK',
      onPress: () => {
        if (callback) {
          callback();
        }
      },
    },
  ]);
};
export const openSettingsPermission = () => {
  let title = 'Open settings';
  let message = 'Allow permission for the app';
  Alert.alert(title, message, [
    {
      text: 'OK',
      onPress: () => {
        openSettings().catch(e => {
          console.log('OPEN SETTING FAILED', e);
        });
      },
    },
  ]);
};
export const requestPermissionWriteStorageAndroid = () => {
  request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then(result => {})
    .catch(e => {
      console.log('REQUEST WRITE STORAGE FAILED', e);
    });
};
export const checkPermissionWriteStorageAndroid = () => {
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert('', 'Camera is not available (on this device)');
          break;
        case RESULTS.DENIED:
          requestPermissionWriteStorageAndroid();
          break;
        case RESULTS.LIMITED:
          requestPermissionWriteStorageAndroid();
          break;
        case RESULTS.GRANTED:
          break;
        case RESULTS.BLOCKED:
          requestPermissionWriteStorageAndroid();
          break;
        default:
          break;
      }
    })
    .catch(e => {
      console.log('CHECK WRITE STORAGE FAILED.', e);
    });
};
export const checkAllPermission = () => {
  checkPermissionWriteStorageAndroid();
};

const requestPermission = permission => {
  request(permission)
    .then(result => {
      if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
        openSettingsPermission(permission);
      }
    })
    .catch(e => {
      console.log(`Request permission ${permission} failed.`);
    });
};
const requestPermissionController = (result, permission) => {
  switch (result) {
    case RESULTS.UNAVAILABLE:
      Alert.alert('', `${permission} is not available (on this device)`);
      break;
    case RESULTS.DENIED:
      requestPermission(permission);
      break;
    case RESULTS.LIMITED:
      requestPermission(permission);
      break;
    case RESULTS.GRANTED:
      break;
    case RESULTS.BLOCKED:
      openSettingsPermission();
      break;
    default:
      break;
  }
};
const checkPermissionCamera = () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  check(permission)
    .then(result => {
      requestPermissionController(result, permission);
    })
    .catch(e => {
      console.log('check permission camera failed', e);
    });
};
const checkPermissionReadStorage = () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  check(permission)
    .then(result => {
      requestPermissionController(result, permission);
    })
    .catch(e => {
      console.log('check permission camera failed', e);
    });
};

export default {
  showAlertFailed,
  checkPermissionWriteStorageAndroid,
  checkAllPermission,
  checkPermissionCamera,
  checkPermissionReadStorage,
};
