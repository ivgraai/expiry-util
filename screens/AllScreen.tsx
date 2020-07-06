import React from "react";
import {
  Button, Text, View, Image
} from "react-native";
import GoodList from "../components/GoodList";
import * as ErrorAlert from "../components/ErrorAlert";
import { i18n } from "../constants/Dictionary";
import HttpClient from "../services/HttpClient";
import { SizeRequest } from "../constants/Dtos";
import UserManager from "../services/UserManager";
import Utility from "../common/Utility";
import * as Dtos from "../constants/Dtos";
import Colors from "../constants/Colors";
import { styles } from "../constants/styles/AllScreen";

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: i18n.all
  };

  constructor() {
    super();
    this.state = {
      dataSource: [ ],
      loading: true
    };
  }

  componentDidMount() {
    UserManager.getToken().then(token => {
      HttpClient.listAllGood(token)
        .then(result => {
          this.setState({
            dataSource:
              result.map(a => {
                  return { ...a, image: Utility.remoteURI('', a.id, SizeRequest.small) };
                })
                .sort((a, b) => a.expiry.getTime() - b.expiry.getTime()),
            loading: false
          });
        })
        .catch(reason => ErrorAlert.alert(reason));
    });
  }

  renderIsRequested(id: number, isRequestedByOther: boolean) {
    return !isRequestedByOther ?
        null
      :
        <Button title={i18n.lookWhoRequestedThis.toUpperCase()} onPress={() => this.props.navigation.navigate('Approval', {"goodId": id})} color={Colors.tintColor} />;
  }

  render() {
    var temporary = (item: Dtos.GoodAllResponse) => this.renderIsRequested(item.id, item.isRequestedByOther);
    return (this.state.loading ?
        <View style={styles.view}>
          <Image source={require('../assets/images/placeholder.png')} style={styles.image} />
          <Text style={styles.text}>{i18n.yourGoodsAreNotFound.capitalize()}</Text>
        </View> :
        <GoodList dataSource={this.state.dataSource} customNodesForTheItem={temporary} />
      );
  }
}
