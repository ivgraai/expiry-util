import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { styles } from "../constants/styles/StyledButton";

export default React.memo(function StyledButton(props: any) {
    return <View style={props.style}>
        <TouchableOpacity style={[styles.touchableOpacity, !props.inverted ? styles.touchableOpacityColors : styles.invertedTouchableOpacityColors]} onPress={props.onPress} testID={props.testID} disabled={props.disabled}>
            <Text style={[styles.text, !props.inverted ? styles.textColors : styles.invertedTextColors]}>
                {props.children}
            </Text>
        </TouchableOpacity>
    </View>;
})
