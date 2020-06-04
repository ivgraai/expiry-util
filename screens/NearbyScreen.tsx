import React from "react";
import { Text, PixelRatio } from "react-native";
import { i18n } from "../constants/Dictionary";
import GoodList from "../components/GoodList";
import * as Dtos from "../constants/Dtos";

export default class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };

    state = {
        ds: []
    };

    componentDidMount(): void {
        
    }

    renderDistanceAndRequest(item: Dtos.GoodNearbyResponse) {
        return <Text style={{ textAlign: "center" }}>{item.distance} {i18n.meter}</Text>;
    }

    render() {
        return (
            <GoodList dataSource={this.ds} customNodesForTheItem={this.renderDistanceAndRequest}>
            </GoodList>
        );
    }
}
