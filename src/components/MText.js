import React from 'react';
import {Text, View} from 'react-native';
import Fonts from '../constants/Fonts';

export const FontType = {
  normal: Fonts.normal,
  italic: Fonts.italic,
  semiBold: Fonts.semiBold,
  bold: Fonts.bold,
};
const MText = props => {
  const fontSize = props?.fontSize || 15;
  const font = props?.font || 'normal';
  return (
    <Text
      {...props}
      style={[
        {
          // width: '100%',
          fontSize,
          fontFamily: FontType[`${font}`],
        },
        props.style ? props.style : {},
      ]}>
      {props.children ? props.children : null}
    </Text>
  );
};
export default MText;
