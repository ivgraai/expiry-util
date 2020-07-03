import Constants from 'expo-constants';
import * as Dtos from '../constants/Dtos';
import { Platform } from 'react-native';
import moment from 'moment';
import UnsupportedStatusException from '../common/errors/UnsupportedStatusException';

const BASE_URL: string = Constants.manifest.extra.serverUrl;

export default class HttpClient {

    public static ERROR_HANDLER = (e: any) => console.warn(e);
    private static DEFAULT_RADIUS: number = 3000;

    public static login(name: string, password: string): Promise<void | string> {
        return fetch(BASE_URL + `user?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
          })
          .then(response => response.text())
          .catch(this.ERROR_HANDLER);
    }

    public static register(name: string, email: string, password: string): Promise<Response> {
        return fetch(BASE_URL + 'user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                name,
                email
            })
          })
          .then();
    }

    public static unregister(token: string): Promise<void | Response> {
        return fetch(BASE_URL + 'user', {
            method: 'DELETE',
            headers: this.createHeaderWithToken(token)
          })
          .then()
          .catch(this.ERROR_HANDLER);
    }

    public static addGood(token: string, name: string, expiry: Date, latitude: number | null, longitude: number | null, available: boolean, image: Dtos.ImageRequest | null): Promise<Response> {
        const payload = new FormData();
        if (null != image) {
            payload.append("image", {
                name: image.name,
                type: image.type,
                uri: ("android" === Platform.OS) ? image.uri : image.uri.replace("file://", "")
            });
        }
        payload.append("name", name);
        payload.append("expiry", this.convertDate(expiry));
        if (null != latitude && null != longitude) {
            payload.append("location.latitude", latitude);
            payload.append("location.longitude", longitude);
        }
        payload.append("available", available);
        return HttpClient.makeRequest('good/add', {
            method: 'POST',
            headers: this.createHeaderWithToken(token),
            body: payload
        })
        .then();
    }

    public static findImageURL(goodId: number, size: Dtos.SizeRequest, ...params: [{key: string, value: string}]): string {
        let extra: string = '';
        for (const parameter of params) {
            extra += `&${encodeURIComponent(parameter.key)}=${encodeURIComponent(parameter.value)}`;
        }
        return BASE_URL + `good/image/${encodeURIComponent(goodId)}?size=${encodeURIComponent(size)}${extra}`;
    }

    public static listAllGood(token: string): Promise<Dtos.GoodAllResponse[]> {
        return fetch(BASE_URL + 'good/all', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token // createHeaderWithToken
            }
        })
        .then(response => response.json())
        .then(response => response.map((good: any) => new Dtos.GoodAllResponse()
            .setName(good.name)
            .setExpiry(this.parseDate(good.expiry))
            .setIsRequestedByOther(good.isRequestedByOther)
            .setId(good.id)))
        .catch(this.ERROR_HANDLER);
    }

    public static listNearbyGood(token: string | null, latitude: number, longitude: number, radius?: number): Promise<Dtos.GoodNearbyResponse[]> {
        if (undefined === radius) {
            radius = this.DEFAULT_RADIUS;
        }
        let headers = this.createHeaderWithToken(token);
        return fetch(BASE_URL + `good/nearby?location.latitude=${encodeURIComponent(latitude)}&location.longitude=${encodeURIComponent(longitude)}&radius=${encodeURIComponent(radius)}`, {
            method: 'GET',
            headers: {
                ...headers,
                Accept: 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => response.map((good: any) => new Dtos.GoodNearbyResponse(good, this.parseDate)))
        .catch(this.ERROR_HANDLER);
    }

    public static requestTheGood(token: string, goodId: number, message: string): Promise<void | Response> {
        return fetch(BASE_URL + 'good/need', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token
            },
            body: JSON.stringify({
                id: goodId,
                message
            })
        })
        .then()
        .catch(this.ERROR_HANDLER);
    }

    public static checkStatus(token: string | null, goodId: number): Promise<void | Dtos.GoodResponse> {
        return fetch(BASE_URL + `good/${encodeURIComponent(goodId)}`, {
            method: 'GET',
            headers: this.createHeaderWithToken(token)
        })
        .then(response => response.json())
        .then(response => new Dtos.GoodResponse(response, this.parseDate))
        .catch(this.ERROR_HANDLER);
    }

    public static findAllRequest(token: string, goodId: number | null): Promise<Dtos.RequestAllResponse> {
        let url: string = BASE_URL + 'request/all';
        if (undefined != goodId) {
            url += `?goodId=${encodeURIComponent(goodId)}`;
        }
        return fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token
            }
        })
        .then(response => response.json())
        .then(response => new Dtos.RequestAllResponse(response, this.parseDateTime))
    }

    public static approveRequest(token: string, requestId: number, message: string): Promise<void | Response> {
        return fetch(BASE_URL + `request/${encodeURIComponent(requestId)}`, {
            method: 'PUT',
            headers: this.createHeaderWithToken(token),
            body: message
        })
        .then()
        .catch(this.ERROR_HANDLER);
    }

    private static makeRequest(urlSuffix: string, options?: RequestInit | undefined) {
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + urlSuffix, options)
                .then(HttpClient.parseJSON)
                .then(response => {
                    const statusCode = response.status;
                    const isGoodStatus = statusCode < 400;
                    if (response.ok && isGoodStatus) {
                        return resolve(response.json);
                    }
                    return reject(!response.json.meta ? new UnsupportedStatusException(statusCode) : new Error(response.json.meta.error));
                })
                .catch(error => reject(error));
        });
    }

    private static createHeaderWithToken(value: string | null): Headers {
        let retval: any = {
            token: !value ? undefined : value
        };
        return retval;
    }

    private static parseJSON(response: Response): Promise<{ok: boolean, status: number, json: any}> {
        return new Promise(resolve => response.json()
            .then(json => resolve({
                ok:     response.ok,
                status: response.status,
                        json
                })
            )
        );
    }

    private static convertDate(value: Date): string {
        return value.toISOString().split('T')[0];
    }

    private static parseDate(value: string): Date {
        return new Date(value);
    }

    private static parseDateTime(value: string): Date {
        return moment(value).toDate();
    }

}
