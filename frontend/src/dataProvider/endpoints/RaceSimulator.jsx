import RestClient from "./RestClient.jsx";

class RaceSimulator extends RestClient {
    async simulate(data = {}) {
        return await this.post('/api/simulate', data);
    }
}

export default RaceSimulator;