import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';
import MText from '../components/MText';
import Colors from '../constants/Colors';

export const TYPE_FEATURE = {
  SCAN: 'SCAN',
  GENERATE: 'GENERATE',
};
const MethodPicker = props => {
  const [state, setState] = React.useState(0);
  const buttons = [
    {
      id: 0,
      text: 'Scan QR',
      type: TYPE_FEATURE.SCAN,
    },
    {
      id: 1,
      text: 'Generate',
      type: TYPE_FEATURE.GENERATE,
    },
  ];
  const selectFeature = index => {
    if (index !== state) {
      setState(index);
    }
    if (props?.onScreen) {
      props.onScreen(index);
    }
  };
  return (
    <View
      style={{
        width: 305,
        height: 58,
        borderRadius: 30,
        backgroundColor: '#282828',
        position: 'absolute',
        bottom: 70,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {buttons.map((button, index) => {
        return (
          <TouchableOpacity
            key={index.toString()}
            onPress={() => selectFeature(index)}>
            {state === index ? (
              <ButtonSelected text={button?.text || ''} />
            ) : (
              <ButtonUnSelected text={button?.text || ''} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const ButtonSelected = ({text}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 140,
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        marginLeft: 4,
        marginTop: 4,
      }}>
      <View style={{position: 'absolute', top: 0, left: 0}}>
        <Svg width={150} height={50}>
          <Defs>
            <LinearGradient
              id="a"
              gradientUnits="userSpaceOnUse"
              x1="-8.79%"
              y1="35.4%"
              x2="108.79%"
              y2="64.6%">
              <Stop offset={0.054} stopColor="#a0a0a0" stopOpacity={0.55} />
              <Stop offset={0.92} stopColor="#3D3D3D" />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill="url(#a)" />
        </Svg>
      </View>
      <MText style={{fontSize: 14, color: Colors.white}}>{text}</MText>
    </View>
  );
};
const ButtonUnSelected = ({text}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        alignSelf: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        marginLeft: 6,
        marginTop: 4,
      }}>
      <MText style={{fontSize: 14, color: '#8A8A8A'}}>{text}</MText>
    </View>
  );
};
export default MethodPicker;
