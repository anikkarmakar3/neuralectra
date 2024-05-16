import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import normalize from '../utils/helpers/normalize';
import colors from '../constants/colors';

import fonts from '../constants/fonts';
import icons from '../constants/icons';
import Gallery from '../screens/home/Gallery';
import Help from '../screens/home/Help';
import Settings from '../screens/home/Settings';

import {useDispatch, useSelector} from 'react-redux';
import {
  addAplliancesReq,
  addCurrAplliancesReq,
  addRoomReq,
} from '../redux/reducers/TabBarReducer';

import HomeStack from './HomeStack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const height1 = Platform.OS === 'ios' ? 70 : 60;

// without add button
const TAB_ARRAY = [
  {
    name: 'Dash Board',
    component: HomeStack,
    icon: icons.HOME_ICON,
    addButtonVissble: true,
  },
  {
    name: 'Gallery',
    component: Gallery,
    icon: icons.IMAGES_ICON,
    addButtonVissble: false,
  },
  {
    name: 'Settings',
    component: Settings,
    icon: icons.SETTINGS_ICON,
    addButtonVissble: false,
  },
  {
    name: 'Help',
    component: Help,
    icon: icons.HELP_ICON,
    addButtonVissble: false,
  },
];

// with add button
const TAB_ARRAY_TWO = [
  {
    name: 'Dash Board',
    component: HomeStack,
    icon: icons.HOME_ICON,
    addButtonVissble: true,
  },
  {
    name: 'Gallery',
    component: Gallery,
    icon: icons.IMAGES_ICON,
    addButtonVissble: false,
  },
  {
    name: 'Add',
    component: Gallery,
    icon: icons.PLUS_ICON,
    addButtonVissble: false,
  },
  {
    name: 'Settings',
    component: Settings,
    icon: icons.SETTINGS_ICON,
    addButtonVissble: false,
  },
  {
    name: 'Help',
    component: Help,
    icon: icons.HELP_ICON,
    addButtonVissble: false,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState, navigation, route} = props;
  const focused = accessibilityState.selected;

  return (
    <>
      {item.name === 'Add' ? (
        <TouchableOpacity // tabbar add button
          activeOpacity={0.7}
          onPress={onPress}
          style={styles.tabAddButton}>
          <Image // tab icon
            resizeMode="contain"
            style={{
              resizeMode: 'contain',
              // height: normalize(18),
              width: normalize(28),
            }}
            source={item.icon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity // tabbar buttons
          onPress={onPress}
          activeOpacity={1}
          style={styles.tabButton}>
          {focused ? (
            <>
              <View
                style={[
                  styles.upIndicator,
                  {
                    backgroundColor: focused && colors.COLOR_BLUE,
                    position: 'absolute',
                  },
                ]}
              />
              <Image // tab icon
                resizeMode="contain"
                style={[
                  styles.tabIcon,
                  {tintColor: focused ? colors.COLOR_BLUE : colors.COLOR_BLACK},
                ]}
                source={item.icon}
              />
            </>
          ) : (
            <Image // tab icon
              resizeMode="contain"
              style={[
                styles.tabIcon,
                {tintColor: focused ? colors.COLOR_BLUE : colors.COLOR_BLACK},
              ]}
              source={item.icon}
            />
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default function BottomTab({navigation, route}) {
  const dispatch = useDispatch();
  const TabBarReducer = useSelector(state => state.TabBarReducer);
  const data = TabBarReducer.addedRoom;

  const [modal, setModal] = useState(false);

  // add room items
  const [roomCount, setRoomCount] = useState('');
  const [appliance, setAppliance] = useState('');
  const [currentAppliance, setCurrentAppliance] = useState('');

  const addRooms = () => {
    let tempData = data;

    dispatch(
      addRoomReq([
        ...data,
        {
          id:
            Math.max.apply(
              Math,
              tempData.map(function (o) {
                return o.id;
              }),
            ) + 1,
          roomCount,
          status: false,
        },
      ]),
    );
    setModal(false);
    setRoomCount('');
  };

  const addAplliances = () => {
    setModal(false);
    dispatch(addAplliancesReq({appliance}));
    setAppliance('');
  };

  const addCurrentAppliances = () => {
    setModal(false);
    dispatch(addCurrAplliancesReq({currentAppliance}));
    setCurrentAppliance('');
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        initialRouteName="Dasboard"
        backBehavior="history"
        options={{gestureEnabled: false}}
        screenOptions={{
          lazy: false,
          headerShown: false,
          tabBarStyle: {
            elevation: 5,
            position: 'absolute',
            height: normalize(height1),
            flex: 1,
            // height: height * 0.05,
            // width: height * 0.05,
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.COLOR_PRIMARY,
          },
          headerTintColor: colors.COLOR_WHITE,
          headerTitleStyle: {
            fontFamily: fonts.INTER_MEDIUM,
            fontSize: normalize(15.5),
          },
        }}>
        {(!TabBarReducer.roomTab || TabBarReducer.roomTab === 'Dash Board'
          ? TAB_ARRAY
          : TAB_ARRAY_TWO
        ).map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.name}
              component={item.component}
              options={{
                tabBarLabel: item.name,
                tabBarActiveTintColor: colors.COLOR_PRIMARY,
                tabBarLabelStyle: {
                  fontFamily: fonts.INTER_MEDIUM,
                  fontSize: 10,
                  fontWeight: '500',
                  marginBottom: normalize(1),
                },
                tabBarIcon: ({focused}) => (
                  <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                      width: normalize(10),
                      height: normalize(3),
                      tintColor: focused
                        ? colors.COLOR_PRIMARY
                        : colors.COLOR_BLACK,
                    }}
                  />
                ),
                tabBarButton: props => (
                  <TabButton {...{...props, navigation, route}} item={item} />
                ),
              }}
              listeners={{
                tabPress: e => {
                  item.name === 'Add' && (e.preventDefault(), setModal(true));
                  TabBarReducer.roomTab === 'All Appliances' &&
                    (e.preventDefault(),
                    setModal(false),
                    console.log(item.name),
                    navigation.navigate('ChooseAppliance'));
                },
              }}
            />
          );
        })}
      </Tab.Navigator>

      <Modal // add room modal
        transparent
        visible={modal}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModal(false), setRoomCount('0');
            setCurrentAppliance(0);
          }}
          style={styles.modalContainer}>
          <Pressable>
            {TabBarReducer.roomTab === 'Rooms' ? (
              <View style={styles.mainContainer}>
                <Text style={styles.roomCountTxt}>Number of Rooms</Text>
                <TextInput
                  maxLength={2}
                  style={styles.input}
                  onChangeText={txt => setRoomCount(txt)}
                  value={roomCount}
                  keyboardType="numeric"
                  color={colors.COLOR_BLACK}
                />

                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity // cancel button
                    onPress={() => {
                      setModal(false), setRoomCount('');
                    }}
                    style={roomCount && styles.modalbtnUnfocused}>
                    <Text
                      style={
                        roomCount
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity // OK button
                    disabled={!roomCount || roomCount === '0'}
                    onPress={addRooms}
                    style={
                      roomCount
                        ? [styles.modalbtnFocus]
                        : styles.modalbtnUnfocused
                    }>
                    <Text
                      style={
                        roomCount
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : TabBarReducer.roomTab === 'All Appliances' ? (
              <View style={styles.mainContainer}>
                <Text style={styles.roomCountTxt}>Name of Appliance</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={txt => setAppliance(txt)}
                  value={appliance}
                  color={colors.COLOR_BLACK}
                />
                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal(false), setAppliance('');
                    }}
                    style={appliance && styles.modalbtnUnfocused}>
                    <Text
                      style={
                        appliance
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!appliance || appliance === '0'}
                    onPress={addAplliances}
                    style={
                      appliance
                        ? [styles.modalbtnFocus]
                        : styles.modalbtnUnfocused
                    }>
                    <Text
                      style={
                        appliance
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.mainContainer}>
                <Text style={styles.roomCountTxt}>Name of Appliance</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={txt => setCurrentAppliance(txt)}
                  value={currentAppliance}
                  color={colors.COLOR_BLACK}
                />

                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setModal(false), setCurrentAppliance('');
                    }}
                    style={currentAppliance && styles.modalbtnUnfocused}>
                    <Text
                      style={
                        currentAppliance
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!currentAppliance || currentAppliance === ''}
                    onPress={addCurrentAppliances}
                    style={
                      currentAppliance
                        ? [styles.modalbtnFocus]
                        : styles.modalbtnUnfocused
                    }>
                    <Text
                      style={
                        currentAppliance
                          ? styles.modalTxtUnfocused
                          : styles.modalTxtFocus
                      }>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Pressable>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: normalize(7),
  },
  tabAddButton: {
    backgroundColor: colors.COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(45) / 2,
    paddingHorizontal: normalize(8),
    height: normalize(45),
    width: normalize(45),
    top: -normalize(18),
  },
  tabIcon: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  tabName: {
    fontSize: normalize(9),
    alignSelf: 'center',
    opacity: 1,
  },
  upIndicator: {
    width: '50%',
    height: '10%',
    borderBottomLeftRadius: normalize(12),
    borderBottomRightRadius: normalize(12),
  },
  hamburgerButton: {marginHorizontal: normalize(10)},
  hamburger: {height: normalize(16), width: normalize(26)},
  roomCountTxt: {
    fontSize: normalize(13),
    fontWeight: '500',
    lineHeight: scale(22),
    fontFamily: fonts.INTER_SEMIBOLD,
    textAlign: 'center',
    color: colors.PLACEHOLDER_COLOR,
  },
  input: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 0.7,
    borderRadius: normalize(20),
    width: '100%',
    height: '28%',
    marginTop: normalize(22),
    textAlign: 'center',
    fontSize: normalize(13),
    color: colors.COLOR_BLACK,
  },
  modalBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(14),
    width: '100%',
    paddingHorizontal: normalize(20),
    alignItems: 'center',
  },
  modalbtnUnfocused: {
    width: '45%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtUnfocused: {
    fontSize: normalize(12),
    lineHeight: scale(21.78),
    fontWeight: '500',
    color: colors.COLOR_BLACK,
    fontFamily: fonts.INTER_MEDIUM,
    textAlign: 'center',
  },
  modalbtnFocus: {
    borderColor: colors.PLACEHOLDER_COLOR,
    borderWidth: 1,
    borderRadius: normalize(20),
    width: '45%',
    paddingVertical: normalize(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTxtFocus: {
    fontSize: normalize(14),
    lineHeight: scale(21.78),
    fontWeight: '500',
    color: colors.COLOR_BLACK + 50,
    textAlign: 'center',
  },
  appliencesTxt: {
    marginTop: normalize(20),
    paddingHorizontal: normalize(22),
    color: colors.PLACEHOLDER_COLOR,
    fontFamily: fonts.INTER_MEDIUM,
    fontSize: normalize(16),
    lineHeight: scale(22),
  },
  applianceNames: {
    paddingVertical: 16,
    color: colors.PLACEHOLDER_COLOR,
    fontSize: normalize(13),
    lineHeight: scale(19),
    fontWeight: '400',
    fontFamily: fonts.INTER_REGULAR,
  },
  applianceIcons: {
    resizeMode: 'contain',
    height: normalize(40),
    width: normalize(40),
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    height: height * 0.25,
    width: width * 0.85,
    backgroundColor: '#ffffff',
    borderRadius: normalize(12),
    alignItems: 'center',
    padding: normalize(22),
  },
});
