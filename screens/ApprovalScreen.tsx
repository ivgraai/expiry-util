import React from "react";
import { Text, FlatList, Button } from "react-native";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import * as Dtos from "../constants/Dtos";
import { i18n } from "../constants/Dictionary";

interface IProps {
    navigation: any
}

interface IState {
    data: undefined | Dtos.RequestAllResponse;
}

export default class ApprovalScreen extends React.Component<IProps, IState> {
    private readonly id: number = this.props.navigation.getParam("goodId");

    constructor(props: IProps) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    componentDidMount() {
        UserManager.getToken().then(token => {
            HttpClient.findAllRequest(token!, this.id)
                .then(data => this.setState({data}))
                .catch(HttpClient.ERROR_HANDLER);
        });
    }

    render() {
        return (
            <FlatList
                data={this.state.data?.datas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <>
                    <Text>{item.username}</Text>
                    <Text>{item.datetime.toLocaleString()}</Text>
                    <Text>{item.message}</Text>
                    {(null == this.state.data!.accepted) &&
                        <Button title={i18n.approve.capitalize()} onPress={() => {}} />}
                </>}
            />
        );
    }
}
