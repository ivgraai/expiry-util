import { Alert } from "react-native";
import { i18n } from "../constants/Dictionary";
import UnsupportedStatusException from "../common/errors/UnsupportedStatusException";
import UnsupportedContentException from "../common/errors/UnsupportedContentException";
import EmptyResultException from "../common/errors/EmptyResultException";

const internalAlert = (message: string, onPress?: () => void) => Alert.alert(
    i18n.aProblemOccurredWhileCommunicatingWithTheServer.capitalize(),
    message,
    [{
        text: i18n.okay,
        onPress
    }]
);

export const alert = (exception: Error, onPress?: () => void) => {
    var message: string;
    if (exception instanceof UnsupportedStatusException) {
        message = i18n.unsupportedStatus.capitalize() + " (" + exception.getStatusCode() + ')';
    } else if (exception instanceof UnsupportedContentException) {
        message = i18n.unsupportedContent.capitalize() + " (" + exception.getContentType() + ')';
    } else if (exception instanceof EmptyResultException) {
        message = i18n.resultSetIsEmpty.capitalize();
    } else {
        message = exception.message;
    }
    internalAlert(message, onPress);
};
