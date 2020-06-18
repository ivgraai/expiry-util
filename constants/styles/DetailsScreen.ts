import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: "space-around"
    },
    imageView: {
        flex: 3,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    image: {
        aspectRatio: 1,
        width: Layout.width,
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth,
        borderRadius: Layout.borderRadius
    },
    dataView: {
        flex: 2,
        width: Layout.width,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    warnText: {
        textAlign: "center",
        color: Colors.tintColor,
        fontSize: 18
    },
    baseDataView: {

    },
    replyDataView: {

    },
    dataText: {
        alignSelf: "center"
    }
});
