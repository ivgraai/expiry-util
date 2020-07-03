export default class UnsupportedStatusException extends Error {
    private statusCode: number;
    constructor(statusCode: number) {
        super();
        this.statusCode = statusCode;
    }
    public getStatusCode(): number {
        return this.statusCode;
    }
}