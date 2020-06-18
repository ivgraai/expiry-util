import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        paddingTop: PixelRatio.getPixelSizeForLayoutSize(5),
        paddingBottom: PixelRatio.getPixelSizeForLayoutSize(5),
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
        marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5),
        letterSpacing: Layout.letterSpacing
    },
    messageText: {
        fontSize: PixelRatio.getFontScale() * 20,
        color: Colors.errorText,
        textAlign: "center",
        flex: 1
    },
    signUpInText: {
        fontStyle: "italic"
    },
    hrView: {
        borderBottomColor: "#808080",
        borderBottomWidth: PixelRatio.getPixelSizeForLayoutSize(0.5)
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
