import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CheckBox } from "react-native-elements";
import { Notifications } from "expo";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { i18n } from "../constants/Dictionary";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import DbHelper from "../services/DbHelper";
import Utility from "../common/Utility";
import { dateTimePickerHeader, dateTimePickerConfirmButton, dateTimePickerCancelButton } from "../components/DateTimePickerModal";
import * as ErrorAlert from "../components/ErrorAlert";
import { StackActions, ThemeContext } from "react-navigation";
import { styles } from "../constants/styles/MainScreen";
import Colors from "../constants/Colors";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";
import StyledComponent from "../components/StyledComponent";

import { connect } from "react-redux";
import * as conn from "../constants/redux/Connection_Main";

interface IComponentProps {
  navigation: any;
  isChosen: boolean;
  imageUri: string | undefined;
  goods: string;
  expiry: Date;
  available: boolean;
  location: {lat: number, lng: number};
  chooseImage: (uri: string) => void;
  cancelImage: () => void;
  setStateGoods: (name: string) => void;
  setExpiry: (expiry: Date) => void;
  checkAvailable: () => void;
  pickLocation: (location: {lat: number, lng: number}) => void;
  initializeState: () => void;
}
interface IComponentState {
  label: string;
  showDatePicker: boolean;
}

class MainScreen extends React.Component<IComponentProps, IComponentState> {
  static navigationOptions = {
    title: i18n.new
  };
  static contextType = ThemeContext;
  dayOffset = 24 * 60 * 60 * 1000;
  multiplier = [-3, 2, 1];
  _unsubscribe: any;

  constructor(props: IComponentProps) {
    super(props);
    this.state = {
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
    let onPress: (value?: string) => void = () => {
      this.props.initializeState();
    };
    Alert.alert(
      i18n.successfullyAdded.capitalize(),
      i18n.letsContinueWithOtherPerishableGood.capitalize() + "!",
      [
        {
          text: i18n.cancel.capitalize(),
          style: "cancel",
          onPress
        },
        { text: i18n.okay, onPress }
      ],
      { cancelable: false }
    );
  }

  buttonAdd(object: IComponentState) {
    var now: Date = new Date();
    var objectExpiry = this.props.expiry;
    let temp = objectExpiry;
    temp.setHours(0, 0, 0, 0);
    var objectGoods = this.props.goods;
    var objectPhoto = this.props.imageUri;

    let promises: Array<Promise<String | Number>> = [];
    for (var i = 0; i < this.multiplier.length; i++) {
      temp.setTime(temp.getTime() + this.multiplier[i] * this.dayOffset);
      if (temp < now) {
        continue;
      }
      promises.push(Notifications.scheduleLocalNotificationAsync(
        {
          title: objectGoods.toUpperCase(),
          body: i18n.bestBefore.capitalize() + ": " + objectExpiry.toLocaleDateString()
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
            image: objectPhoto,
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
            objectPhoto ? Utility.convertImageToDto(objectPhoto) : null
          )
          .then(_value => this.showDialog())
          .catch(reason => ErrorAlert.alert(reason));
        }
      });

    });
  }

  buttonPick = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!image.cancelled) {
      this.props.chooseImage(image.uri);
    } else {
      this.props.cancelImage();
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
    const isDark = ('dark' === this.context);
    const withStyle = styles(isDark);
    let photo = this.props.imageUri;
    return (
      <View
        style={withStyle.mainView}
      >
        <View
          style={withStyle.photoView}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={this.buttonPick}
            style={withStyle.photoTouchableOpacity}
          >
            {this.props.isChosen ? (
              <Image
                source={{ uri: photo }}
                style={withStyle.photoImage}
              />
            ) : (
              <View style={withStyle.photoTextWrapper}>
                <Text style={withStyle.photoText}>{(i18n.chooseAPhoto.toUpperCase())}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={withStyle.dataView}>
          <View style={withStyle.dataPerishableGoodsTextInputWrapper}>
            <StyledTextInput
              selectTextOnFocus={true}
              style={withStyle.dataPerishableGoodsTextInput}
              onChangeText={(goods: string) => this.props.setStateGoods(goods)}
              header={i18n.perishableGoods.toUpperCase()}
              placeholder={i18n.egBreadMilkOrEggs.capitalize()}
              placeholderTextColor={Colors.backgroundColor}
              value={this.props.goods}
            />
          </View>
          <StyledComponent style={withStyle.dataExpirationDateWrapper} header={i18n.expirationDate.toUpperCase()}>
            <View style={withStyle.dataExpirationDateView}>
              <View style={withStyle.dataExpirationDateValue}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
                  style={withStyle.dataExpirationDateValueIcon}
                  color={isDark ? Colors.labelDarkColor : Colors.labelLightColor}
                />
                <Text style={withStyle.dataExpirationDateValueText} onPress={() => this.setState({ showDatePicker: true })}>
                  {this.props.expiry.toLocaleDateString()}
                </Text>
              </View>
              <DateTimePickerModal
                isVisible={this.state.showDatePicker}
                mode="date"
                onConfirm={date => { this.props.setExpiry(date); this.setState({ showDatePicker: false }); }}
                onCancel={() => this.setState({ showDatePicker: false })}
                isDarkModeEnabled={isDark}
                date={this.props.expiry}
                // is24Hour -> locale="en_GB"
                headerTextIOS={i18n.pickADate.capitalize()}
                confirmTextIOS={i18n.confirm.capitalize()}
                cancelTextIOS={i18n.cancel.capitalize()}
                customHeaderIOS={dateTimePickerHeader}
                customConfirmButtonIOS={dateTimePickerConfirmButton}
                customCancelButtonIOS={dateTimePickerCancelButton}
              />
            </View>
          </StyledComponent>
          <CheckBox
            containerStyle={withStyle.dataLocationCheckBoxContainer}
            textStyle={withStyle.dataLocationCheckBoxText}
            checked={this.props.available}
            title={this.state.label}
            onPress={() => this.props.available ? this.props.checkAvailable() : this.navigate()}
            checkedColor={Colors.tintColor}
            uncheckedColor={Colors.tintColor}
          />
          <View
            style={withStyle.addView}
          >
            <StyledButton style={withStyle.addStyledButton} onPress={() => this.buttonAdd(this.state)}>
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
