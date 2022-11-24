import { Alert, Platform } from "react-native";
import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
  check,
} from "react-native-permissions";

export const showAlertFailed = callback => {
  Alert.alert("Opps!", "Somethings went wrong.", [
    {
      text: "OK",
      onPress: () => {
        if (callback) {
          callback();
        }
      },
    },
  ]);
};
export const openSettingsPermission = () => {
  openSettings().catch(e => {
    console.log("OPEN SETTING FAILED", e);
  });
};
export const requestPermissionCameraAndroid = () => {
  request(PERMISSIONS.ANDROID.CAMERA)
    .then(result => {
    })
    .catch(e => {
      console.log("REQUEST CAMERA FAILED", e);
    });
};
export const checkPermissionCameraAndroid = () => {
  check(PERMISSIONS.ANDROID.CAMERA)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert("", "Camera is not available (on this device)");
          break;
        case RESULTS.DENIED:
          openSettingsPermission();
          break;
        case RESULTS.LIMITED:
          requestPermissionCameraAndroid();
          break;
        case RESULTS.GRANTED:
          break;
        case RESULTS.BLOCKED:
          openSettingsPermission();
          break;
        default:
          break;
      }
    })
    .catch(e => {
      console.log("CHECK CAMERA FAILED.", e);
    });
};
export const requestPermissionWriteStorageAndroid = () => {
  request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then(result => {
    })
    .catch(e => {
      console.log("REQUEST WRITE STORAGE FAILED", e);
    });
};
export const checkPermissionWriteStorageAndroid = () => {
  check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          Alert.alert("", "Camera is not available (on this device)");
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
      console.log("CHECK WRITE STORAGE FAILED.", e);
    });
};
export const checkAllPermission = () => {
  checkPermissionWriteStorageAndroid();
  checkPermissionCameraAndroid();
};
export default {
  showAlertFailed,
  checkPermissionCameraAndroid,
  checkPermissionWriteStorageAndroid,
  checkAllPermission,
};
