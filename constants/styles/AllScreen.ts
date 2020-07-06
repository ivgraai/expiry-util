import { StyleSheet } from "react-native";
import Colors from "../Colors";

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        width: "40%",
        height: "40%",
        alignSelf: "center",
        aspectRatio: 1
    },
    text: {
        color: Colors.alternativeColor,
        textAlign: "center"
    }
});