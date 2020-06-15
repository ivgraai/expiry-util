import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";

const borderWidth = 2;
const borderColor = Colors.backgroundColor;

export const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        height: PixelRatio.getPixelSizeForLayoutSize(75),
        borderWidth: borderWidth,
        borderColor: borderColor,
        margin: 5,
        borderRadius: 20
    },
    leftChild: {
        flex: 2,
        alignItems: "center",
        borderRightWidth: borderWidth,
        borderRightColor: borderColor
    },
    rightChild: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center"
    }
});
