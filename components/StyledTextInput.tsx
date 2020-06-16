import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../constants/styles/StyledTextInput";

export default function StyledTextInput(props: any) {
    return <View style={styles.view}>
        <View style={styles.textView}>
            <Text style={styles.text}>{props.header}</Text>
        </View>
        <TextInput {...props} />
    </View>;
}
