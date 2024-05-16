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
import React, {useState} from 'react';
import images from '../../constants/images';
import icons from '../../constants/icons';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import TextInputItem from '../../components/commons/TextInputItem';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {width, height} = Dimensions.get('window');

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const {width, height} = Dimensions.get('window');

  return (
    <KeyboardAwareScrollView>
      <ImageBackground // background image
        source={images.FORGOT_PASSWORD_BACKGROUND}
        style={styles.background}
        imageStyle={{resizeMode: 'stretch'}}>
        <View style={styles.mainContainer}>
          <View style={{paddingBottom: 20}}>
            <View style={styles.verifyAccountContainer}>
              <TouchableOpacity // back button
                onPress={() => navigation.goBack()}>
                <Image source={icons.LEFT_ARROW} style={styles.leftArrowImg} />
              </TouchableOpacity>
              <Text style={styles.verifyAccountTxt}>verify your email</Text>
            </View>

            <TextInputItem // email field
              marginTop={height * 0.04}
              borderBottomWidth={1}
              width={'90%'}
              placeholder={'Enter Your Email'}
              borderColor={'#263238'}
              color={colors.PLACEHOLDER_COLOR}
              value={email}
              onChangeText={val => setEmail(val)}
              textAlignVertical={'bottom'}
              alignTextItem={'flex-end'}
              textPaddingBottom={0}
              textColor={colors.PLACEHOLDER_COLOR}
            />
          </View>
          <TouchableOpacity // continue button
            onPress={() => navigation.navigate('OTPVerification')}
            style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Verify</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  background: {flex: 1},
  verifyAccountContainer: {
    marginBottom: normalize(28),
  },
  mainContainer: {
    alignItems: 'center',
    height,
    width,
  },
  leftArrowImg: {
    height: normalize(20),
    width: normalize(12),
    marginTop: height * 0.2,
    marginBottom: height * 0.04,
  },
  verifyAccountTxt: {
    fontSize: normalize(18),
    fontWeight: '500',
    lineHeight: scale(26),
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textTransform: 'capitalize',
    margin: normalize(5),
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: width * 0.13,
    width: '70%',
    borderRadius: normalize(40),
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
