import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const width: string = "85%";

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
        width: width,
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
        width,
        height: "10%"
    },
    dataPerishableGoodsTextInput: {
        textAlign: "center"
    },
    dataExpirationDateWrapper: {
        marginTop: 15,
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor,
        borderRadius: Layout.borderRadius
    },
    dataExpirationDateTextWrapper: {
        backgroundColor: Colors.tintColor,
        borderTopLeftRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderTopRightRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderBottomWidth: Layout.borderWidth,
        borderBottomColor: Layout.borderColor
    },
    dataExpirationDateText: {
        textAlign: "center",
        color: Colors.backgroundColor,
        letterSpacing: Layout.letterSpacing
    },
    dataExpirationDateView: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: -15
    },
    dataExpirationDateDateTimePicker: {
        width: width,
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
        width: width,
        flexDirection: "column",
        justifyContent: "center"
    },
    addTouchableOpacity: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: -15,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.tintColor,
        borderRadius: Layout.borderRadius,
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor
    },
    addText: {
        color: Colors.backgroundColor,
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        letterSpacing: Layout.letterSpacing
    }
});
