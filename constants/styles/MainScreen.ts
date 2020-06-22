import { StyleSheet, PixelRatio, Platform } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = (isDark: boolean) => StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    photoView: {
        flex: 6,
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
        flex: 5,
        alignItems: "center"
    },
    dataPerishableGoodsTextInputWrapper: {
        width: Layout.widthPercentageAsString,
        height: "10%"
    },
    dataPerishableGoodsTextInput: {
        textAlign: "center",
        paddingBottom: (Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(5) : 0
    },
    dataExpirationDateWrapper: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
        width: Layout.widthPercentageAsString
    },
    dataExpirationDateView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    dataExpirationDateValue: {
        flexDirection: "row"
    },
    dataExpirationDateValueIcon: {
        marginRight: PixelRatio.getPixelSizeForLayoutSize(1.5)
    },
    dataExpirationDateValueText: {
        color: isDark ? Colors.labelDarkColor : Colors.labelLightColor
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
