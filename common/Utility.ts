import { ImageRequest } from "../constants/Dtos";

export default class Utility {
    static convertImageToDto(uri: string): ImageRequest {
        var collection: string[] = uri.split('/');
        var nameAndFormat: string = collection[collection.length - 1];
        var parts: string[] = nameAndFormat.split('.');
        return new ImageRequest(nameAndFormat, 'image/' + parts[1], uri);
    }
}
