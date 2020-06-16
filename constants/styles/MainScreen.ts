import { StyleSheet } from "react-native";

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
        borderColor: "lightgray",
        borderWidth: 1,
        height: "75%",
        width: "75%"
    },
    photoImage: {
        width: "100%",
        height: "100%"
    },
    photoText: {
        textAlign: "center"
    },
    dataView: {
        flex: 2,
        alignItems: "center"
    },
    dataPerishableGoodsTextInput: {
        textAlign: "center",
        height: "10%",
        borderColor: "lightgray",
        borderWidth: 1,
        width: "75%"
    },
    dataExpirationDateText: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 5
    },
    dataExpirationDateView: {
        flexDirection: "row",
        justifyContent: "center"
    },
    dataExpirationDateDateTimePicker: {
        width: "75%",
        height: 190
    },
    dataLocationCheckBoxContainer: {
        backgroundColor: "transparent",
        borderWidth: 0
    },
    dataLocationCheckBoxText: {
        fontWeight: "normal"
    },
    addView: {
        flex: 2,
        width: "75%",
        flexDirection: "column",
        justifyContent: "center"
    },
    addTouchableOpacity: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "gray",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white"
    },
    addText: {
        color: "white",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10
    }
});
