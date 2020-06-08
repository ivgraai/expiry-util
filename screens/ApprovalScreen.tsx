import React from "react";
import { Text } from "react-native";

interface IProps {
    navigation: any
}

export default class ApprovalScreen extends React.Component<IProps> {
    private readonly id: number = this.props.navigation.getParam("goodId");

    render() {
        return (
            <Text>Approval Activity</Text>
        );
    }
}
