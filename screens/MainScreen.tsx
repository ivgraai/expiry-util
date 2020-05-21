import React from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { Notifications } from "expo";
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from "expo-image-picker";
import DbHelper from "../DbHelper";
import * as Location from 'expo-location';
import { i18n } from '../constants/Dictionary';

export default class MainScreen extends React.Component {
  static navigationOptions = {
    title: i18n.new
  };
  dayOffset = 24 * 60 * 60 * 1000;
  multiplier = [-3, 2, 1];

  // TODO:
  //  button should be disabled after persisting

  constructor(props) {
    super(props);
    this.state = {
      goods: i18n.perishableGoods.toUpperCase(),
      expiry: new Date(),
      photo: undefined,
      label: i18n.setLocation.toUpperCase()
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('didFocus', () => {
      lat = this.props.navigation.getParam("latitude");
      lng = this.props.navigation.getParam("longitude");
      if (undefined != lat && undefined != lng) {
        Location.reverseGeocodeAsync({latitude: lat, longitude: lng}).then(addresses =>
          this.setState({label: addresses[0].city}));
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  buttonAdd(object) {
    var now: Date = new Date();
    temp = object.expiry;
    temp.setHours(0, 0, 0, 0);

    for (i = 0; i < this.multiplier.length; i++) {
      temp.setTime(temp.getTime() + this.multiplier[i] * this.dayOffset);
      if (temp < now) {
        continue;
      }
      Notifications.scheduleLocalNotificationAsync(
        {
          title: object.goods.toUpperCase(),
          body: i18n.bestBefore.capitalize() + ": " + object.expiry
        },
        { time: temp.getTime() }
      ).then(id => {
        // console.log(id);
      });
    }

    DbHelper.insertGood({
      name: object.goods,
      expiry: temp,
      image: object.photo
    });
    Alert.alert(
      i18n.successfullyAdded.capitalize(),
      i18n.letsContinueWithOtherPerishableGood.capitalize() + "!",
      [
        {
          text: i18n.cancel.capitalize(),
          style: "cancel"
        },
        { text: i18n.okay, onPress: () => {} }
      ],
      { cancelable: false }
    );
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
  };

  render() {
    let { photo } = this.state;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.buttonPick}
            style={{
              borderColor: "lightgray",
              borderWidth: 1,
              height: "75%",
              width: "75%"
            }}
          >
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Text style={{ textAlign: "center" }}>{(i18n.chooseAPhoto.toUpperCase())}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <TextInput
            selectTextOnFocus={true}
            style={{
              textAlign: "center",
              height: "10%",
              borderColor: "lightgray",
              borderWidth: 1,
              width: "75%"
            }}
            onChangeText={goods => this.setState({ goods })}
            placeholder={this.state.goods}
          />
          <Text style={{ textAlign: "center", marginTop: 15, marginBottom: 5 }}>
            {i18n.expirationDate.toUpperCase() + ":"}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <DateTimePicker
              style={{ width: "75%", height: 175 }}
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={this.state.expiry}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={(event, date) => {
                this.setState({ expiry: date });
              }}
            />
          </View>
          <Button title={this.state.label} onPress={() => this.props.navigation.navigate('Map')} />
          <View
            style={{
              flex: 2,
              width: "75%",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={{
                marginRight: 40,
                marginLeft: 40,
                marginTop: 10,
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: "gray",
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "white"
              }}
              onPress={() => this.buttonAdd(this.state)}
              underlayColor="white"
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                {i18n.add.capitalize()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
