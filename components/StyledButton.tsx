import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../constants/styles/StyledButton";

export default function StyledButton(props: any) {
    return <View style={props.style}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={props.onPress} testID={props.testID} disabled={props.disabled}>
            <Text style={styles.text}>
                {props.children}
            </Text>
        </TouchableOpacity>
    </View>;
}
