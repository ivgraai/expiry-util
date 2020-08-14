import { StyleSheet, PixelRatio, Dimensions } from "react-native";
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
        minHeight: "13%",
    },
    buttonWrapper: {
        alignSelf: "center"
    },
    orText: {
        textAlign: "center",
        color: Colors.tintColor,
        marginTop: PixelRatio.getPixelSizeForLayoutSize(2.5),
        marginBottom: PixelRatio.getPixelSizeForLayoutSize(2.5),
        letterSpacing: Layout.letterSpacing
    },
    messageText: {
        fontSize:Dimensions.get('window').height<650?  PixelRatio.getFontScale() *Layout.smallerFontSize: PixelRatio.getFontScale() * Layout.largerFontSize,
        color: Colors.errorText,
        textAlign: "center",
        height:Dimensions.get('window').height<650?30:60,
    },
    signUpInText: {
        fontStyle: "italic"
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
        flex: 40,
        justifyContent: "space-between"
    },
    buttonsView: {
        flex: 18,
        justifyContent: "flex-start",
    },
    inputsView: {
        justifyContent: "space-around",
        flex: 3,
    },
    keyboardView:{
        flex:1,
        padding: Dimensions.get('window').height<650?"5%" : 0,
        minHeight:2*Dimensions.get('window').height/3,
    },
    keyboardViewSignUp:{
        flex:1,
        minHeight:4*Dimensions.get('window').height/5,
    }
  });
