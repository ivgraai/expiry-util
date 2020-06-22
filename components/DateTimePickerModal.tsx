import React from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { HeaderComponent, ConfirmButtonComponent, CancelButtonComponent } from "react-native-modal-datetime-picker";
import { styles } from "../constants/styles/DateTimePickerModal";
import Colors from "../constants/Colors";

export const dateTimePickerHeader: HeaderComponent = ({ label }) => {
    let isDarkModeEnabled = false;
    return <View style={styles(isDarkModeEnabled).headerRoot}>
        <Text style={styles(isDarkModeEnabled).headerText}>{label}</Text>
    </View>;
};

const dateTimePickerButton = (buttonStyle: string, textStyle: string) => (({ isDarkModeEnabled, onPress, label }: { isDarkModeEnabled: boolean, onPress: () => void, label: string }) => (
    <TouchableHighlight
        style={styles(isDarkModeEnabled)[buttonStyle]}
        underlayColor={isDarkModeEnabled ? "#0E0E0E" : "white"}
        onPress={onPress}
    >
        <Text style={styles(isDarkModeEnabled)[textStyle]}>{label}</Text>
    </TouchableHighlight>
));

export const dateTimePickerConfirmButton: ConfirmButtonComponent = dateTimePickerButton("confirmButton", "confirmText");
export const dateTimePickerCancelButton: CancelButtonComponent = dateTimePickerButton("cancelButton", "cancelText");
