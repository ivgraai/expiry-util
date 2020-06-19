import { PixelRatio } from "react-native";
import Colors from "./Colors";

const width: number = 85;

export default {
    borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
    borderColor: Colors.backgroundColor,
    borderRadius: 20,
    innerBorderRadiusDifference: -2,
    letterSpacing: 3,
    widthPercentageAsString: width + '%',
    widthPercentageAsNumber: width,
    margin: PixelRatio.getPixelSizeForLayoutSize(2.5)
};
