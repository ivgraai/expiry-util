import React from "react";
import {
  Button
} from "react-native";
import GoodList from "../components/GoodList";
import PlaceHolder from "../components/PlaceHolder";
import * as ErrorAlert from "../components/ErrorAlert";
import { i18n } from "../constants/Dictionary";
import HttpClient from "../services/HttpClient";
import { SizeRequest } from "../constants/Dtos";
import UserManager from "../services/UserManager";
import Utility from "../common/Utility";
import * as Dtos from "../constants/Dtos";
import DbHelper from "../services/DbHelper";
import Colors from "../constants/Colors";
import CacheHandler from "../services/CacheHandler";

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: i18n.all
  };
  private static readonly IMAGE_SOURCE_FUNCTION = (id: number) => Utility.remoteURI('', id, SizeRequest.small);

  constructor() {
    super();
    this.state = {
      dataSource: [ ]
    };
  }

  componentDidMount() {
    UserManager.getToken().then(token => {
      if (null == token) {
        this.retrieveFromCache();
      } else {
        HttpClient.listAllGood(token)
          .then(result => {
            this.saveToCache(result);
            this.updateState(result.map(a => {
                return { ...a, image: AllScreen.IMAGE_SOURCE_FUNCTION(a.id) };
              }));
          })
          .catch(reason => ErrorAlert.alert(reason, () =>
            this.retrieveFromCache()
          ));
      }
    });
  }

  updateState(result: Array<{expiry: Date}>) {
    this.setState({
      dataSource: result.sort((a, b) => a.expiry.getTime() - b.expiry.getTime())
    })
  }

  retrieveFromCache() {
    CacheHandler.isMineGoodsStillValid().then(condition => {
      if (condition) {
        DbHelper.selectGoods().then(result =>
          this.updateState(result.map(a => {
              return { ...a, expiry: new Date(a.expiry), image: (a.id ? AllScreen.IMAGE_SOURCE_FUNCTION(a.id) : a.image) };
            }))
        );
      }
    });
  }

  saveToCache(result: Dtos.GoodAllResponse[]) {
    DbHelper.insertGoods(result.map(a =>
      ({name: a.name, expiry: a.expiry, notifications: null, image: null, id: a.id, isRequestedByOther: a.isRequestedByOther})
    ), () => CacheHandler.refreshMineGoods());
  }

  renderIsRequested(id: number, isRequestedByOther: boolean) {
    return !isRequestedByOther ?
        null
      :
        <Button title={i18n.lookWhoRequestedThis.toUpperCase()} onPress={() => this.props.navigation.navigate('Approval', {"goodId": id})} color={Colors.tintColor} />;
  }

  render() {
    var temporary = (item: Dtos.GoodAllResponse) => this.renderIsRequested(item.id, item.isRequestedByOther);
    return ((0 == this.state.dataSource.length) ?
        <PlaceHolder text={i18n.yourGoodsAreNotFound.capitalize()} /> :
        <GoodList dataSource={this.state.dataSource} customNodesForTheItem={temporary} />
      );
  }
}
