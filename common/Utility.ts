import Constants from "expo-constants";
import { ImageRequest, SizeRequest } from "../constants/Dtos";
import HttpClient from "../services/HttpClient";

export default class Utility {
    private static readonly EVICTION_FREQUENCY: string = Constants.manifest.extra.imageCacheEvictionFrequency;

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

    static remoteURI(_localURI: string, goodId: number, size: SizeRequest) {
      return HttpClient.findImageURL(goodId, size, {key: 'cache', value : Utility.calculateURLCacheValue(Utility.EVICTION_FREQUENCY)});
    }
}
