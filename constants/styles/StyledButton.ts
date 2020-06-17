import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const padding = 10;

export const styles = StyleSheet.create({
    touchableOpacity: {
        paddingTop: padding,
        paddingBottom: padding,
        backgroundColor: Colors.tintColor,
        borderRadius: Layout.borderRadius,
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor
    },
    text: {
        color: Colors.backgroundColor,
        textAlign: "center",
        paddingLeft: padding,
        paddingRight: padding,
        letterSpacing: Layout.letterSpacing
    }
});
