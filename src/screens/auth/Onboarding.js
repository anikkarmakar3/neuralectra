import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../constants/colors';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import images from '../../constants/images';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const {width, height} = Dimensions.get('window');

// intro data
const INTRO_ARR = [
  {
    image: images.ONBOARDING_IMG_ONE,
    desc: 'All You Need For A Smart Home Is A Stable Wi-fi Connection. Enabling Your Wi-fi Is The First Step Towards Shifting To The Smart Paradigm.',
  },
  {
    image: images.ONBOARDING_IMG_TWO,
    desc: 'The next step is to connect your smartphone and your smart home system developed by our team with wi-fi.',
  },
  {
    image: images.ONBOARDING_IMG_THREE,
    desc: 'Once You log In, after providing the controller iD and status ID For the appliances, please close the app and Re-open It. Now onwards control your appliances',
  },
  {
    image: images.ONBOARDING_IMG_FIVE,
    desc: 'Before giving the product iD, please press the reset button (RST) physically on the device to generate the wifi from the device as shown in the picture above.',
  },
  {
    image: images.ONBOARDING_IMG_FOUR,
    desc: 'You now have the power in your hand. control your smart home appliances from anywhere in the world. the control is at your fingertips!',
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const slideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    console.log('DEV INFO', DeviceInfo.getBrand());
  }, []);

  console.log(currentSlide);

  return (
    // main container
    <View style={styles.mainContainer}>
      <View // white background container
        style={styles.secondaryContainer}>
        {Number(currentSlide) + 1 < INTRO_ARR.length ? (
          <TouchableOpacity // skip button
            style={styles.skipContainer}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.skipTxt}>Skip</Text>
            <Image source={icons.RIGHT_ARROW} style={styles.rightArrow} />
          </TouchableOpacity>
        ) : null}

        <FlatList // flatlist of screen contents
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x; // get current scroll position
            setCurrentSlide((x / width).toFixed(0));
          }}
          ref={slideRef}
          pagingEnabled
          style={{width: '100%', height: '80%'}}
          data={INTRO_ARR}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <View>
                <View style={styles.onboardingImgContainer}>
                  <View style={styles.onboardingImages}>
                    <Image source={item.image} style={styles.onboardingImg} />
                  </View>
                  <View style={styles.descTxtContainer}>
                    <Text style={styles.descTxt}>{item.desc}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />

        <View // carousal dots
          style={styles.carousalContainer}>
          {INTRO_ARR.map((item, index) => (
            <View
              key={index}
              style={{
                height: normalize(10),
                width:
                  // Number(currentSlide) == index ? normalize(22) :
                  normalize(10),
                marginHorizontal: moderateScale(10),
                marginVertical : moderateScale(20),
                backgroundColor:
                  Number(currentSlide) == index
                    ? colors.PLACEHOLDER_COLOR
                    : colors.DOT_COLOR,
                borderRadius: normalize(100),
              }}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity // continue button
        style={styles.btnContainer}
        onPress={() => {
          Number(currentSlide) + 1 < INTRO_ARR.length
            ? slideRef.current.scrollToIndex({
                animated: true,
                index: parseInt(Number(currentSlide)) + 1,
              })
            : Number(currentSlide) + 1 == INTRO_ARR.length
            ? navigation.navigate('Login')
            : null;
        }}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.COLOR_PRIMARY,
    flex: 1,
    alignItems: 'center',
  },
  secondaryContainer: {
    height: '76%',
    width: '100%',
    backgroundColor: colors.COLOR_WHITE,
    borderBottomLeftRadius: normalize(40),
    borderBottomRightRadius: normalize(40),
    overflow: 'hidden',
  },
  btnContainer: {
    backgroundColor: colors.COLOR_WHITE,
    height: normalize(38),
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(13),
    marginVertical: normalize(45),
  },
  btnText: {
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: scale(19.36),
  },
  onboardingImgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.7,
    width,
    marginVertical : moderateScale(2),
  },
  onboardingImages: {
    flex: 6,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  onboardingImg: {
    height: height * 0.37,
    width: width,
    resizeMode: 'contain',
  },
  skipContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    right: normalize(26),
    alignItems: 'center',
    zIndex: 1,
    marginTop: normalize(40),
    justifyContent: 'center',
  },
  rightArrow: {height: normalize(12), width: normalize(12)},
  skipTxt: {
    fontFamily: fonts.INTER_SEMIBOLD,
    fontWeight: '600',
    fontSize: normalize(13),
    lineHeight: scale(21.78),
    color: colors.PLACEHOLDER_COLOR,
    margin: normalize(4),
  },
  descTxtContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
  },
  descTxt: {
    textAlign: 'center',
    fontFamily: fonts.INTER_SEMIBOLD,
    fontSize: normalize(8),
    lineHeight: scale(12.94),
    marginVertical : moderateScale(5),
    color: colors.PLACEHOLDER_COLOR,
    textTransform: 'capitalize',
  },
  carousalContainer: {
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
