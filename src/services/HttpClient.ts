import {BackendError} from "../model/BackendError";

export default class HttpClient{

    static async fetch(path: string, method: string = 'GET', data?: any): Promise<any | undefined> {
        const response = await fetch(path, {
                method,
                body: data ? JSON.stringify(data) : undefined,
                headers: { 'content-Type': 'application/json'},
            }
        );
        if (response.status == 204) {
            return undefined
        } else if (response.status >= 200 && response.status <= 300) {
            return response.body ? response.json() : undefined
        } else {
            const status = response.status
            let errorCode
            let errorMessage
            try {
                const errorResponseBody = await response.json()
                errorCode = errorResponseBody.error
                errorMessage = errorResponseBody.message
            } catch (e) {
                console.log(`Failed to parse error response body ${e.message}: ${e.stackTrace}`)
            }

            throw new BackendError(status, errorCode, `Failed call ${method} ${path} ${errorMessage? ':'+errorMessage: ''}`)
        }
    }
}