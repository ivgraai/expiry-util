import React from 'react';
import { Platform, View, PixelRatio } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { i18n } from '../constants/Dictionary';
import Colors from '../constants/Colors';
import TabBarLabel from '../components/TabBarLabel';

import MainScreen from '../screens/MainScreen';
import AllScreen from '../screens/AllScreen';
import MapScreen from '../screens/MapScreen';
import UserScreen from '../screens/UserScreen';
import NearbyScreen from '../screens/NearbyScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ApprovalScreen from '../screens/ApprovalScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {
    defaultNavigationOptions: {
      headerTintColor: Colors.header,
      headerStyle: {
        backgroundColor: Colors.backgroundColor
      }
    }
    // , cardStyle: { backgroundColor: Colors.bodyColor }
  },
});

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Map: { screen: MapScreen },
    User: { screen: UserScreen }
  },
  {
    initialRouteName: 'Main',
    ...config
  }
);

MainStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-7.5) }}><TabBarLabel focused={focused} style={{}}>{i18n.new}</TabBarLabel></View>),
  tabBarIcon: <Ionicons name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} size={26} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-5) }} color={Colors.tintColor} />
};

MainStack.path = '';

const AllStack = createStackNavigator(
  {
    All: AllScreen,
    Approval: ApprovalScreen
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-7.5) }}><TabBarLabel focused={focused} style={{}}>{i18n.all}</TabBarLabel></View>),
  tabBarIcon: <Ionicons name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} size={26} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-5) }} color={Colors.tintColor} />
};

AllStack.path = '';

const NearbyStack = createStackNavigator(
  {
    Nearby: NearbyScreen,
    Details: DetailsScreen,
    User: UserScreen
  },
  config
);

NearbyStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (<View style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-7.5) }}><TabBarLabel focused={focused} style={{}}>{i18n.nearby}</TabBarLabel></View>),
  tabBarIcon: <Ionicons name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'} size={26} style={{ marginTop: PixelRatio.getPixelSizeForLayoutSize(-5) }} color={Colors.tintColor} />
};

NearbyStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    MainStack,
    AllStack,
    NearbyStack
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: Colors.backgroundColor
      },
      labelStyle: {
      },
      tabStyle: {
        flexDirection: 'column'
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
