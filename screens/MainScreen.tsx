import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from "react-native-elements";
import { Notifications } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { i18n } from "../constants/Dictionary";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";
import { StackActions, ThemeContext } from "react-navigation";
import { styles } from "../constants/styles/MainScreen";
import Colors from "../constants/Colors";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import StyledComponent from "../components/StyledComponent";

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
  showDatePicker: boolean;
}

class MainScreen extends React.Component<IProps, IState> {
  static navigationOptions = {
    title: i18n.new
  };
  static contextType = ThemeContext;
  dayOffset = 24 * 60 * 60 * 1000;
  multiplier = [-3, 2, 1];
  _unsubscribe: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      expiry: new Date(),
      photo: undefined,
      label: i18n.setLocation.toUpperCase(),
      showDatePicker: false
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
    const theme = this.context;
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
          <View style={styles.dataPerishableGoodsTextInputWrapper}>
            <StyledTextInput
              selectTextOnFocus={true}
              style={styles.dataPerishableGoodsTextInput}
              onChangeText={(goods: string) => this.props.setStateGoods(goods)}
              header={i18n.perishableGoods.toUpperCase()}
              placeholder={i18n.egBreadMilkOrEggs.capitalize()}
              placeholderTextColor={Colors.backgroundColor}
            />
          </View>
          <StyledComponent style={styles.dataExpirationDateWrapper} header={i18n.expirationDate.toUpperCase()}>
            <View style={styles.dataExpirationDateView}>
              <Button title="Pick a date" onPress={() => this.setState({ showDatePicker: true })} />
              <DateTimePickerModal
                isVisible={this.state.showDatePicker}
                mode="date"
                onConfirm={date => this.setState({ expiry: date, showDatePicker: false })}
                onCancel={() => this.setState({ showDatePicker: false })}
                isDarkModeEnabled={'dark' === theme}
                date={this.state.expiry}
                // is24Hour -> locale="en_GB"
              />
            </View>
          </StyledComponent>
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
            <StyledButton style={styles.addStyledButton} onPress={() => this.buttonAdd(this.state)}>
              {i18n.add.toUpperCase()}
            </StyledButton>
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
