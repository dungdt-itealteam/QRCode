import { Alert } from "react-native";

export const showAlertFailed = (callback) => {
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
export  default  {
  showAlertFailed
}
