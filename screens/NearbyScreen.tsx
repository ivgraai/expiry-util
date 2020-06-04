import React from "react";
import { Text } from "react-native";
import { i18n } from "../constants/Dictionary";

export default class NearbyScreen extends React.Component {
    static navigationOptions = {
      title: i18n.nearby
    };

    render() {
        return (
            <Text>Nearby Activity</Text>
        );
    }
}
