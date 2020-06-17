import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";
import Utility from "../common/Utility";
import * as Dtos from "../constants/Dtos";
import HttpClient from "../services/HttpClient";
import UserManager from "../services/UserManager";
import DbHelper from "../services/DbHelper";

interface IProps {
    navigation: any;
}

export default function DetailsScreen(props: IProps) {
    let id: number = props.navigation.getParam("goodId");
    const [response, setResponse] = useState<Dtos.GoodResponse | null>(null);

    useEffect(() => {
        UserManager.getToken().then(token => {
            HttpClient.checkStatus(token, id).then(response => {
                if (response) {
                    setResponse(response);
                }
            })
        });
    }, []);

    return (
        <View style={{flex: 1, justifyContent: "space-around"}}>
            <CachedImage
                source={{ uri: Utility.remoteURI("", id, Dtos.SizeRequest.large) }}
                style={{ flex: 3, height: "100%", width: "100%", aspectRatio: 1, alignSelf: "center" }}
                onDownloaded={(uri: string) => DbHelper.newImage(uri, false)}
            />
            <View style={{flex: 2}}>
                <Text>{response?.name.toUpperCase()}</Text>
                <Text>{response?.expiry.toLocaleDateString()}</Text>
                <Text>{response?.myMessage}</Text>
                {
                    (response?.isAccepted) ? <>
                    <Text>{response?.username}</Text>
                    <Text>{response?.replyMessage}</Text>
                    <Text>{response?.address.postalCode}</Text>
                    <Text>{response?.address.country}</Text>
                    <Text>{response?.address.region}</Text>
                    <Text>{response?.address.city}</Text>
                    <Text>{response?.address.street}</Text>
                    <Text>{response?.address.name}</Text>
                </> :
                    null
                }
            </View>
        </View>
    );
}
