import React from "react";
import { Text, FlatList, View } from "react-native";
import Dialog from "../components/Dialog";
import { i18n } from "../constants/Dictionary";
import Utility from "../common/Utility";
import UserManager from "../services/UserManager";
import HttpClient from "../services/HttpClient";
import * as Dtos from "../constants/Dtos";
import { styles } from "../constants/styles/ApprovalScreen";
import StyledButton from "../components/StyledButton";

interface IProps {
    navigation: any
}

interface IState {
    allRequests: undefined | Dtos.RequestAllResponse,
    showModal: boolean,
    beneficiary: number | undefined
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
                .then(allRequests => {
                    allRequests.datas = allRequests.datas.sort((item1, item2) => item1.datetime.getTime() - item2.datetime.getTime());
                    this.updateState({allRequests});
                })
                .catch(HttpClient.ERROR_HANDLER);
        });
    }

    updateState(state: any) {
        if (undefined != state.allRequests && null != state.allRequests.accepted) {
            let value = state.allRequests.datas.find(
                    (item: { id: number; }) => item.id == state.allRequests.accepted
                ).id;
            state = Utility.assignChildState("beneficiary", value, state);
        }
        this.setState(state);
    }

    acceptRequest(message: string): void {
        UserManager.getToken().then(token => {
            HttpClient.approveRequest(token!, this.requestId, message)
                .then(() => this.updateState({
                    allRequests: {
                        accepted: this.requestId,
                        datas: this.state.allRequests!.datas
                    },
                    showModal: false
                }));
        });
    }

    render() {
        var emptyLine = <Text />;
        var onPress = (item: Dtos.RequestData) => {
            this.requestId = item.id;
            this.updateState({showModal: true});
        };
        return <>
            <Dialog visible={this.state.showModal} onClose={msg => this.acceptRequest(msg)} />
            <FlatList
                data={this.state.allRequests?.datas}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <View style={styles.itemView}>
                    <View style={styles.requestDataSection}>
                        <Text style={styles.usernameText}>{item.username}</Text>
                        <Text style={styles.datetimeAndMessageTexts}>{item.datetime.toLocaleString()}</Text>
                        {emptyLine}
                        <Text style={styles.datetimeAndMessageTexts}>{item.message}</Text>
                    </View>
                    {(!this.state.allRequests!.accepted || item.id == this.state.beneficiary) &&
                        <StyledButton
                            onPress={() => onPress(item)}
                            style={styles.approveButton}
                            disabled={null != this.state.allRequests!.accepted}
                            inverted={item.id == this.state.beneficiary}>
                                {(item.id == this.state.beneficiary ? i18n.approved : i18n.approve).toUpperCase()}
                        </StyledButton>}
                </View>}
            />
        </>;
    }
}
