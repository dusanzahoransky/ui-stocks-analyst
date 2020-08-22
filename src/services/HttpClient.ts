import {BackendError} from "../model/BackendError";

export default class HttpClient{

    static async fetch(path: string) {
        const response = await fetch(path);
        if (response.status >= 200 && response.status <= 300) {
            return response.json()
        } else {
            return { ...response, error: 'unknown', message: `Failed call ${path}`} as BackendError
        }
    }
}