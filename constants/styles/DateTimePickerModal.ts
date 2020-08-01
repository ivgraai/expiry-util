import { StyleSheet, PixelRatio } from "react-native";
import Layout from "../Layout";
import Colors from "../Colors";

const backgroundColor = "transparent";
const fontSize = PixelRatio.getFontScale() * Layout.largerFontSize;
const buttonHeight = PixelRatio.getPixelSizeForLayoutSize(23.5);
const buttonFontWeight = "normal";
const borderRadius = 13;

export const styles: any = (isDark: boolean) => StyleSheet.create({
    headerRoot: {
        borderBottomColor: Layout.borderColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: PixelRatio.getPixelSizeForLayoutSize(7),
        backgroundColor,
        borderLeftColor: Layout.borderColor,
        borderLeftWidth: Layout.borderWidth,
        borderTopLeftRadius: borderRadius,
        borderTopColor: Layout.borderColor,
        borderTopWidth: Layout.borderWidth,
        borderTopRightRadius: borderRadius,
        borderRightColor: Layout.borderColor,
        borderRightWidth: Layout.borderWidth
    },
    headerText: {
        textAlign: "center",
        color: Colors.backgroundColor,
        fontSize
    },
    confirmButton: {
        borderColor: Layout.borderColor,
        borderTopWidth: StyleSheet.hairlineWidth,
        backgroundColor,
        height: buttonHeight,
        justifyContent: "center",
        borderLeftColor: Layout.borderColor,
        borderLeftWidth: Layout.borderWidth,
        borderBottomLeftRadius: borderRadius,
        borderBottomColor: Layout.borderColor,
        borderBottomWidth: Layout.borderWidth,
        borderBottomRightRadius: borderRadius,
        borderRightColor: Layout.borderColor,
        borderRightWidth: Layout.borderWidth
    },
    confirmText: {
        textAlign: "center",
        color: Colors.tintColor,
        fontSize,
        fontWeight: buttonFontWeight,
        backgroundColor
    },
    cancelButton: {
        borderRadius: borderRadius,
        height: buttonHeight,
        marginBottom: 0,
        justifyContent: "center",
        backgroundColor: isDark ? "#0E0E0E" : "white",
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth
    },
    cancelText: {
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
        textAlign: "center",
        color: Colors.tintColor,
        fontSize,
        fontWeight: buttonFontWeight,
        backgroundColor
    }
});
