export class BackendError extends Error{
    readonly status: number
    readonly code: string
    readonly errorMessage: string

    constructor(status, code, errorMessage)  {
        super(`[${status}] ${code}:${errorMessage}`);
        this.status = status
        this.code = code
        this.errorMessage = errorMessage
    }
}