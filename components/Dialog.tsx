import React from "react";
import { Modal, View, TextInput } from "react-native";
import { ThemeContext } from "react-navigation";
import StyledButton from "./StyledButton";
import { styles } from "../constants/styles/Dialog";
import { i18n } from "../constants/Dictionary";
import Colors from "../constants/Colors";

interface IProps {
    visible: boolean,
    onClose: (message: string) => void
}

class Dialog extends React.PureComponent<IProps> {
    static contextType = ThemeContext;
    private message: string | undefined;

    modalOnClose() {
        if (!this.message) {
            return;
        }
        const temp = this.message;
        this.message = undefined;
        this.props.onClose(temp);
    }

    // static getDerivedStateFromProps(props, state) { empty method }

    render() {
        const theme = this.context;
        const withStyle = styles('dark' === theme);
        var callback = () => this.modalOnClose();
        return (
            <Modal transparent={true} visible={this.props.visible} onRequestClose={callback}>
                <View style={withStyle.centeredView}>
                    <View style={withStyle.modalView}>
                        <View style={withStyle.modalTextInputWrapper}>
                            <TextInput style={withStyle.modalTextInput} onChangeText={text => this.message = text} placeholder={i18n.leaveAMessage.capitalize() + "..."} placeholderTextColor={Colors.backgroundColor} testID="textInput" />
                        </View>
                        <StyledButton onPress={callback} testID="button">{i18n.submit.toUpperCase()}</StyledButton>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default Dialog;