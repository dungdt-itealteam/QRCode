import React from "react";
import Colors from "../constants/Colors";
import { useColorScheme, View } from "react-native";
import { scaleX, scaleY } from "../utils/AppInfo";

export const ThemContext = React.createContext(null);
const theme = {
  light: Colors.light_background,
  dark: Colors.dark_background,
};
const reducer = (action, state) => {
  switch (action.type) {
    case "SET_SYSTEM_THEME":
      return action.theme;
    default:
      return state;
  }
};
const ThemeProvider = props => {
  const systemTheme = useColorScheme();
  const [appTheme, setAppTheme] = React.useReducer(
    reducer,
    systemTheme === "dark" ? theme.dark : theme.dark,
  );
  return (
    <ThemContext.Provider value={{ appTheme, setAppTheme }}>
      <View style={{ flex: 1 }}>
        {props.children ? props.children : null}
      </View>
    </ThemContext.Provider>
  );
};
export default ThemeProvider;
