import React from "react";
import { Text, View, Button } from "react-native";
import { i18n } from "../constants/Dictionary";
import GoodList from "../components/GoodList";
import * as Dtos from "../constants/Dtos";
import * as Location from "expo-location";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";
import { StackActions } from "react-navigation";
import Dialog from "../components/Dialog";
import Colors from "../constants/Colors";

export default class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };
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

    async componentDidMount(): Promise<void> {
        let location: Location.LocationData = await Location.getCurrentPositionAsync({});
        let token: string | null = await UserManager.getToken();
        HttpClient.listNearbyGood(token, location.coords.latitude, location.coords.longitude)
            .then(result => {
                this.setState({loading: false,
                    ds: result.map(item => ({
                        ...item,
                        image: Utility.remoteURI('', item.id, Dtos.SizeRequest.small)
                    }))
                    .sort((item1, item2) => item1.distance - item2.distance)});
            });
    }

    onRequestClose(message: string): void {
        HttpClient.requestTheGood(this.tuple.token, this.tuple.goodId, message).then(_emptyResponse => {
            this.tuple = this.DEFAULT_TUPLE_VALUE;
            this.setState({dialogVisible: false});
        });
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

    renderDistanceAndRequest(item: Dtos.GoodNearbyResponse) {
        return <View>
            <Dialog visible={this.state.dialogVisible} onClose={msg => this.onRequestClose(msg)} />
            <Text style={{ textAlign: "center" }}>{item.distance} {i18n.meter}</Text>
            <Button title={item.isRequestedByMe ? i18n.statusOfMyRequest.toUpperCase() : i18n.showMyNeed.toUpperCase()} color={Colors.tintColor} onPress={
                () => this.handleOnPress(item.id, item.isRequestedByMe)
            }/>
        </View>;
    }

    render() {
        var temporary: React.ReactNode = (item: any) => this.renderDistanceAndRequest(item);
        return <>{
            this.state.loading ?
                <Text>{i18n.loading.capitalize()}...</Text> :
                <GoodList dataSource={this.state.ds} customNodesForTheItem={temporary}></GoodList>
        }</>;
    }
}
