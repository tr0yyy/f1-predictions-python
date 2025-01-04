import {sleep} from "../../utils/Utils.jsx";

class RestClient {
    constructor(host) {
        this._host = host;
    }

    get host() {
        return this._host;
    }

    set host(value) {
        this._host = value;
    }

    async get(endpoint, params = {}, headers = {}) {
        const baseUrl = this._host + endpoint;
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

        let retries = 3;

        while (retries) {
            retries--;
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: headers
                });
                const json = await response.json();
                if (json.error && retries) {
                    await sleep(5000);
                    continue;
                }
                return json;
            } catch (error) {
                if (retries) {
                    await sleep(5000);
                    continue;
                }
                return {error: error.message};
            }
        }
    }

    async post(endpoint, data = {}, headers = {}) {
        const url = this._host + endpoint;

        let retries = 3;

        while (retries) {
            retries--;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...headers
                    },
                    body: JSON.stringify(data)
                });
                const json = await response.json();
                if (json.error && retries) {
                    await sleep(2000);
                    continue;
                }
                return json;
            } catch (error) {
                if (retries) {
                    await sleep(2000);
                    continue;
                }
                return {error: error.message};
            }
        }
    }
}

export default RestClient;