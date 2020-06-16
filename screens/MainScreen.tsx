import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CheckBox } from "react-native-elements";
import { Notifications } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { i18n } from "../constants/Dictionary";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";
import { StackActions } from "react-navigation";
import { styles } from "../constants/styles/MainScreen";
import Colors from "../constants/Colors";

import { connect } from "react-redux";
import * as conn from "../constants/redux/Connecting";

interface IProps {
  navigation: any;
  isChosen: boolean;
  goods: string;
  available: boolean;
  location: {lat: number, lng: number};
  chooseImage: () => void;
  setStateGoods: (name: string) => void;
  checkAvailable: () => void;
  pickLocation: (location: {lat: number, lng: number}) => void;
}
interface IState {
  expiry: Date;
  photo: string | undefined;
  label: string;
}

class MainScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: i18n.new
  };
  dayOffset = 24 * 60 * 60 * 1000;
  multiplier = [-3, 2, 1];
  _unsubscribe: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      expiry: new Date(),
      photo: undefined,
      label: i18n.setLocation.toUpperCase()
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("didFocus", () => {
      let lat = this.props.navigation.getParam("latitude");
      let lng = this.props.navigation.getParam("longitude");
      if (undefined != lat && undefined != lng) {
        Location.reverseGeocodeAsync({latitude: lat, longitude: lng}).then(addresses => {
          this.setState({label: addresses[0].city});
          this.props.checkAvailable();
          this.props.pickLocation({lat, lng});
        });
        this.resetNavigationParameters();
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  resetNavigationParameters() {
    this.props.navigation.setParams({"latitude": undefined, "longitude": undefined});
  }

  showDialog() {
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

  buttonAdd(object: IState) {
    var now: Date = new Date();
    let temp = object.expiry;
    temp.setHours(0, 0, 0, 0);
    var objectGoods = this.props.goods;

    let promises: Array<Promise<String | Number>> = [];
    for (var i = 0; i < this.multiplier.length; i++) {
      temp.setTime(temp.getTime() + this.multiplier[i] * this.dayOffset);
      if (temp < now) {
        continue;
      }
      promises.push(Notifications.scheduleLocalNotificationAsync(
        {
          title: objectGoods.toUpperCase(),
          body: i18n.bestBefore.capitalize() + ": " + object.expiry.toLocaleDateString()
        },
        { time: temp.getTime() }
      ));
    }

    Promise.all(promises).then(localNotificationIds => {

      UserManager.getToken().then(token => {
        let available = this.props.available;
        if (null == token) {
          /* DbHelper.insertGood({
            name: objectGoods,
            expiry: temp,
            image: object.photo,
            notifications: localNotificationIds.toString()
          }); */
        } else {
          HttpClient.addGood(
            token,
            objectGoods,
            temp,
            !available ? null : this.props.location.lat,
            !available ? null : this.props.location.lng,
            available,
            Utility.convertImageToDto(object.photo!)
          );
        }
      });
      this.showDialog();

    });
  }

  buttonPick = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!image.cancelled) {
      this.setState({ photo: image.uri });
      this.props.chooseImage();
    }
  };

  navigate() {
    UserManager.isSignedIn().then(result => {
      if (result) {
        this.props.navigation.navigate("Map");
      } else {
        this.props.navigation.navigate("User", {
          message: i18n.inOrderToMarkAsAvailableYouNeedToSignIn.capitalize() + '!',
          stackAction: StackActions.replace({
            key: undefined,
            routeName: "Map"
          })
        });
      }
    });
  }

  render() {
    let { photo } = this.state;
    return (
      <View
        style={styles.mainView}
      >
        <View
          style={styles.photoView}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.buttonPick}
            style={styles.photoTouchableOpacity}
          >
            {this.props.isChosen ? (
              <Image
                source={{ uri: photo }}
                style={styles.photoImage}
              />
            ) : (
              <View style={styles.photoTextWrapper}>
                <Text style={styles.photoText}>{(i18n.chooseAPhoto.toUpperCase())}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.dataView}>
          <TextInput
            selectTextOnFocus={true}
            style={styles.dataPerishableGoodsTextInput}
            onChangeText={goods => this.props.setStateGoods(goods)}
            placeholder={i18n.perishableGoods.toUpperCase()}
          />
          <View style={styles.dataExpirationDateWrapper}>
            <View style={styles.dataExpirationDateTextWrapper}>
              <Text style={styles.dataExpirationDateText}>
                {i18n.expirationDate.toUpperCase() + ":"}
              </Text>
            </View>
            <View style={styles.dataExpirationDateView}>
              <DateTimePicker
                style={styles.dataExpirationDateDateTimePicker}
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.expiry}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(_, date) => {
                  if (date) {
                    this.setState({ expiry: date });
                  }
                }}
              />
            </View>
          </View>
          <CheckBox
            containerStyle={styles.dataLocationCheckBoxContainer}
            textStyle={styles.dataLocationCheckBoxText}
            checked={this.props.available}
            title={this.state.label}
            onPress={() => this.props.available ? this.props.checkAvailable() : this.navigate()}
            checkedColor={Colors.tintColor}
            uncheckedColor={Colors.tintColor}
          />
          <View
            style={styles.addView}
          >
            <TouchableOpacity
              style={styles.addTouchableOpacity}
              onPress={() => this.buttonAdd(this.state)}
            >
              <Text
                style={styles.addText}
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

export default connect(
  conn.mapStateToProps,
  conn.mapDispatchToProps
)(MainScreen);
