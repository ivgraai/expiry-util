import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTheme } from "react-navigation";
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

    const theme = useTheme();
    const withStyle = styles('dark' === theme);
    return (
        <ScrollView scrollEnabled={response?.isAccepted}>
            <View style={withStyle.imageView}>
                <CachedImage
                    source={{ uri: Utility.remoteURI("", id, Dtos.SizeRequest.large) }}
                    style={withStyle.image}
                    onDownloaded={(uri: string) => DbHelper.newImage(uri, false)}
                />
            </View>
            <View style={withStyle.dataView}>
                <StyledComponent header={response?.name.toUpperCase()} style={withStyle.styledComponent}>
                    <Text style={withStyle.dataText}>{response?.expiry.toLocaleDateString()}</Text>
                    <View style={withStyle.hrView} />
                    <Text style={withStyle.dataText}>{response?.myMessage}</Text>
                </StyledComponent>
                <Text style={withStyle.warnText}>{(response?.isAccepted ? i18n.yourRequestHasAlreadyBeenApproved.capitalize() : i18n.yourRequestHasNotYetBeenApproved.capitalize()) + '!'}</Text>
                {
                    (response?.isAccepted) ? <>
                    <StyledComponent header={i18n.username.toUpperCase()} style={withStyle.styledComponent}>
                        <Text style={withStyle.dataText}>{response?.username}</Text>
                    </StyledComponent>
                    <StyledComponent header={i18n.address.toUpperCase()} style={withStyle.styledComponent}>
                        <Text style={withStyle.dataText}>{Utility.formatAddress(response?.address)}</Text>
                    </StyledComponent>
                    <StyledComponent header={i18n.reply.toUpperCase()} style={[withStyle.styledComponent, withStyle.marginBottom]}>
                        <Text style={withStyle.dataText}>{response?.replyMessage}</Text>
                    </StyledComponent>
                </> :
                    null
                }
            </View>
        </ScrollView>
    );
}
