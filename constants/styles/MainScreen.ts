import { StyleSheet, PixelRatio, Platform } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const outerHeight = "20%";
const innerHeight = "63%";

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
        height: outerHeight
    },
    dataPerishableGoodsTextInput: {
        textAlign: "center",
        paddingBottom: (Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(6.5) : 0,
        height: innerHeight
    },
    dataPerishableGoodsTextInputError: {
        borderColor: Colors.errorBackground,
        borderWidth: Layout.borderWidth,
        borderBottomLeftRadius: Layout.borderRadius,
        borderBottomRightRadius: Layout.borderRadius
    },
    dataPerishableGoodsTextInputErrorText: {
        color: Colors.errorText
    },
    dataExpirationDateWrapper: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(11),
        width: Layout.widthPercentageAsString,
        height: outerHeight
    },
    dataExpirationDateView: {
        flexDirection: "row",
        justifyContent: "center",
        height: innerHeight
    },
    dataExpirationDateValue: {
        flexDirection: "row",
        alignItems: "center"
    },
    dataExpirationDateValueIcon: {
        marginRight: PixelRatio.getPixelSizeForLayoutSize(1.5)
    },
    dataExpirationDateValueText: {
        color: isDark ? Colors.labelDarkColor : Colors.labelLightColor
    },
    dataLocationCheckBoxContainer: {
        marginTop: PixelRatio.getPixelSizeForLayoutSize(6.5),
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
