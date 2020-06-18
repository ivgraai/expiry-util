import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        paddingTop: 10,
        paddingBottom: 10,
        width: Layout.widthPercentageAsString,
        alignSelf: "center"
    },
    text: {
        fontWeight: "bold"
    },
    textInput: {
        textAlign: "center",
        minHeight: "13%"
    },
    buttonWrapper: {
        alignSelf: "center"
    },
    orText: {
        textAlign: "center",
        color: Colors.tintColor,
        marginTop: 10,
        marginBottom: 10,
        letterSpacing: Layout.letterSpacing
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
        borderBottomLeftRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderBottomRightRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference
    },
    validationResultText: {
        color: Colors.errorText,
        flex: 1
    },
    inputsAndValidationResultView: {
        flex: 5,
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
