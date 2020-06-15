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
    leftChildImage: {
        height: "90%",
        width: "90%",
        aspectRatio: 1
    },
    rightChild: {
        flex: 2,
        flexDirection: "column"
    },
    grandChildHeader: {
        // position: "absolute",
        flex: 0.2,
        backgroundColor: Colors.tintColor,
        borderTopRightRadius: 18,
        overflow: "hidden"
    },
    grandChildHeaderText: {
        textAlign: "center",
        color: Colors.backgroundColor
    },
    grandChildBody: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },
    grandChildBodyText: {
        textAlign: "center"
    }
});
