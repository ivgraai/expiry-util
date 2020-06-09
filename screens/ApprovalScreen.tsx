import React from "react";
import { Text, FlatList, Button } from "react-native";
import Dialog from "../components/Dialog";
import { i18n } from "../constants/Dictionary";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import * as Dtos from "../constants/Dtos";

interface IProps {
    navigation: any
}

interface IState {
    allRequests: undefined | Dtos.RequestAllResponse,
    showModal: boolean
}

export default class ApprovalScreen extends React.Component<IProps, IState> {
    private readonly goodId: number = this.props.navigation.getParam("goodId");

    constructor(props: IProps) {
        super(props);
        this.state = {
            allRequests: undefined,
            showModal: false
        };
    }
    private requestId: number = 0;

    componentDidMount() {
        UserManager.getToken().then(token => {
            HttpClient.findAllRequest(token!, this.goodId)
                .then(allRequests => this.setState({allRequests}))
                .catch(HttpClient.ERROR_HANDLER);
        });
    }

    acceptRequest(message: string): void {
        UserManager.getToken().then(token => {
            HttpClient.approveRequest(token!, this.requestId, message)
                .then(() => this.setState({
                    allRequests: {
                        accepted: this.requestId,
                        datas: this.state.allRequests!.datas
                    },
                    showModal: false
                }));
        });
    }

    render() {
        var onPress = (item: Dtos.RequestData) => {
            this.requestId = item.id;
            this.setState({showModal: true});
        };
        return <>
            <Dialog visible={this.state.showModal} onClose={msg => this.acceptRequest(msg)} />
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
