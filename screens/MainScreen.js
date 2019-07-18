import React from 'react';
import { Button, View, Text, TextInput, Image } from 'react-native';
import { Notifications } from 'expo';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  constructor(props) {
      super(props);
      this.state = {
          goods: "E.g. camembert or bread",
          expiry: "31/12/2019",
          photo: null
      };
  }

  buttonAdd(object) {
    // Notifications.scheduleLocalNotificationAsync({title: "Lorem Ipsum", body: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."}, {time: new Date().getTime() + 1000});
    console.log(object);
  }

  buttonPick = async () => {
    image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!image.cancelled) {
      this.setState({ photo: image.uri });
    }
  }

  render() {
    let { photo } = this.state;
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
                confirmBtnText="Choose"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={(date) => {this.setState({expiry: date})}} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button title="Pick an Image" onPress={this.buttonPick} />
            {photo && <Image source={{ uri: photo }} style={{ width: 100, height: 100 }} />}
        </View>
        <Button onPress={() => this.buttonAdd(this.state)} title="ADD THE RECORD" />
    </View>;
  }
}
