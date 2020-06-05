import React from "react";
import { Text, View, Button } from "react-native";
import { i18n } from "../constants/Dictionary";
import GoodList from "../components/GoodList";
import * as Dtos from "../constants/Dtos";
import * as Location from 'expo-location';
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import Utility from "../common/Utility";

export default class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };

    state = {
        ds: []
    };

    async componentDidMount(): Promise<void> {
        let location: Location.LocationData = await Location.getCurrentPositionAsync({});
        let token: string | null = await UserManager.getToken();
        HttpClient.listNearbyGood(token, location.coords.latitude, location.coords.longitude)
            .then(result => {
                this.setState({ds: result.map(item => ({
                    ...item,
                    image: Utility.remoteURI('', item.id, Dtos.SizeRequest.small)
                }))
                .sort((item1, item2) => item1.distance - item2.distance)});
            });
    }

    handleOnPress(id: number, isRequestedByMe: boolean) {
        if (isRequestedByMe) {
            this.props.navigation.navigate('Details');
        } else {
            // TODO
        }
    }

    renderDistanceAndRequest(item: Dtos.GoodNearbyResponse) {
        return <View>
            <Text style={{ textAlign: "center" }}>{item.distance} {i18n.meter}</Text>
            <Button title={item.isRequestedByMe ? i18n.statusOfMyRequest.toUpperCase() : i18n.showMyNeed.toUpperCase()} onPress={
                () => this.handleOnPress(item.id, item.isRequestedByMe)
            }/>
        </View>;
    }

    render() {
        var temporary: React.ReactNode = (item: any) => this.renderDistanceAndRequest(item);
        return (
            <GoodList dataSource={this.state.ds} customNodesForTheItem={temporary}>
            </GoodList>
        );
    }
}
