import RestClient from "./RestClient.jsx";

class Prediction extends RestClient {
    async login(params = {}) {
        return await this.post('/api/login', params);
    }

    async register(params = {}) {
        return await this.post('/api/register', params);
    }
}

export default Prediction;