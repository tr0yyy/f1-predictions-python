import RestClient from "./RestClient.jsx";

class DataFetcher extends RestClient {
    async getDrivers(params = {}) {
        return await this.get('/api/drivers', params);
    }

    async getSessions(params = {}) {
        return await this.get('/api/sessions', params);
    }
}

export default DataFetcher;