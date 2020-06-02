import { StyleSheet } from "react-native";

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
        height: "5%",
        borderColor: "lightgray",
        borderWidth: 1
    },
    buttonWrapper: {
        alignSelf: "center"
    },
    orText: {
        textAlign: "center"
    },
    messageText: {
        fontSize: 20,
        color: "red",
        textAlign: "center"
    },
    signUpInText: {
        fontStyle: "italic"
    },
    hrView: {
        borderBottomColor: "#808080",
        borderBottomWidth: 1
    },
    error: {
        borderColor: "pink",
        borderWidth: 3
    }
  });
