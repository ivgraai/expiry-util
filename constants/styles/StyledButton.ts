import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const padding = PixelRatio.getPixelSizeForLayoutSize(5);

export const styles = StyleSheet.create({
    touchableOpacity: {
        paddingTop: padding,
        paddingBottom: padding,
        borderRadius: Layout.borderRadius,
        borderWidth: Layout.borderWidth
    },
    touchableOpacityColors: {
        backgroundColor: Colors.tintColor,
        borderColor: Layout.borderColor
    },
    invertedTouchableOpacityColors: {
        backgroundColor: Colors.backgroundColor,
        borderColor: Colors.tintColor
    },
    text: {
        textAlign: "center",
        paddingLeft: padding,
        paddingRight: padding,
        letterSpacing: Layout.letterSpacing
    },
    textColors: {
        color: Colors.backgroundColor
    },
    invertedTextColors: {
        color: Colors.tintColor
    }
});
