import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import icons from '../../constants/icons';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import Header from '../../components/commons/Header';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const {height, width} = Dimensions.get('window');

const Help = () => {
  return (
    <ScrollView style={{height, width}}>
      <Header headerTitle={'Help'} />
      <View style={styles.addressContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.addressText}>ADDRESS</Text>
        </View>
        <View style={styles.itemContainer}>
          <Image source={icons.NO_IMG_ICON} style={styles.itemImg} />
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </View>

      <View style={styles.contactContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.addressText}>CONTACT</Text>
        </View>
        <View style={styles.itemContainer}>
          <Image source={icons.NO_IMG_ICON} style={styles.itemImg} />
          <Text style={styles.descText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Help;

const styles = StyleSheet.create({
  addressContainer: {},
  contactContainer: {},
  textContainer: {
    justifyContent: 'center',
    paddingVertical: normalize(18),
  },
  addressText: {
    fontSize: normalize(13),
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '700',
    lineHeight: scale(18),
    color: colors.COLOR_BLACK,
    paddingHorizontal: normalize(12),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: normalize(6),
  },
  itemImg: {
    height: height * 0.15,
    width: width * 0.35,
    resizeMode: 'contain',
  },
  descText: {
    fontSize: normalize(13),
    fontWeight: '400',
    color: colors.COLOR_BLACK,
    width: '45%',
  },
});
