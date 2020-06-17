import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        padding: 10
    },
    text: {
        fontWeight: "bold"
    },
    textInput: {
        textAlign: "center"
        // , height: "10%"
    },
    buttonWrapper: {
        alignSelf: "center"
    },
    orText: {
        textAlign: "center",
        color: Colors.backgroundColor
    },
    messageText: {
        fontSize: 20,
        color: Colors.errorText,
        textAlign: "center",
        flex: 1
    },
    signUpInText: {
        fontStyle: "italic"
    },
    hrView: {
        borderBottomColor: "#808080",
        borderBottomWidth: 1
    },
    error: {
        borderColor: Colors.errorBackground,
        borderWidth: Layout.borderWidth,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius
    },
    validationResultText: {
        color: Colors.tintColor,
        flex: 1
    },
    inputsAndValidationResultView: {
        flex: 3,
        justifyContent: "space-between"
    },
    buttonsView: {
        flex: 2,
        justifyContent: "center"
    },
    inputsView: {
        justifyContent: "space-around",
        flex: 3
    }
  });
