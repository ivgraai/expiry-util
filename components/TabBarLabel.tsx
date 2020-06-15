import React from 'react';
import { Text } from 'react-native';

import Colors from '../constants/Colors';

export default function TabBarLabel(props: any) {
    return <Text style={{fontWeight: props.focused ? 'bold' : 'normal', color: Colors.tintColor, fontSize: 13}}>{props.children}</Text>;
}
