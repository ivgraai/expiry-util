import { Alert } from "react-native";
import { i18n } from "../constants/Dictionary";

export const alert = (exception: Error) => Alert.alert(
    i18n.aProblemOccurredWhileCommunicatingWithTheServer.capitalize(),
    exception.name + ": " + exception.message,
    [{
        text: i18n.okay
    }]
);
