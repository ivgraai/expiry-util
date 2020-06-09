import React from "react";
import { Modal, View, TextInput, Button } from "react-native";
import { styles } from '../constants/styles/Dialog';
import { i18n } from "../constants/Dictionary";

interface IProps {
    visible: boolean,
    onClose: (message: string) => void
}

class Dialog extends React.Component<IProps> {
    private message: string | undefined = undefined;

    modalOnClose() {
        if (!this.message) {
            return;
        }
        this.props.onClose(this.message);
    }

    componentWillReceiveProps(_: IProps) {
        // empty method
    }

    render() {
        var callback = () => this.modalOnClose();
        return (
            <Modal transparent={true} visible={this.props.visible} onRequestClose={callback}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput style={styles.modalTextInput} onChangeText={text => this.message = text} />
                        <Button title={i18n.submit.toUpperCase()} onPress={callback} />
                    </View>
                </View>
            </Modal>
        );
    }
}

export default Dialog;