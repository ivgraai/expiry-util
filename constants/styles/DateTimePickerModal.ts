import { StyleSheet, PixelRatio } from "react-native";
import Layout from "../Layout";
import Colors from "../Colors";

const backgroundColor = "transparent";
const fontSize = PixelRatio.getFontScale() * Layout.largerFontSize;
const buttonHeight = PixelRatio.getPixelSizeForLayoutSize(23.5);
const buttonFontWeight = "normal";

export const styles: any = (isDark: boolean) => StyleSheet.create({
    headerRoot: {
        borderBottomColor: Layout.borderColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: PixelRatio.getPixelSizeForLayoutSize(7),
        backgroundColor
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
        justifyContent: "center"
    },
    confirmText: {
        textAlign: "center",
        color: Colors.tintColor,
        fontSize,
        fontWeight: buttonFontWeight,
        backgroundColor
    },
    cancelButton: {
        borderRadius: 13,
        height: buttonHeight,
        marginBottom: 0,
        justifyContent: "center",
        backgroundColor: isDark ? "#0E0E0E" : "white"
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
