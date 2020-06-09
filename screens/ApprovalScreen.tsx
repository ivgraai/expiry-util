import React from "react";
import { Text, FlatList, Button } from "react-native";
import Dialog from "../components/Dialog";
import { i18n } from "../constants/Dictionary";
import Utility from "../common/Utility";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import * as Dtos from "../constants/Dtos";

interface IProps {
    navigation: any
}

interface IState {
    allRequests: undefined | Dtos.RequestAllResponse,
    showModal: boolean,
    beneficiary: string | undefined
}

export default class ApprovalScreen extends React.Component<IProps, IState> {
    private readonly goodId: number = this.props.navigation.getParam("goodId");

    constructor(props: IProps) {
        super(props);
        this.state = {
            allRequests: undefined,
            showModal: false,
            beneficiary: undefined
        };
    }
    private requestId: number = 0;

    componentDidMount() {
        UserManager.getToken().then(token => {
            HttpClient.findAllRequest(token!, this.goodId)
                .then(allRequests => this.updateState({allRequests}))
                .catch(HttpClient.ERROR_HANDLER);
        });
    }

    updateState(state: any) {
        if (undefined != state.allRequests && null != state.allRequests.accepted) {
            let value = state.allRequests.datas.find(
                    (item: { id: number; }) => item.id == state.allRequests.accepted
                ).username;
            state = Utility.assignChildState("beneficiary", value, state);
        }
        this.setState(state);
    }

    acceptRequest(message: string): void {
        let datas = this.state.allRequests!.datas;
        UserManager.getToken().then(token => {
            HttpClient.approveRequest(token!, this.requestId, message)
                .then(() => this.updateState({
                    allRequests: {
                        accepted: this.requestId,
                        datas
                    },
                    showModal: false
                }));
        });
    }

    render() {
        var onPress = (item: Dtos.RequestData) => {
            this.requestId = item.id;
            this.updateState({showModal: true});
        };
        return <>
            <Dialog visible={this.state.showModal} onClose={msg => this.acceptRequest(msg)} />
            {this.state.beneficiary &&
                <Text>{i18n.youAlreadyApprovedTheFollowingApplicantRequest.capitalize() + ": " + this.state.beneficiary}</Text>}
            <FlatList
                data={this.state.allRequests?.datas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <>
                    <Text>{item.username}</Text>
                    <Text>{item.datetime.toLocaleString()}</Text>
                    <Text>{item.message}</Text>
                    {(null == this.state.allRequests!.accepted) &&
                        <Button title={i18n.approve.capitalize()} onPress={() => onPress(item)} />}
                </>}
            />
        </>;
    }
}
