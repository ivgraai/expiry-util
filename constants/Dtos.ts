export class ImageRequest {
    name: string;
    type: string;
    uri: string;

    constructor(name: string, type: string, uri: string) {
        this.name = name;
        this.type = type;
        this.uri = uri;
    }
}

export enum SizeRequest {
    small = "small",
    large = "large"
}

export class GoodAllResponse {
    name!: string;
    expiry!: Date;
    isRequestedByOther!: boolean;
    id!: number;

    public setName(name: string): GoodAllResponse {
        this.name = name;
        return this;
    }

    public setExpiry(expiry: Date): GoodAllResponse {
        this.expiry = expiry;
        return this;
    }

    public setIsRequestedByOther(isRequestedByOther: boolean): GoodAllResponse {
        this.isRequestedByOther = isRequestedByOther;
        return this;
    }

    public setId(id: number): GoodAllResponse {
        this.id = id;
        return this;
    }
}

export class GoodNearbyResponse {
    name!: string;
    expiry!: Date;
    distance!: number;
    id!: number;
    isRequestedByMe!: boolean;

    buildFromObject(response: any, lambda: (value: string) => Date): GoodNearbyResponse {
        return this.buildFromValues(response.name, lambda(response.expiry), response.distance, response.id, response.isRequestedByMe);
    }

    buildFromValues(name: string, expiry: Date, distance: number, id: number, isRequestedByMe: boolean): GoodNearbyResponse {
        this.name = name;
        this.expiry = expiry;
        this.distance = distance;
        this.id = id;
        this.isRequestedByMe = isRequestedByMe;
        return this;
    }
}

export class GoodResponse {
    name: string;
    expiry: Date;
    address: Address;
    username: string;
    isAccepted: boolean;
    myMessage: string;
    replyMessage: string;

    constructor(response: any, lambda: (value: string) => Date) {
        this.address = new Address(response.address);
        this.replyMessage = response.replyMessage;
        this.isAccepted = response.isAccepted;
        this.name = response.name;
        this.expiry = lambda(response.expiry);
        this.myMessage = response.myMessage;
        this.username = response.username;
    }
}

export class RequestAllResponse {
    accepted: number;
    datas: RequestData[];

    constructor(response: any, lambda: (value: string) => Date) {
        this.accepted = response.accepted;
        this.datas = response.datas.map((request: any) => new RequestData(request, lambda));
    }
}

export class Address {
    city: string;
    street: string;
    region: string;
    postalCode: string;
    country: string;
    name: string;

    constructor(response: any) {
        this.country = response.country;
        this.city = response.city;
        this.street = response.street;
        this.postalCode = response.postalCode;
        this.name = response.name;
        this.region = response.region;
    }
}

export class RequestData {
    username: string;
    datetime: Date;
    message: string;
    id: number;

    constructor(response: any, lambda: (value: string) => Date) {
    this.username = response.username;
    this.datetime = lambda(response.datetime);
    this.message = response.message;
    this.id = response.id;
    }
}
