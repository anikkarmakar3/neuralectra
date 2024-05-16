import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import PropTypes from 'prop-types';

import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import icons from '../../constants/icons';

export default function TextInputItem(props) {
  const [eyeVisible, setEyeVisible] = useState(true);
  const [blurview, setblurview] = useState(false);
  function onChangeText(text) {
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  }

  //onrightimpress
  function onrightimpress() {
    if (props.onrightimpress) {
      props.onrightimpress();
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        width: props.width,
        // justifyContent: 'flex-end',
        alignItems: props.alignTextItem,
        // alignSelf: 'flex-end',
        height: props.height,
        borderWidth: props.borderWidth,
        borderColor: blurview ? props.viewbordercolor : props.boxBorderColor,
        borderRadius: props.borderRadius,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        backgroundColor: props.backgroundColor,
        // backgroundColor: 'red',
        // paddingLeft: normalize(10),
        borderBottomColor: blurview
          ? props.viewborderbottomcolor
          : props.borderColor,
        borderBottomWidth: props.borderBottomWidth,
      }}>
      {props.isleftIconVisible && (
        <Image
          resizeMode="contain"
          source={props.leftIcon}
          style={{width: normalize(15), height: normalize(15)}}
        />
      )}
      <TextInput
        style={[
          {
            borderRadius: 0,
            textAlignVertical: props.textAlignVertical,
            paddingBottom: props.textPaddingBottom,
            flex: 1,
            paddingLeft: props.textInputLeft,
            textAlign: props.textAlign,
            letterSpacing: props.letterSpacing,
            color: props.textColor,
            fontFamily: props.fontFamily,
            fontSize: props.fontSize,
            paddingRight: normalize(0),
            shadowColor: props.shadowColor,
            shadowOffset: props.shadowOffset,
            shadowOpacity: props.shadowOpacity,
            shadowRadius: props.shadowRadius,
            elevation: props.elevation,
            textTransform: props.textTransform,
            fontWeight: props.fontWeight,
            height: props.inputHeight,
          },
        ]}
        maxLength={props.maxLength}
        secureTextEntry={eyeVisible ? props.isSecure : !props.isSecure}
        multiline={props.multiline}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        editable={props.editable}
        spellCheck={false}
        placeholderTextColor={colors.PLACEHOLDER_COLOR + 50}
        keyboardType={props.keyboardType}
        value={props.value}
        fontWeight={props.fontWeight}
        onChangeText={text => {
          onChangeText(text);
        }}
        onBlur={() => {
          setblurview(false), console.log('');
        }}
        onFocus={() => setblurview(true)}
      />
      {props.isRightIconVisible && (
        <TouchableOpacity
          style={{
            width: props.righttext ? null : normalize(30),
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          onPress={() => onrightimpress()}>
          {props.righttext ? (
            <Text
              style={{color: colors.lightgray, paddingRight: normalize(10)}}>
              {props.righttext}
            </Text>
          ) : (
            <Image
              source={props.rightimage}
              resizeMode="contain"
              style={{
                width: props.rightimageheight,
                height: props.rightimagewidth,
                tintColor: props.righttintColor,
                // marginLeft: normalize(10)
              }}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

TextInputItem.propTypes = {
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  maxLength: PropTypes.number,
  isSecure: PropTypes.bool,
  multiline: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  color: PropTypes.string,
  letterSpacing: PropTypes.number,
  fontSize: PropTypes.number,
  editable: PropTypes.bool,
  borderColor: PropTypes.string,
  fontWeight: PropTypes.any,
  textAlign: PropTypes.string,
  onPress: PropTypes.func,
  search: PropTypes.bool,
  borderRadius: PropTypes.any,
  borderRadiusLeftRadius: PropTypes.any,
  borderBottomRadiusRightRadius: PropTypes.any,
  icon: PropTypes.any,
  iconleft: PropTypes.any,
  iconright: PropTypes.any,
  fontFamily: PropTypes.any,
  backgroundColor: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  marginBottom: PropTypes.number,
  borderWidth: PropTypes.number,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  isleftIconVisible: PropTypes.bool,
  isRightIconVisible: PropTypes.bool,
  textInputLeft: PropTypes.number,
  textColor: PropTypes.string,
  doller: PropTypes.bool,
  elevation: PropTypes.number,
  shadowRadius: PropTypes.number,
  shadowOpacity: PropTypes.number,
  shadowOffset: PropTypes.object,
  shadowColor: PropTypes.string,
  viewbordercolor: PropTypes.string,
  rightimage: PropTypes.number,
  righttext: PropTypes.string,
  rightimageheight: PropTypes.number,
  rightimagewidth: PropTypes.number,
  onrightimpress: PropTypes.func,
  textTransform: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  viewborderbottomcolor: PropTypes.string,
  inputHeight: PropTypes.number,
  textAlignVertical: PropTypes.string,
  textPaddingBottom: PropTypes.number,
  boxBorderColor: PropTypes.string,
  alignTextItem: PropTypes.string,
};

TextInputItem.defaultProps = {
  inputHeight: 55,
  shadowColor: '#000',
  shadowOffset: null,
  shadowRadius: 0,
  shadowOpacity: 0,
  elevation: 0,
  marginTop: 0,
  maxLength: 100,
  isSecure: false,
  multiline: false,
  autoCapitalize: 'none',
  placeholder: '',
  // placeholderTextColor: colors.PLACEHOLDER_COLOR,
  keyboardType: 'default',
  value: '',
  onChangeText: null,
  color: colors.black,
  editable: true,
  // borderColor: '#DDDDDD',
  onFocus: null,
  onBlur: null,
  letterSpacing: 0,
  fontSize: normalize(14),
  textAlign: 'left',
  caretHidden: false,
  borderRadius: 0,
  icon: null,
  iconleft: null,
  // fontFamily: Fonts.Poppins_Regular,
  fontWeight: '400',
  backgroundColor: '',
  search: false,
  width: '100%',
  height: normalize(42),
  borderRadiusRightRadius: 0,
  borderBottomRadiusRightRadius: 0,
  // marginBottom: normalize(15),s
  borderWidth: 0,
  leftIcon: '',
  rightIcon: '',
  isleftIconVisible: false,
  isRightIconVisible: false,
  textInputLeft: 0,
  textColor: colors.black,
  doller: false,
  rightimage: icons.Show,
  righttext: '',
  rightimageheight: normalize(20),
  rightimagewidth: normalize(20),
};
