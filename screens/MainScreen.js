import React from 'react';
import { Button, View } from 'react-native';
import { Notifications } from 'expo';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  onPress() {
    // Notifications.scheduleLocalNotificationAsync({title: "Lorem Ipsum", body: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."}, {time: new Date().getTime() + 1000});
  }

  render() {
    return <View>
          <Button onPress={this.onPress} title="TEST" />
        </View>;
  }
}
