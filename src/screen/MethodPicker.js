import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Defs, LinearGradient, Rect, Stop, Svg} from 'react-native-svg';
import MText from '../components/MText';
import Colors from '../constants/Colors';

export const TYPE_FEATURE = {
  SCAN: 'SCAN',
  GENERATE: 'GENERATE',
};
const MethodPicker = (props) => {
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
    if(props?.onScreen){
      props.onScreen(index);
    }
  };
  return (
    <View
      style={{
        width: 339,
        height: 91,
        borderRadius: 30,
        backgroundColor: '#282828',
        marginBottom: 49,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 36,
      }}>
      {buttons.map((button, index) => {
        return (
          <TouchableOpacity
            onPress={() => selectFeature(index)}
            style={{
              flex: 1,
              height: 77,
              padding: 7,
            }}>
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
        width: 155,
        height: 77,
        borderRadius: 20,
        overflow: 'hidden',
      }}>
      <View style={{position: 'absolute', top: 0, left: 0}}>
        <Svg width={155} height={77}>
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
      <MText style={{fontSize: 16, color: Colors.white}}>{text}</MText>
    </View>
  );
};
const ButtonUnSelected = ({text}) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 155,
        height: 77,
      }}>
      <MText style={{fontSize: 16, color: '#8A8A8A'}}>{text}</MText>
    </View>
  );
};
export default MethodPicker;
