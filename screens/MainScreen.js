import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { Notifications } from 'expo';
import DatePicker from 'react-native-datepicker';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  constructor(props) {
      super(props);
      this.state = {
          goods: "E.g. camembert or bread",
          expiry: "31/12/2019"
      };
  }

  buttonAdd(object) {
    // Notifications.scheduleLocalNotificationAsync({title: "Lorem Ipsum", body: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."}, {time: new Date().getTime() + 1000});
    console.log(object);
  }

  render() {
    return <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{flex: 1}}>{'Perishable Goods:'}</Text>
            <TextInput style={{flex: 2, borderColor: 'lightgray', borderWidth: 1, textAlign: 'center', margin: 1}} onChangeText={(goods) => this.setState({goods})} value={this.state.goods}/>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{flex: 1}}>{'Expiration Date:'}</Text>
            <DatePicker
                style={{flex: 2}}
                date={this.state.expiry}
                mode="date"
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => {this.setState({expiry: date})}} />
        </View>
        <Button onPress={() => this.buttonAdd(this.state)} title="Add" />
    </View>;
  }
}
