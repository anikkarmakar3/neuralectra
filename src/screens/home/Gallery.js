import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import icons from '../../constants/icons';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import fonts from '../../constants/fonts';
import Header from '../../components/commons/Header';
const {width, height} = Dimensions.get('window');

const Gallery = () => {
  // dummy data
  const data = [
    {
      id: 1,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 3,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 4,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 5,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 6,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 7,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 8,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 9,
      icon: icons.NO_IMG_ICON,
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];
  return (
    <>
      <Header headerTitle={'Gallery'} />
      <View // main container
        style={styles.mainContainer}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity style={styles.eachItem}>
                <Image source={item.icon} style={styles.itemImg} />
                <Text style={styles.itemDesc}>{item.desc}</Text>
              </TouchableOpacity>
            </>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(12),
  },
  eachItem: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 0.5,
    borderRadius: normalize(12),
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.42,
    margin: normalize(8),
    paddingVertical: normalize(8),
  },
  itemImg: {
    height: height * 0.15,
    width: width * 0.35,
    resizeMode: 'contain',
  },
  itemDesc: {
    color: colors.COLOR_BLACK,
    fontSize: normalize(11.5),
    fontWeight: '400',
    lineHeight: scale(15.73),
    fontFamily: fonts.INTER_MEDIUM,
    flexWrap: 'wrap',
    width: '95%',
    textAlign: 'center',
    padding: normalize(6),
  },
  listContainer: {
    paddingBottom: normalize(70),
  },
});
