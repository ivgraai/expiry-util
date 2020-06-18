import React from "react";
import { View, Text } from "react-native";
import { styles } from "../constants/styles/StyledComponent";

export default function StyledComponent(props: any) {
    return <View style={[styles.containerView, props.style]}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>{props.header}</Text>
            </View>
            {props.children}
        </View>;
}
