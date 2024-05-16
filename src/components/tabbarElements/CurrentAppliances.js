import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../../constants/icons';
import normalize from '../../utils/helpers/normalize';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import fonts from '../../constants/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {roomTabReq} from '../../redux/reducers/TabBarReducer';

const {height, width} = Dimensions.get('window');

const CurrentAppliances = ({setActiveTab}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const [addElement, setAddElement] = useState([
    {currentAppliance: 'Lights', icon: icons.LIGHT_ICON},
    {currentAppliance: 'Fan', icon: icons.FAN_ICON},
  ]);

  const TabBarReducer = useSelector(state => state.TabBarReducer);

  const DeviceControllerReducer = useSelector(
    state => state.DeviceControllerReducer,
  );

  const data = TabBarReducer.addedCurrAppliances;

  useEffect(() => {
    Object.keys(data)?.length > 0 && setAddElement([...addElement, data]);
    console.log(addElement);
    console.log('LOGGER------>', DeviceControllerReducer);
  }, [data]);

  return (
    <>
      <View>
        <View // back icon container
          style={styles.backIconContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveTab('All Appliances'),
                dispatch(roomTabReq('All Appliances'));
            }}>
            <Image source={icons.RIGHT_ARROW} style={styles.backIcon}></Image>
          </TouchableOpacity>
          <Text style={styles.headingTitle}>Current Apliances</Text>
        </View>
      </View>

      <View // room list container
        style={styles.roomList}>
        {addElement?.map((e, index) => {
          return (
            <View key={index}>
              {/* {selected.includes(index) ? ( */}
              {DeviceControllerReducer?.deviceStatus?.value === 'ON' ? (
                <LinearGradient
                  useAngle={true}
                  angle={120}
                  angleCenter={{x: 0.8, y: 0.5}}
                  colors={[colors.COLOR_BLUE, '#00d4ff', '#ffffff']}
                  style={[
                    styles.rooms,
                    {justifyContent: 'center', alignItems: 'center'},
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      // setSelected(selected.filter(e => e !== index))
                      navigation.navigate('Controller', {item: e})
                    }
                    activeOpacity={1}
                    style={styles.roomInnerContainer}>
                    {e.icon && (
                      <Image source={e.icon} style={styles.icon}></Image>
                    )}
                    <Text style={styles.roomTxt}>{e.currentAppliance}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={[styles.rooms, {alignItems: 'center'}]}
                  onPress={() => {
                    setSelected([...selected, index]),
                      navigation.navigate('Controller', {
                        item: e,
                      });
                  }}>
                  {e.icon && (
                    <Image
                      source={e.icon}
                      style={[
                        styles.icon,
                        {tintColor: colors.PLACEHOLDER_COLOR},
                      ]}></Image>
                  )}
                  <Text
                    style={[styles.roomTxt, {color: colors.PLACEHOLDER_COLOR}]}>
                    {e.currentAppliance}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </>
  );
};

export default CurrentAppliances;

const styles = StyleSheet.create({
  roomList: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: normalize(22),
    paddingHorizontal: normalize(22),
    paddingBottom: height * 0.3,
  },
  roomTxt: {
    fontSize: normalize(12),
    fontWeight: '600',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_WHITE,
    textAlign: 'center',
    paddingVertical: normalize(18),
  },
  rooms: {
    backgroundColor: colors.COLOR_WHITE,
    height: width * 0.36,
    width: width * 0.41,
    marginBottom: normalize(27),
    borderRadius: normalize(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    padding: normalize(12),
  },
  roomInnerContainer: {
    alignItems: 'center',
  },
  statusContainer: {
    marginTop: normalize(28),
  },
  icon: {
    resizeMode: 'contain',
    height: normalize(30),
    width: normalize(30),
    marginTop: normalize(3),
    marginLeft: normalize(4),
    tintColor: colors.COLOR_WHITE,
  },
  statusText: {
    fontWeight: '500',
    fontSize: normalize(11.5),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
  },
  backIconContainer: {
    paddingHorizontal: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    width,
  },
  backIcon: {
    resizeMode: 'contain',
    height: normalize(22),
    width: normalize(22),
    transform: [{rotate: '-180deg'}],
  },
  headingTitle: {
    textAlign: 'center',
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.PLACEHOLDER_COLOR,
    fontWeight: '600',
    fontSize: normalize(14),
    width: '90%',
  },
});
