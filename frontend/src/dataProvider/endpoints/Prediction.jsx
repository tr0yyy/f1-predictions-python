import RestClient from "./RestClient.jsx";

class Prediction extends RestClient {
    async postPredictions(params = {}) {
        return await this.post('/api/predictions', params);
    }

    async getPredictions(params = {}) {
        return await this.get('/api/predictions', params);
    }
}

export default Prediction;