import React from "react";
import { Text, View, Button, Alert } from "react-native";
import { i18n } from "../constants/Dictionary";
import GoodList from "../components/GoodList";
import * as Dtos from "../constants/Dtos";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";
import Constants from "expo-constants";
import { StackActions, ThemeContext, NavigationEvents } from "react-navigation";
import * as ErrorAlert from "../components/ErrorAlert";
import Dialog from "../components/Dialog";
import Colors from "../constants/Colors";
import { styles } from "../constants/styles/NearbyScreen";
import DbHelper from "../services/DbHelper";
import EmptyResultException from "../common/errors/EmptyResultException";
import CacheHandler from "../services/CacheHandler";

import { connect } from "react-redux";
import * as conn from "../constants/redux/Connection_Nearby";

class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };
    static contextType = ThemeContext;
    private static readonly LATITUDE_THRESHOLD: number = Constants.manifest.extra.cache.data.latitudeThreshold;
    private static readonly LONGITUDE_THRESHOLD: number = Constants.manifest.extra.cache.data.longitudeThreshold;
    private readonly DEFAULT_TUPLE_VALUE = {
        token: '',
        goodId: 0
    };

    state = {
        ds: [],
        dialogVisible: false
    };
    private tuple = this.DEFAULT_TUPLE_VALUE;

    onRequestClose(message: string): void {
        var onComplete = () => {
            this.tuple = this.DEFAULT_TUPLE_VALUE;
            this.setState({dialogVisible: false});
        };
        HttpClient.requestTheGood(this.tuple.token, this.tuple.goodId, message).then(_emptyResponse => {
            let object: any = this.state.ds.find((item: {id: number}) => (this.tuple.goodId == item.id));
            object.isRequestedByMe = true;
            this.props.requestGood(object);
            onComplete();
        })
        .catch(reason => ErrorAlert.alert(reason, onComplete));
    }

    handleOnPress(id: number, isRequestedByMe: boolean) {
        if (isRequestedByMe) {
            this.props.navigation.navigate('Details', {"goodId": id});
        } else {
            UserManager.getToken().then(token => {
                if (null == token) {
                    this.props.navigation.navigate('User', {
                        message: i18n.inOrderToShowYourNeedYouHaveToSignIn.capitalize() + '!',
                        stackAction: StackActions.pop({})
                    });
                    return;
                }
                this.setState({dialogVisible: true});
                this.tuple.token = token;
                this.tuple.goodId = id;
            });
        }
    }

    renderDistanceAndRequest(item: Dtos.GoodNearbyResponse, withStyle: any) {
        return <View>
            <Dialog visible={this.state.dialogVisible} onClose={msg => this.onRequestClose(msg)} />
            <Text style={withStyle.distanceText}>{item.distance} {i18n.meter}</Text>
            <Button title={item.isRequestedByMe ? i18n.statusOfMyRequest.toUpperCase() : i18n.showMyNeed.toUpperCase()} color={Colors.tintColor} onPress={
                () => this.handleOnPress(item.id, item.isRequestedByMe)
            }/>
        </View>;
    }

    getNearbyGood(): Promise<Dtos.GoodNearbyResponse[]> {
        return new Promise(async (resolveResp, rejectResp) => {
            let position = await Utility.currentLocation(() => new Promise(resolveBool => {
                Alert.alert(i18n.youMustAllowTheLocationPermissionForAMoreAccurateResult.capitalize() + '!', "", [
                    {text: i18n.later.capitalize(), onPress: () => resolveBool(false)},
                    {text: i18n.okay, onPress: () => resolveBool(true)}
                ]);
            }));
            let token: string | null = await UserManager.getToken();
            var result: Dtos.GoodNearbyResponse[] = [];
            var ex: Error = new EmptyResultException();
            var cached: boolean = false;
            try {
                result = await HttpClient.listNearbyGood(token, position.latitude, position.longitude);
            } catch(e) {
                ex = e;
                if (CacheHandler.enabled() && await CacheHandler.isNearbyGoodsStillValid()) {
                    let cache = await DbHelper.fetchNearbyGood(
                        position.latitude - NearbyScreen.LATITUDE_THRESHOLD,
                        position.longitude - NearbyScreen.LONGITUDE_THRESHOLD,
                        position.latitude + NearbyScreen.LATITUDE_THRESHOLD,
                        position.longitude + NearbyScreen.LONGITUDE_THRESHOLD
                    );
                    cached = true;
                    result = cache.map(row => new Dtos.GoodNearbyResponse().buildFromValues(row.name, new Date(row.expiry), row.distance, row.id, 0 != row.isRequestedByMe));
                }
            }
            if (!cached) {
                DbHelper.newNearbyGood(result, position.latitude, position.longitude, () => CacheHandler.refreshNearbyGoods());
            }
            if (0 == result.length) {
                rejectResp(ex);
            }
            resolveResp(result);
        });
    }

    render() {
        const theme = this.context;
        const withStyle = styles('dark' === theme);
        var temporary: React.ReactNode = (item: any) => this.renderDistanceAndRequest(item, withStyle);
        return <View style={withStyle.listView}>
            <NavigationEvents
                onWillFocus={_payload => {

                this.getNearbyGood()
                    .then(result => {
                        this.setState({ds:
                            result.map(item => ({
                                ...item,
                                smallImage: Utility.remoteURI('', item.id, Dtos.SizeRequest.small),
                                largeImage: Utility.remoteURI('', item.id, Dtos.SizeRequest.large)
                            }))
                            .sort((item1, item2) => item1.distance - item2.distance)});
                    })
                    .catch(reason => ErrorAlert.alert(reason, () => this.setState({ds: []})));
                if (undefined != this.refs._scrollView) {
                    this.refs._scrollView.scrollToOffset({ offset: 0 });
                }

                }}
            />
            {
                <GoodList ref="_scrollView" dataSource={this.state.ds} customNodesForTheItem={temporary}></GoodList>
            }
        </View>;
    }
}

export default connect(conn.mapStateToProps, conn.mapDispatchToProps)(NearbyScreen);