import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    photoView: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    photoTouchableOpacity: {
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth,
        height: "85%",
        width: Layout.widthPercentageAsString,
        borderRadius: Layout.borderRadius
    },
    photoImage: {
        width: "100%",
        height: "100%",
        borderRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference
    },
    photoTextWrapper: {
        justifyContent: "center",
        flex: 1
    },
    photoText: {
        textAlign: "center",
        color: Colors.tintColor,
        letterSpacing: Layout.letterSpacing
    },
    dataView: {
        flex: 2,
        alignItems: "center"
    },
    dataPerishableGoodsTextInputWrapper: {
        width: Layout.widthPercentageAsString,
        height: "10%"
    },
    dataPerishableGoodsTextInput: {
        textAlign: "center"
    },
    dataExpirationDateWrapper: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(7.5)
    },
    dataExpirationDateView: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: PixelRatio.getPixelSizeForLayoutSize(7.5) * -1
    },
    dataExpirationDateDateTimePicker: {
        width: Layout.widthPercentageAsString,
        height: 200
    },
    dataLocationCheckBoxContainer: {
        backgroundColor: "transparent",
        borderWidth: 0
    },
    dataLocationCheckBoxText: {
        fontWeight: "normal",
        color: Colors.tintColor,
        letterSpacing: Layout.letterSpacing
    },
    addView: {
        flex: 2,
        width: Layout.widthPercentageAsString,
        flexDirection: "column",
        justifyContent: "center"
    },
    addStyledButton: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(7.5) * -1,
        marginRight: PixelRatio.getPixelSizeForLayoutSize(20),
        marginLeft: PixelRatio.getPixelSizeForLayoutSize(20)
    }
});
