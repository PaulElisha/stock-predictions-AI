/** @format */
export declare const HTTP_STATUS: {
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    METHOD_NOT_ALLOWED: number;
    CONFLICT: number;
    UNPROCESSABLE_ENTITY: number;
    TOO_MANY_REQUESTS: number;
    INTERNAL_SERVER_ERROR: number;
    NOT_IMPLEMENTED: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
    GATEWAY_TIMEOUT: number;
};
export type HttpStatusCodeType = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
