import React from "react";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";
import Utility from "../common/Utility";
import * as Dtos from "../constants/Dtos";
import HttpClient from "../services/HttpClient";
import UserManager from "../services/UserManager";

interface IProps {
    navigation: any;
}

interface IState {
    response: Dtos.GoodResponse | null
}

class DetailsScreen extends React.Component<IProps, IState> {
    private id: number = this.props.navigation.getParam("goodId");

    constructor(props: any) {
        super(props);
        this.state = {
            response: null
        }
    }

    componentDidMount() {
        UserManager.getToken().then(token => {
            HttpClient.checkStatus(token, this.id).then(response => {
                if (response) {
                    this.setState({response});
                }
            })
        });
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "space-around"}}>
                <CachedImage
                    source={{ uri: Utility.remoteURI("", this.id, Dtos.SizeRequest.large) }}
                    style={{ flex: 3, height: "100%", width: "100%", aspectRatio: 1, alignSelf: "center" }}
                />
                <View style={{flex: 2}}>
                    <Text>{this.state.response?.name.toUpperCase()}</Text>
                    <Text>{this.state.response?.expiry.toLocaleDateString()}</Text>
                    <Text>{this.state.response?.myMessage}</Text>
                    {
                        (this.state.response?.isAccepted) ? <>
                        <Text>{this.state.response?.username}</Text>
                        <Text>{this.state.response?.replyMessage}</Text>
                        <Text>{this.state.response?.address.postalCode}</Text>
                        <Text>{this.state.response?.address.country}</Text>
                        <Text>{this.state.response?.address.region}</Text>
                        <Text>{this.state.response?.address.city}</Text>
                        <Text>{this.state.response?.address.street}</Text>
                        <Text>{this.state.response?.address.name}</Text>
                    </> :
                        null
                    }
                </View>
            </View>
        );
    }
}

export default DetailsScreen;