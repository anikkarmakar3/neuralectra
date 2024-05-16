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
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

const OtpVerified = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const [pass, setPass] = useState('');

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin5, setPin5] = useState('');
  const [pin6, setPin6] = useState('');

  const [touch, settouch] = useState(0);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.mainContainer}>
        <View style={{width: width}}>
          <View style={styles.verifyAccountContainer}>
            <TouchableOpacity // back icon container
              onPress={() => navigation.goBack()}
              style={styles.backIconContainer}>
              <Image // logo image
                source={icons.BACK_ICON} // app logo
                style={styles.backIcon}
              />
            </TouchableOpacity>

            <Text style={styles.verifyAccountTxt}>OTP Verification</Text>
            <Text style={styles.smallText}>
              6 digit code has been send to lorem@ipsum.com
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef1}
                value={pin1}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin1(val);
                  if (!pin1.length >= 1) {
                    inputRef2.current.focus();
                  }
                }}></TextInput>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef2}
                value={pin2}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin2(val);
                  if (!pin2.length >= 1) {
                    inputRef3.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef1.current.focus();
                  }
                }}></TextInput>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef3}
                value={pin3}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin3(val);
                  if (!pin3.length > 0) {
                    inputRef4.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef2.current.focus();
                  }
                }}></TextInput>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef4}
                value={pin4}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin4(val);
                  if (!pin4.length > 0) {
                    inputRef5.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef3.current.focus();
                  }
                }}></TextInput>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef5}
                value={pin5}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin5(val);
                  if (!pin5.length > 0) {
                    inputRef6.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef4.current.focus();
                  }
                }}></TextInput>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.CUSTOM_GRAY + 20,
                  },
                ]}
                ref={inputRef6}
                value={pin6}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={val => {
                  setPin6(val);
                  if (!pin6.length > 0) {
                    inputRef6.current.focus();
                  } else if (!pin2.length < 1) {
                    inputRef5.current.focus();
                  }
                }}></TextInput>
            </View>
            <Text style={[styles.smallText, {marginTop: normalize(28)}]}>
              Resend code in{' '}
              <Text style={[styles.smallText, {color: colors.COLOR_BLUE}]}>
                30s
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity // continue button
          onPress={() => navigation.navigate('OtpVerified')}
          style={styles.continueBtn}>
          <Text style={styles.continueTxt}>Verify</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default OtpVerified;

const styles = StyleSheet.create({
  background: {flex: 1},
  verifyAccountContainer: {
    marginBottom: normalize(28),
    marginTop: normalize(30),
  },
  mainContainer: {
    alignItems: 'center',
    height,
    width,
  },
  backIconContainer: {
    backgroundColor: colors.GRAY_COLOR + 40,
    width: '14%',
    padding: normalize(15),
    borderRadius: normalize(100),
    marginHorizontal: normalize(14),
  },
  backIcon: {
    height: normalize(12),
    width: normalize(12),
    resizeMode: 'contain',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  verifyAccountTxt: {
    fontSize: normalize(22),
    lineHeight: 26,
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_SEMIBOLD,
    margin: normalize(20),
    textAlign: 'center',
  },
  smallText: {
    fontSize: normalize(11),
    lineHeight: 16,
    color: colors.CUSTOM_GRAY,
    fontFamily: fonts.INTER_REGULAR,
    textAlign: 'center',
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
    lineHeight: 22,
    fontWeight: '500',
  },
  input: {
    borderRadius: 10,
    height: normalize(40),
    width: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: normalize(3),
    textAlign: 'center',
    fontSize: normalize(12),
    fontFamily: fonts.INTER_SEMIBOLD,
    color: colors.COLOR_BLACK,
  },
});
