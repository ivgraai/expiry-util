import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    rootView: {
        flex: 1
    },
    imageView: {
        flex: 2,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    image: {
        aspectRatio: 1,
        width: (Layout.widthPercentageAsNumber - 15) + '%',
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth,
        borderRadius: Layout.borderRadius
    },
    dataView: {
        flex: 2,
        width: Layout.widthPercentageAsString,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    warnText: {
        textAlign: "center",
        color: Colors.tintColor,
        fontSize: 18
    },
    dataText: {
        alignSelf: "center"
    }
});
