import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
import images from '../../constants/images';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ChooseAppliance = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      applianceName: 'One Appliance - High Voltage',
      applianceType: 'AC, Fridge, Geyser, MCB, TV & Plug',
      devType: 'high',
      devCount: 1,
    },
    {
      id: 2,
      applianceName: 'One Appliance - Low Voltage',
      applianceType: 'Light, Plug & Fan',
      devType: 'low',
      devCount: 1,
    },
    {
      id: 3,
      applianceName: 'Two Appliances - High Voltage',
      applianceType: 'AC, Fridge, Geyser, MCB, TV & Plug',
      devType: 'high',
      devCount: 2,
    },
    {
      id: 4,
      applianceName: 'Two Appliances - Low Voltage',
      applianceType: 'Light, Plug & Fan',
      devType: 'low',
      devCount: 2,
    },
    {
      id: 5,
      applianceName: 'Three Appliances - High Voltage',
      applianceType: 'AC, Fridge, Geyser, MCB, TV & Plug',
      devType: 'high',
      devCount: 3,
    },
    {
      id: 6,
      applianceName: 'Three Appliance - Low Voltage',
      applianceType: 'Light, Plug & Fan',
      DevType: 'low',
      devCount: 3,
    },
    {
      id: 7,
      applianceName: 'Four Appliance - High Voltage',
      applianceType: 'AC, Fridge, Geyser, MCB, TV & Plug',
      devType: 'high',
      devCount: 4,
    },
    {
      id: 8,
      applianceName: 'Four Appliance - Low Voltage',
      applianceType: 'Light, Plug & Fan',
      devType: 'low',
      devCount: 4,
    },
  ];
  const ApplianceList = ({item}) => (
    <TouchableOpacity // flatlist render item
      onPress={() => {
        navigation.navigate('ApplianceList', {item});
      }}
      style={styles.itemContainer}>
      {/* image and text gray color container */}
      <View style={styles.grayContainer}>
        <View style={styles.grayContainerItem}>
          <View style={styles.listImgContainer}>
            <Image source={icons.Images_ICON} style={styles.imageBox} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.content}>{item.applianceName}</Text>
            <Text style={styles.content}>({item.applianceType})</Text>
          </View>
        </View>
      </View>

      {/* continue button container */}
      <View style={styles.continueBtn}>
        <Text style={styles.continueTxt}>Continue</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View // main container
      style={styles.mainContainer}>
      <View // logo container
        style={styles.logoImg}>
        <Image // logo image
          source={images.APP_LOGO} // app logo
          style={styles.logo}
        />
        <Text // choose device text
          style={styles.chooseApplianceTxt}>
          Choose An Appliance To Continue
        </Text>
      </View>
      <View // list items
        style={styles.listContainer}>
        <View style={styles.listBox}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => <ApplianceList item={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default ChooseAppliance;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  logoImg: {
    height: '33%',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 6,
    // backgroundColor: 'red',
  },
  logo: {
    resizeMode: 'contain',
    height: height * 0.2,
    width: '80%',
  },
  chooseApplianceTxt: {
    fontSize: normalize(13),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
  },
  listContainer: {alignItems: 'center', justifyContent: 'center'},
  listBox: {
    width: '90%',
    borderColor: colors.COLOR_BLACK,
    borderWidth: 0.3,
    borderRadius: 12,
    height: height * 0.52,
    paddingVertical: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: normalize(20),
    justifyContent: 'center',
    width: '100%',
  },
  grayContainer: {
    backgroundColor: colors.GRAY_COLOR,
    borderTopLeftRadius: normalize(6),
    borderBottomLeftRadius: normalize(6),
    paddingVertical: normalize(12),
    width: '70%',
  },
  grayContainerItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  listImgContainer: {
    width: '20%',
  },
  imageBox: {
    height: normalize(40),
    width: normalize(40),
  },
  textContainer: {
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '62%',
  },
  content: {
    textAlign: 'center',
    flexWrap: 'wrap',
    fontSize: normalize(8),
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '400',
    color: colors.COLOR_BLACK,
    // lineHeight: 13,
  },
  continueTxt: {
    color: colors.COLOR_WHITE,
    fontSize: normalize(9),
    fontFamily: fonts.INTER_MEDIUM,
    fontWeight: '400',
  },
  continueBtn: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: normalize(6),
    borderBottomEndRadius: normalize(6),
    paddingHorizontal: normalize(6),
    width: '25%',
  },
});
