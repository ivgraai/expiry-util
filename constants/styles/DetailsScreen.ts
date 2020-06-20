import { StyleSheet, PixelRatio } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

const margin: number = PixelRatio.getPixelSizeForLayoutSize(2.5);

export const styles = (isDark: boolean) => StyleSheet.create({
    rootView: {
        flex: 1
    },
    imageView: {
        flex: 2,
        alignSelf: "center",
        justifyContent: "space-around",
        marginTop: margin
    },
    image: {
        aspectRatio: 1,
        width: Layout.widthPercentageAsString,
        borderColor: Layout.borderColor,
        borderWidth: Layout.borderWidth,
        borderRadius: Layout.borderRadius
    },
    dataView: {
        flex: 2,
        width: Layout.widthPercentageAsString,
        alignSelf: "center",
        justifyContent: "space-around"
    },
    warnText: {
        textAlign: "center",
        color: Colors.tintColor,
        fontSize: PixelRatio.getFontScale() * 20,
        marginTop: margin * 3.5
    },
    dataText: {
        alignSelf: "center",
        color: isDark ? Colors.labelDarkColor : Colors.labelLightColor
    },
    styledComponent: {
        marginTop: margin
    },
    marginBottom: {
        marginBottom: margin
    },
    hrView: {
        borderBottomColor: Layout.borderColor,
        borderBottomWidth: Layout.borderWidth,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(1.5),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(1.5)
    }
});
