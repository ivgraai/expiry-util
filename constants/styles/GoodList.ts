import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        height: PixelRatio.getPixelSizeForLayoutSize(75),
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor,
        margin: 5,
        borderRadius: Layout.borderRadius
    },
    leftChild: {
        flex: 2,
        alignItems: "center",
        borderRightWidth: Layout.borderWidth,
        borderRightColor: Layout.borderColor,
        justifyContent: "center"
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
        borderTopRightRadius: Layout.borderRadius - 2,
        overflow: "hidden",
        justifyContent: "center",
        borderBottomWidth: Layout.borderWidth,
        borderBottomColor: Layout.borderColor
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
