import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import images from '../../constants/images';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import TextInputItem from '../../components/commons/TextInputItem';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <KeyboardAwareScrollView>
      <ImageBackground // background image
        source={images.LOGIN_BACKGROUND}
        style={styles.background}
        imageStyle={{resizeMode: 'stretch'}}>
        <View style={styles.mainContainer}>
          <View style={{paddingBottom: 20}}>
            <View // welcome text
              style={styles.welcomeTextContainer}>
              <Text style={styles.welcomTxt}>Hello,</Text>
              <Text style={styles.welcomTxt}>Welcome back</Text>
            </View>

            <TextInputItem // email field
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Email'}
              borderColor={colors.PLACEHOLDER_COLOR}
              color={colors.PLACEHOLDER_COLOR}
              value={email}
              onChangeText={val => setEmail(val)}
              textAlignVertical={'bottom'}
              textPaddingBottom={0}
              alignTextItem={'flex-end'}
              textColor={colors.PLACEHOLDER_COLOR}
            />
            <TextInputItem // password field
              marginTop={normalize(18)}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Password'}
              borderColor={colors.PLACEHOLDER_COLOR}
              isSecure={passwordVisible}
              value={password}
              onChangeText={val => setPassword(val)}
              isRightIconVisible={true}
              onrightimpress={() => setPasswordVisible(!passwordVisible)}
              rightimage={passwordVisible ? icons.EYE_CLOSE : icons.EYE_OPEN}
              textAlignVertical={'bottom'}
              textPaddingBottom={0}
              alignTextItem={'flex-end'}
              textColor={colors.PLACEHOLDER_COLOR}
            />
            <TouchableOpacity // forgot password
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity // login button
            onPress={() => navigation.navigate('BottomTab')}
            style={styles.loginBtn}>
            <Text style={styles.loginTxt}>Log In</Text>
          </TouchableOpacity>
          <View // dont have account
            style={styles.signupContainer}>
            <Text style={styles.dontHaveAc}>Don’t have an account? </Text>
            <TouchableOpacity // sign up button
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupTxt}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {flex: 1},
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height,
    width,
  },
  welcomeTextContainer: {
    marginBottom: normalize(28),
  },
  welcomTxt: {
    fontSize: normalize(22),
    fontWeight: '500',
    lineHeight: scale(26),
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    margin: normalize(5),
  },
  forgotPasswordContainer: {marginVertical: normalize(18)},
  forgotPassword: {
    textAlign: 'right',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLUE,
    fontWeight: '400',
    lineHeight: scale(22),
    fontSize: normalize(12),
  },

  loginBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: '70%',
    borderRadius: normalize(40),
    marginTop: width * 0.03,
  },
  loginTxt: {
    color: colors.COLOR_WHITE,
    fontSize: normalize(13),
    lineHeight: scale(22),
    fontWeight: '600',
    fontFamily: fonts.INTER_SEMIBOLD,
  },
  dontHaveAc: {
    textTransform: 'capitalize',
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: scale(22),
  },
  signupTxt: {
    textTransform: 'capitalize',
    color: colors.COLOR_BLUE,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(12),
    fontWeight: '500',
    lineHeight: scale(22),
    textDecorationLine: 'underline',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: normalize(24),
  },
});
