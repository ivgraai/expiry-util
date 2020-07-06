import React from "react";
import { Text, View, Button } from "react-native";
import { i18n } from "../constants/Dictionary";
import GoodList from "../components/GoodList";
import * as Dtos from "../constants/Dtos";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";
import { StackActions, ThemeContext, NavigationEvents } from "react-navigation";
import * as ErrorAlert from "../components/ErrorAlert";
import Dialog from "../components/Dialog";
import Colors from "../constants/Colors";
import { styles } from "../constants/styles/NearbyScreen";

export default class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };
    static contextType = ThemeContext;
    private readonly DEFAULT_TUPLE_VALUE = {
        token: '',
        goodId: 0
    };

    state = {
        loading: true,
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
            object!.isRequestedByMe = true;
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

    render() {
        const theme = this.context;
        const withStyle = styles('dark' === theme);
        var temporary: React.ReactNode = (item: any) => this.renderDistanceAndRequest(item, withStyle);
        return <View style={withStyle.listView}>
            <NavigationEvents
                onWillFocus={async _payload => {

                let position = await Utility.currentLocation();
                let token: string | null = await UserManager.getToken();
                HttpClient.listNearbyGood(token, position.latitude, position.longitude)
                    .then(result => {
                        this.setState({loading: false,
                            ds: result.map(item => ({
                                ...item,
                                image: Utility.remoteURI('', item.id, Dtos.SizeRequest.small)
                            }))
                            .sort((item1, item2) => item1.distance - item2.distance)});
                    })
                    .catch(reason => ErrorAlert.alert(reason, () => this.setState({loading: true, ds: []})));
                if (undefined != this.refs._scrollView) {
                    this.refs._scrollView.scrollToOffset({ offset: 0 });
                }

                }}
            />
            {this.state.loading ?
                <View style={withStyle.loadingView}><Text style={withStyle.loadingText}>{i18n.loading.capitalize()}...</Text></View> :
                <GoodList ref="_scrollView" dataSource={this.state.ds} customNodesForTheItem={temporary}></GoodList>
            }
        </View>;
    }
}
