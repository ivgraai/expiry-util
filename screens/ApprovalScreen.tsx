import React from "react";
import { Text, FlatList } from "react-native";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import * as Dtos from "../constants/Dtos";

interface IProps {
    navigation: any
}

interface IState {
    data: Dtos.RequestAllResponse[];
}

export default class ApprovalScreen extends React.Component<IProps, IState> {
    private readonly id: number = this.props.navigation.getParam("goodId");

    constructor(props: IProps) {
        super(props);
        this.state = {
            data: new Array()
        };
    }

    componentDidMount() {
        UserManager.getToken().then(token => {
            HttpClient.findAllRequest(token!, this.id).then(data => this.setState({data}));
        });
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <>
                    <Text>{item.username}</Text>
                    <Text>{item.datetime.toLocaleString()}</Text>
                    <Text>{item.message}</Text>
                </>}
            />
        );
    }
}
