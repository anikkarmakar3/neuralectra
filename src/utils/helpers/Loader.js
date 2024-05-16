import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Image,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
// import { Colors, Images } from '../../themes/Themes';
import normalize from './normalize';
export default function Loader(props) {
  return props.visible ? (
    <View
      style={[
        {
          position: 'absolute',
          backgroundColor: 'rgba(1,1,1,.5)',
          zIndex: 999,
          top: 0,
          left: 0,
          height: Dimensions.get('screen').height,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.modal == true
          ? {height: '133%', width: '116.5%', borderRadius: normalize(15)}
          : null,
      ]}>
      <View
        style={{
          //   backgroundColor: Colors.white,
          height: normalize(140),
          width: normalize(140),
          borderRadius: normalize(10),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
        {/* <Progress.Circle progress={0.4} size={50}>
          <Text style={{position: 'absolute', alignSelf: 'center'}}>abc</Text>
        </Progress.Circle> */}
        <ActivityIndicator
          //   style={{height: normalize(140), width: normalize(140)}}
          size={'large'}
          color={'white'}></ActivityIndicator>
      </View>
    </View>
  ) : null;
}

Loader.propTypes = {
  visible: PropTypes.bool,
  modal: PropTypes.bool,
};

Loader.defaultProps = {
  modal: false,
  visible: false,
};
