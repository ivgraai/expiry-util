type ContentTypeString = string | null;

export default class UnsupportedContentException extends Error {
    private contentType: ContentTypeString;
    constructor(contentType: ContentTypeString) {
        super();
        this.contentType = contentType;
    }
    public getContentType(): ContentTypeString {
        return this.contentType;
    }
}
