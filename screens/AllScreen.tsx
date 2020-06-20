import React from "react";
import {
  View, Button
} from "react-native";
import { NavigationEvents } from "react-navigation";
import GoodList from "../components/GoodList";
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
      dataSource: [ ]
    };
  }

  renderIsRequested(id: number, isRequestedByOther: boolean) {
    return !isRequestedByOther ?
        null
      :
        <Button title={i18n.lookWhoRequestedThis.toUpperCase()} onPress={() => this.props.navigation.navigate('Approval', {"goodId": id})} color={Colors.tintColor} />;
  }

  render() {
    var temporary = (item: Dtos.GoodAllResponse) => this.renderIsRequested(item.id, item.isRequestedByOther);
    return (
      <View style={styles.view}>
        <NavigationEvents
          onWillFocus={payload => {

            UserManager.getToken().then(token => {
              HttpClient.listAllGood(token)
                .then(result => {
                  this.setState({
                    dataSource:
                      result.map(a => {
                          return { ...a, image: Utility.remoteURI('', a.id, SizeRequest.small) };
                        })
                        .sort((a, b) => a.expiry.getTime() - b.expiry.getTime())
                  });
                });
            });
            this.refs._scrollView.scrollToOffset({ offset: 0 });

          }}
        />
          <GoodList ref="_scrollView" dataSource={this.state.dataSource} customNodesForTheItem={temporary} />
      </View>
    );
  }
}
