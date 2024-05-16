import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import icons from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import images from '../../constants/images';
import Header from '../../components/commons/Header';

const {height, width} = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation();
  const [handleEditProfile, setHandleEditProfile] = useState(false);
  const ITEMS = [
    {
      id: 1,
      item_name: 'Account',
    },
    {
      id: 2,
      item_name: 'About Us',
    },
    {
      id: 3,
      item_name: 'Privacy Policy',
    },
    {
      id: 4,
      item_name: 'Terms & Conditions',
    },
  ];

  const CHILD_ITEMS = [
    {
      id: 1,
      item_name: 'Edit Profile',
    },
    {
      id: 2,
      item_name: 'Reset Device Password (RST)',
    },
  ];

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const backAction = () => {
      setHandleEditProfile(!handleEditProfile);
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <Header headerTitle={'Settings'} />
      {handleEditProfile ? (
        <ScrollView>
          <View // EDIT PROFILE HEADING
            style={[
              styles.eachItem,
              styles.eachItemShadow,
              {paddingVertical: normalize(28)},
            ]}>
            <Text //EDIT PROFILE HEADING TEXT
              style={styles.itemName}>
              Edit Profile
            </Text>
          </View>

          <View // back button container
            style={styles.backContainer}>
            <TouchableOpacity
              onPress={() => setHandleEditProfile(!handleEditProfile)}
              style={styles.backButton}>
              <Image source={icons.RIGHT_ARROW} style={styles.backIcon} />
              <Text style={styles.itemsText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={icons.EDIT_ICON} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View // profile icon container
            style={styles.profileIconContainer}>
            <Image source={icons.PROFILE_ICON} style={styles.profileIcon} />
          </View>

          <View // profile information container
            style={styles.infoContainer}>
            <View style={styles.items}>
              <Text style={styles.itemsText}>Name: </Text>
              <Text style={styles.itemsText}>John Doe</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.itemsText}>Phone No.: </Text>
              <Text style={styles.itemsText}>000000000</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.itemsText}>Emai ID: </Text>
              <Text style={styles.itemsText}>johndoe@xyz.com</Text>
            </View>
            <View style={styles.items}>
              <Text style={styles.itemsText}>Address: </Text>
              <Text style={styles.itemsText}>Lorem Ipsum Dolor Sit A Met</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <FlatList // MAIN ITEMS FLATLIST
          data={ITEMS}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity // MAIN ITEMS
                activeOpacity={0.7}
                key={index}
                onPress={() => {
                  setSelected(item?.id === selected ? null : item?.id);
                }}
                style={[
                  styles.eachItem,
                  styles.eachItemShadow,
                  {paddingVertical: normalize(28)},
                ]}>
                <Text // MAIN ITEM NAME
                  style={styles.itemName}>
                  {item.item_name}
                </Text>
                <Image // ARROW ICON
                  source={icons.ARROW_ICON}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
              {item?.id === selected && item?.id === 1 && (
                <View // IF ITEM ID 1 SHOW THIS COMPONENT
                >
                  <FlatList // CHILD ITEMS UNDER ITEM ID 1
                    data={CHILD_ITEMS}
                    renderItem={({item, index}) => (
                      <>
                        <TouchableOpacity // EACH CHILD ITEM
                          activeOpacity={0.7}
                          key={index}
                          onPress={() => {
                            setHandleEditProfile(!handleEditProfile);
                          }}
                          style={[
                            styles.eachItem,
                            {
                              paddingVertical: normalize(16),
                            },
                          ]}>
                          <Text style={styles.itemName}>{item.item_name}</Text>
                          <Image
                            source={icons.ARROW_ICON}
                            style={styles.arrowIcon}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              )}
              {item?.id === selected && item?.id === 2 && (
                <View // IF ITEM ID 2 SHOW THIS COMPONENT
                >
                  <Text style={styles.policy}>
                    I would like to inform you that we will start server
                    maintenance program at 10PM tonight and the uptime will be
                    announce in webskitters family group in WhatsApp. We will
                    take all the necessary step to keep all the files safe.
                    Although, you should keep all the necessary backup of your
                    last 2 days work to avoid any kind of data loss issue.
                  </Text>
                </View>
              )}
              {item?.id === selected && item?.id === 3 && (
                <View // IF ITEM ID 3 SHOW THIS COMPONENT
                >
                  <Text style={styles.policy}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </Text>
                </View>
              )}
              {item?.id === selected && item?.id === 4 && (
                <View // IF ITEM ID 4 SHOW THIS COMPONENT
                >
                  <Text style={styles.policy}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                </View>
              )}
            </>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  eachItem: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: normalize(16),
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  eachItemShadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  itemName: {
    fontSize: normalize(12),
    lineHeight: scale(16.94),
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
    fontWeight: '500',
  },
  arrowIcon: {
    height: normalize(14),
    width: normalize(8),
    resizeMode: 'contain',
  },
  policy: {
    fontSize: normalize(12),
    lineHeight: scale(16.94),
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
    fontWeight: '500',
    margin: normalize(12),
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(22),
    paddingVertical: normalize(18),
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
    transform: [{rotate: '-180deg'}],
    marginRight: normalize(9),
  },
  editIcon: {
    height: normalize(18),
    width: normalize(18),
    resizeMode: 'contain',
  },
  profileIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    resizeMode: 'contain',
    height: normalize(80),
  },
  infoContainer: {margin: normalize(34)},
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(34),
  },
  itemsText: {
    fontSize: normalize(14),
    lineHeight: scale(19),
    fontFamily: fonts.INTER_MEDIUM,
    color: colors.COLOR_BLACK,
    fontWeight: '500',
  },
});
