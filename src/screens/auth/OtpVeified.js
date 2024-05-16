import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import images from '../../constants/images';
import icons from '../../constants/icons';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
import TextInputItem from '../../components/commons/TextInputItem';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const OtpVerified = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Image source={images.OTP_VERIFIED} style={styles.successImg} />
        </View>
        <View
          style={{
            marginTop: normalize(30),
            alignItems: 'center',
            justifyContent: 'center',
            width: width / 1.5,
          }}>
          <Text
            style={{
              fontSize: normalize(11.5),
              color: colors.COLOR_BLACK,
              fontFamily: fonts.INTER_MEDIUM,
              textAlign: 'center',
            }}>
            Your account has been verified Press continue to proceed
          </Text>
        </View>
        <TouchableOpacity // continue button
          onPress={() => navigation.navigate('ResetPassword')}
          style={styles.continueBtn}>
          <Text style={styles.continueTxt}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OtpVerified;

const styles = StyleSheet.create({
  successImg: {
    resizeMode: 'contain',
    height: normalize(150),
    width: normalize(150),
    marginTop: normalize(100),
  },
  continueBtn: {
    backgroundColor: colors.COLOR_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: '80%',
    borderRadius: normalize(10),
    marginTop: width * 0.15,
  },
  continueTxt: {
    color: colors.COLOR_WHITE,
    fontSize: normalize(13),
    fontFamily: fonts.INTER_SEMIBOLD,
    lineHeight: scale(22),
    fontWeight: '500',
  },
});
