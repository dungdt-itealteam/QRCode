import {Circle, ClipPath, Defs, G, Path, Svg} from 'react-native-svg';
import {View} from 'react-native';

export default {
  link: () => (
    <Svg width={78} height={78} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx={39} cy={39} r={39} fill="#282828" />
      <Circle cx={39} cy={39} r={30.5} stroke="#585353" />
      <Path
        d="M40.544 37.456a4.368 4.368 0 0 0-6.176 0l-3.089 3.088a4.368 4.368 0 0 0 6.177 6.177L39 45.177"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M37.456 40.544a4.368 4.368 0 0 0 6.176 0l3.089-3.088a4.368 4.368 0 0 0-6.177-6.177L39 32.823"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  download: () => (
    <View
      style={{
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 62,
          height: 62,
          borderWidth: 1,
          borderRadius: 31,
          borderColor: '#585353',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg width={20} height={18} fill="none">
          <Path
            d="M11 7h5l-6 6-6-6h5V0h2v7Zm-9 9h16V9h2v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V9h2v7Z"
            fill="#fff"
          />
        </Svg>
      </View>
    </View>
  ),
  open: () => (
    <View
      style={{
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 62,
          height: 62,
          borderWidth: 1,
          borderRadius: 31,
          borderColor: '#585353',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg width={20} height={20} fill="none">
          <Path
            d="M9 .05v2.012A8.001 8.001 0 0 0 10 18a8 8 0 0 0 7.938-7h2.013c-.502 5.053-4.766 9-9.951 9-5.523 0-10-4.477-10-10C0 4.815 3.947.551 9 .05Zm9 3.364-8 8L8.586 10l8-8H12V0h8v8h-2V3.414Z"
            fill="#fff"
          />
        </Svg>
      </View>
    </View>
  ),
  share: () => (
    <View
      style={{
        width: 78,
        height: 78,
        borderRadius: 39,
        backgroundColor: '#282828',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 62,
          height: 62,
          borderWidth: 1,
          borderRadius: 31,
          borderColor: '#585353',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Svg width={19} height={22} fill="none">
          <Path
            d="m11.12 16.023-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755v.001ZM4 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
            fill="#fff"
          />
        </Svg>
      </View>
    </View>
  ),
  back: () => (
    <Svg width={48} height={48} fill="none">
      <Circle cx={24} cy={24} r={23.5} fill="#191919" stroke="#fff" />
      <Path
        d="M18.938 14 13 19.938l5.938 5.937"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 19.938h9.5c6.559 0 11.875 5.316 11.875 11.875V33"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  ),
  check: () => (
    <Svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg">
      <Circle cx={24} cy={24} r={23.5} fill="#191919" stroke="#fff" />
      <G clipPath="url(#a)">
        <Path
          d="M21.167 28.494 34.189 15.47l2.004 2.003L21.167 32.5l-9.016-9.016 2.003-2.003 7.013 7.013Z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" transform="translate(7 7)" d="M0 0h34v34H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
};
