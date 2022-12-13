export type IErrorResponse = {
    success: boolean;
    status: number;
    message: string;
}
export class NonRetryableError extends Error {
    status: number;
    success: boolean;
    message: string;
    name: string;

    constructor(payload: IErrorResponse) {
        const {status, success, message = ''} = payload;
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NonRetryableError)
        }

        this.name = 'NonRetryableError'
        this.status = status || 500;
        this.success = success;
        this.message = message;
    }
}