import RestClient from "./RestClient.jsx";

class User extends RestClient {
    async login(params = {}) {
        return await this.post('/api/login', params);
    }

    async register(params = {}) {
        return await this.post('/api/register', params);
    }
}

export default User;