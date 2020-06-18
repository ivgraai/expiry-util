import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    containerView: {
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor,
        borderRadius: Layout.borderRadius
    },
    headerWrapper: {
        backgroundColor: Colors.tintColor,
        borderTopLeftRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderTopRightRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderBottomWidth: Layout.borderWidth,
        borderBottomColor: Layout.borderColor
    },
    headerText: {
        textAlign: "center",
        color: Colors.backgroundColor,
        letterSpacing: Layout.letterSpacing
    }
});
