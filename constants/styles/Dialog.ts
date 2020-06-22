import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const borderColor = Colors.tintColor;

export const styles = (isDark: boolean) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: PixelRatio.getPixelSizeForLayoutSize(11)
      },
    modalView: {
        margin: PixelRatio.getPixelSizeForLayoutSize(10),
        backgroundColor: isDark ? Colors.bodyDarkColor : Colors.bodyLightColor,
        borderRadius: Layout.borderRadius,
        borderWidth: Layout.borderWidth,
        borderColor: borderColor,
        padding: PixelRatio.getPixelSizeForLayoutSize(5),
        alignItems: "center",
        shadowColor: isDark ? Colors.bodyLightColor : Colors.bodyDarkColor,
        shadowOffset: {
            width: 0,
            height: 2
          },
        shadowOpacity: 0.25,
        shadowRadius: 11.52,
        elevation: 5
      },
    modalTextInput: {
        borderWidth: Layout.borderWidth,
        borderColor: borderColor,
        borderRadius: Layout.borderRadius,
        flex: 0.75,
        textAlign: "center",
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(5),
        aspectRatio: 1.75
        // , backgroundColor: Colors.bodyColor
    },
    modalTextInputWrapper: {
      flexDirection: "row"
    }
  });
