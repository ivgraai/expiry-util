import React from 'react';
import { Button, View } from 'react-native';
import { Notifications } from 'expo';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  onPressLearnMore() {
    Notifications.scheduleLocalNotificationAsync({title: "TESZT", body: "BLABLA"}, {time: new Date().getTime() + 3 * 1000});
  }

  render() {
    return <View>
          <Button onPress={this.onPressLearnMore} title="Learn More" color="#841584" accessibilityLabel="Learn more about this purple button" />
        </View>;
  }
}
