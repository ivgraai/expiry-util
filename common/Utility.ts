import Constants from "expo-constants";
import * as Location from "expo-location";
import { ImageRequest, SizeRequest, Address } from "../constants/Dtos";
import HttpClient from "../services/HttpClient";
import moment from "moment";

export default class Utility {
    private static readonly EVICTION_FREQUENCY: string = Constants.manifest.extra.cache.imageEvictionFrequency;
    public static readonly LINE_SEPARATOR: string = '\n';

    static convertImageToDto(uri: string): ImageRequest {
        var collection = uri.split('/');
        var nameAndFormat = collection[collection.length - 1];
        var parts = nameAndFormat.split('.');
        return new ImageRequest(nameAndFormat, 'image/' + parts[1], uri);
    }

    static calculateURLCacheValue(evictionFrequency: string, now: Date = new Date()): string {
        switch (evictionFrequency) {
            case 'daily':   return now.toLocaleDateString();
            case 'weekly':  return String(moment(now).week());
            case 'monthly': return String(now.getMonth());
            case 'yearly':  return now.getFullYear().toString();
            default:        return now.toISOString();
        }
    }

    static remoteURI(_localURI: string, goodId: number, size: SizeRequest): string {
      return HttpClient.findImageURL(goodId, size, {key: 'cache', value : Utility.calculateURLCacheValue(Utility.EVICTION_FREQUENCY)});
    }

    static assignChildState<S extends any>(path: string, value: Object, previousState: S): S {
        var pieces = path.split(".");
        var newState = Object.assign({}, previousState);
        var current = newState;
        for (var i = 0; i < pieces.length - 1; ++i) {
            var piece = pieces[i];
            if ("[object Object]" === current[piece].toString()) {
                current[piece] = Object.assign({}, current[piece]);
            } else if (typeof "object" === current[piece] /* array */) {
                current[piece] = current[piece].concat();
            }
            current = current[piece];
        }
        current[pieces[i]] = value;
        return newState;
    }

    static formatAddress(address: Address): string {
        return address.postalCode + ' ' + address.country + Utility.LINE_SEPARATOR + address.region + ", " + address.city + Utility.LINE_SEPARATOR + address.street + Utility.LINE_SEPARATOR + address.name;
    }

    static async currentLocation(): Promise<{latitude: number, longitude: number}> {
        var result: Location.LocationData = await Location.getCurrentPositionAsync({});
        return {latitude: result.coords.latitude, longitude: result.coords.longitude};
    }
}
