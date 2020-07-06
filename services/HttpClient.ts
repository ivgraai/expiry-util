import Constants from 'expo-constants';
import * as Dtos from '../constants/Dtos';
import { Platform } from 'react-native';
import moment from 'moment';
import UnsupportedStatusException from '../common/errors/UnsupportedStatusException';
import UnsupportedContentException from '../common/errors/UnsupportedContentException';

const BASE_URL: string = Constants.manifest.extra.serverUrl;

export default class HttpClient {

    public static ERROR_HANDLER = (e: any) => console.warn(e);
    private static SUPPORTED_CONTENT_TYPES = ["application/json", "application/problem+json"];
    private static DEFAULT_RADIUS: number = 3000;

    public static login(name: string, password: string): Promise<string> {
        return HttpClient.request(`user?name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`, false, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
          })
          .then();
    }

    public static register(name: string, email: string, password: string): Promise<Response> {
        return HttpClient.request('user', false, {
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

    public static unregister(token: string): Promise<Response> {
        return HttpClient.request('user', false, {
            method: 'DELETE',
            headers: this.createHeaderWithToken(token)
          })
          .then();
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
        return HttpClient.request('good/add', false, {
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
        return HttpClient.request('good/all', true, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token // createHeaderWithToken
            }
        })
        .then((response: any) => response.map((good: any) => new Dtos.GoodAllResponse()
            .setName(good.name)
            .setExpiry(this.parseDate(good.expiry))
            .setIsRequestedByOther(good.isRequestedByOther)
            .setId(good.id)));
    }

    public static listNearbyGood(token: string | null, latitude: number, longitude: number, radius?: number): Promise<Dtos.GoodNearbyResponse[]> {
        if (undefined === radius) {
            radius = this.DEFAULT_RADIUS;
        }
        let headers = this.createHeaderWithToken(token);
        return HttpClient.request(`good/nearby?location.latitude=${encodeURIComponent(latitude)}&location.longitude=${encodeURIComponent(longitude)}&radius=${encodeURIComponent(radius)}`, true, {
            method: 'GET',
            headers: {
                ...headers,
                Accept: 'application/json'
            }
        })
        .then((response: any) => response.map((good: any) => new Dtos.GoodNearbyResponse(good, this.parseDate)));
    }

    public static requestTheGood(token: string, goodId: number, message: string): Promise<Response> {
        return HttpClient.request('good/need', false, {
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
        .then();
    }

    public static checkStatus(token: string | null, goodId: number): Promise<Dtos.GoodResponse> {
        return HttpClient.request(`good/${encodeURIComponent(goodId)}`, true, {
            method: 'GET',
            headers: this.createHeaderWithToken(token)
        })
        .then(response => new Dtos.GoodResponse(response, this.parseDate));
    }

    public static findAllRequest(token: string, goodId: number | null): Promise<Dtos.RequestAllResponse> {
        let url: string = 'request/all';
        if (undefined != goodId) {
            url += `?goodId=${encodeURIComponent(goodId)}`;
        }
        return HttpClient.request(url, true, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                token
            }
        })
        .then(response => new Dtos.RequestAllResponse(response, this.parseDateTime))
    }

    public static approveRequest(token: string, requestId: number, message: string): Promise<Response> {
        return HttpClient.request(`request/${encodeURIComponent(requestId)}`, false, {
            method: 'PUT',
            headers: this.createHeaderWithToken(token),
            body: message
        })
        .then();
    }

    private static request(urlSuffix: string, needToParse: boolean, options?: RequestInit | undefined) {
        return new Promise((resolve, reject) => {
            fetch(BASE_URL + urlSuffix, options)
                .then(response => HttpClient.parse(response, needToParse))
                .then(response => {
                    const statusCode = response.status;
                    let isGoodStatus = statusCode < 400;
                    let isGoodContent = HttpClient.SUPPORTED_CONTENT_TYPES.includes(response.contentType!);
                    if (response.ok && isGoodStatus && isGoodContent) {
                        return resolve(response.body);
                    }
                    return reject(
                        !isGoodStatus ? new UnsupportedStatusException(statusCode) : (
                        !isGoodContent ? new UnsupportedContentException(response.contentType) : new Error(response.body.meta.error)
                    ));
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

    private static parse(response: Response, needToParse: boolean): Promise<{ok: boolean, status: number, contentType: string | null, body: any}> {
        return new Promise(resolve => (needToParse ? response.json() : response.text())
            .then(body => resolve({
                ok:             response.ok,
                status:         response.status,
                contentType:    response.headers.get("Content-Type"),
                                body
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
