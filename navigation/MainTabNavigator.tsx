import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import AllScreen from '../screens/AllScreen';
import MapScreen from '../screens/MapScreen';
import UserScreen from '../screens/UserScreen';
import NearbyScreen from '../screens/NearbyScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ApprovalScreen from '../screens/ApprovalScreen';
import { i18n } from '../constants/Dictionary';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Map: { screen: MapScreen },
    User: { screen: UserScreen }
  },
  {
    initialRouteName: 'Main'
  }
);

MainStack.navigationOptions = {
  tabBarLabel: i18n.new,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
  )
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
  tabBarLabel: i18n.all,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  )
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
  tabBarLabel: i18n.nearby,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-help' : 'md-help'} />
  )
};

NearbyStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MainStack,
  AllStack,
  NearbyStack
});

tabNavigator.path = '';

export default tabNavigator;
