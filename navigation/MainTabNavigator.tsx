import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { i18n } from '../constants/Dictionary';
import Colors from '../constants/Colors';
import TabBarLabel from '../components/TabBarLabel';
import TabBarIcon from '../components/TabBarIcon';

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
      headerTintColor: Colors.tintColor,
      headerStyle: {
        backgroundColor: Colors.header
      }
    }
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
  tabBarLabel: ({ focused }) => (<TabBarLabel focused={focused}>{i18n.new}</TabBarLabel>),
  tabBarIcon: <TabBarIcon name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
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
  tabBarLabel: ({ focused }) => (<TabBarLabel focused={focused}>{i18n.all}</TabBarLabel>),
  tabBarIcon: <TabBarIcon name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
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
  tabBarLabel: ({ focused }) => (<TabBarLabel focused={focused}>{i18n.nearby}</TabBarLabel>),
  tabBarIcon: <TabBarIcon name={Platform.OS === 'ios' ? 'ios-globe' : 'md-globe'} />
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
        backgroundColor: Colors.tabBar
      },
      labelStyle: {
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
