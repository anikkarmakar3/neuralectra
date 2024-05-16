import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import normalize from '../../utils/helpers/normalize';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';
import Dashboard from '../../components/tabbarElements/Dashboard';
import Rooms from '../../components/tabbarElements/Rooms';
import AllAppliances from '../../components/tabbarElements/AllAppliances';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {roomTabReq} from '../../redux/reducers/TabBarReducer';
import {useDispatch, useSelector} from 'react-redux';
import CurrentAppliances from '../../components/tabbarElements/CurrentAppliances';
import Header from '../../components/commons/Header';

const {height, width} = Dimensions.get('window');

const Home = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState('Dash Board');

  const dispatch = useDispatch();

  const TabBarReducer = useSelector(state => state.TabBarReducer);
  console.log('OOO===OOO', TabBarReducer.roomTab);

  const TAB_ARRAY = [
    'Dash Board',
    'Rooms',
    'All Appliances',
    'Current Appliances',
  ];

  const tabChange = () => {};
  return (
    <View>
      <Header headerTitle={activeTab} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.tabBarItems}>
          {TAB_ARRAY.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setActiveTab(item);
                  item === 'Dash Board' ||
                  item === 'Rooms' ||
                  item === 'All Appliances' ||
                  item === 'Current Appliances'
                    ? dispatch(roomTabReq(item))
                    : dispatch(roomTabReq(''));
                }}
                style={[
                  styles.tabs,
                  {
                    borderBottomColor:
                      activeTab === item
                        ? colors.COLOR_BLACK
                        : colors.CUSTOM_GRAY + 20,
                  },
                ]}>
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === item
                          ? colors.COLOR_BLUE
                          : colors.PLACEHOLDER_COLOR,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <ScrollView style={{marginBottom: normalize(40)}}>
        {activeTab === 'Dash Board' && (
          <Dashboard
            {...navigation}
            setActiveTab={setActiveTab}
            tabData={TabBarReducer.roomTab}
          />
        )}
        {activeTab === 'Rooms' && (
          <Rooms {...navigation} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'All Appliances' && (
          <AllAppliances {...navigation} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'Current Appliances' && (
          <CurrentAppliances {...navigation} setActiveTab={setActiveTab} />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabBarItems: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: normalize(12),
  },
  tabs: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    paddingHorizontal: normalize(30),
    height: normalize(40),
  },
  tabText: {
    fontFamily: fonts.INTER_MEDIUM,
    paddingVertical: normalize(5),
    fontWeight: '500',
    fontSize: normalize(13),
    lineHeight: scale(19.36),
    fontWeight: '400',
  },
});
