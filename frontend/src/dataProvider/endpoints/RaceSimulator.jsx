import RestClient from "./RestClient.jsx";

class RaceSimulator extends RestClient {
    async simulate(data = {}) {
        return await this.post('/api/simulate', data, {}, true);
    }

    async getSimulationResults(params = {}) {
        return await this.get('/api/simulate/results', params, {}, true);
    }

    async getSimulationsResults(params = {}) {
        return await this.get('/api/simulate/results/many', params, {}, true);
    }
}

export default RaceSimulator;