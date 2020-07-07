import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center"
    },
    image: {
        width: "30%",
        height: "30%",
        alignSelf: "center",
        aspectRatio: 1.4
    },
    text: {
        color: Colors.alternativeColor,
        textAlign: "center",
        fontSize: PixelRatio.getFontScale() * Layout.largerFontSize
    }
});