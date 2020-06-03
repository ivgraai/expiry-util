import { ImageRequest } from "../constants/Dtos";

export default class Utility {
    static convertImageToDto(uri: string): ImageRequest {
        var collection = uri.split('/');
        var nameAndFormat = collection[collection.length - 1];
        var parts = nameAndFormat.split('.');
        return new ImageRequest(nameAndFormat, 'image/' + parts[1], uri);
    }

    static calculateURLCacheValue(evictionFrequency: string): string {
        var now = new Date();
        if ('daily' === evictionFrequency) {
            return now.toLocaleDateString();
        }
        return now.toISOString();
    }
}
