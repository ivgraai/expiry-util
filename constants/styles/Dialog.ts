import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
          },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
    modalTextInput: {
        borderWidth: 1,
        minWidth: 50
    }
  });
