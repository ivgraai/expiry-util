import { Alert } from "react-native";
import { i18n } from "../constants/Dictionary";
import UnsupportedStatusException from "../common/errors/UnsupportedStatusException";
import UnsupportedContentException from "../common/errors/UnsupportedContentException";

const internalAlert = (message: string) => Alert.alert(
    i18n.aProblemOccurredWhileCommunicatingWithTheServer.capitalize(),
    message,
    [{
        text: i18n.okay
    }]
);

export const alert = (exception: Error) => {
    if (exception instanceof UnsupportedStatusException) {
        internalAlert(i18n.unsupportedStatus.capitalize() + " (" + exception.getStatusCode() + ')');
    } else if (exception instanceof UnsupportedContentException) {
        internalAlert(i18n.unsupportedContent.capitalize() + " (" + exception.getContentType() + ')');
    } else {
        internalAlert(exception.message);
    }
};
