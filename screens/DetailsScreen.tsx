import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CachedImage from "../components/CachedImage";
import Utility from "../common/Utility";
import * as Dtos from "../constants/Dtos";
import HttpClient from "../services/HttpClient";
import UserManager from "../services/UserManager";
import DbHelper from "../services/DbHelper";
import { styles } from "../constants/styles/DetailsScreen";
import { i18n } from "../constants/Dictionary";
import StyledComponent from "../components/StyledComponent";

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
        <View style={styles.rootView}>
            <View style={styles.imageView}>
                <CachedImage
                    source={{ uri: Utility.remoteURI("", id, Dtos.SizeRequest.large) }}
                    style={styles.image}
                    onDownloaded={(uri: string) => DbHelper.newImage(uri, false)}
                />
            </View>
            <View style={styles.dataView}>
                { response?.isAccepted ? null :
                    <Text style={styles.warnText}>{i18n.yourRequestHasNotYetBeenApproved.capitalize() + '!'}</Text> }
                <View style={styles.baseDataView}>
                    <StyledComponent header={response?.name.toUpperCase()}>
                        <Text style={styles.dataText}>{response?.expiry.toLocaleDateString()}</Text>
                        <Text style={styles.dataText}>{response?.myMessage}</Text>
                    </StyledComponent>
                </View>
                {
                    (response?.isAccepted) ? <View style={styles.replyDataView}>
                    <StyledComponent header={i18n.approved.toUpperCase()}>
                        <Text style={styles.dataText}>{response?.username}</Text>
                        <Text style={styles.dataText}>{response?.replyMessage}</Text>
                        <Text style={styles.dataText}>{response?.address.postalCode}</Text>
                        <Text style={styles.dataText}>{response?.address.country}</Text>
                        <Text style={styles.dataText}>{response?.address.region}</Text>
                        <Text style={styles.dataText}>{response?.address.city}</Text>
                        <Text style={styles.dataText}>{response?.address.street}</Text>
                        <Text style={styles.dataText}>{response?.address.name}</Text>
                    </StyledComponent>
                </View> :
                    null
                }
            </View>
        </View>
    );
}
