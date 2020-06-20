import { StyleSheet, PixelRatio } from "react-native";
import Layout from "../Layout";
import Colors from "../Colors";

const padding: number = PixelRatio.getPixelSizeForLayoutSize(5);

export const styles = (isDark: boolean) => StyleSheet.create({
    itemView: {
        margin: Layout.margin,
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth,
        borderRadius: Layout.borderRadius,
        flexDirection: "row"
    },
    requestDataSection: {
        flex: 9,
        paddingLeft: padding
    },
    approveButton: {
        flex: 8,
        alignSelf: "center",
        alignItems: "flex-end",
        paddingRight: padding
    },
    usernameText: {
        fontWeight: "bold",
        color: Colors.tintColor
    },
    datetimeAndMessageTexts: {
        color: isDark ? Colors.labelDarkColor : Colors.labelLightColor
    }
});
