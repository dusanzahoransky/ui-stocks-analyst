import {BackendError} from "../model/BackendError";

export default class HttpClient{

    static async fetch(path: string) {
        const response = await fetch(path);
        if (response.status >= 200 && response.status <= 300) {
            return response.json()
        } else {
            const status = response.status
            let errorCode
            let errorMessage

            if(response.bodyUsed){
                try {
                    const errorResponseBody = await response.json()
                    errorCode = errorResponseBody.error
                    errorMessage = errorResponseBody.message
                } catch (e) {
                    console.log(`Failed to parse error response body ${e.message}: ${e.stackTrace}`)
                }
            }
            throw new BackendError(status, errorCode, `Failed call ${path}: ${errorMessage}`)
        }
    }
}