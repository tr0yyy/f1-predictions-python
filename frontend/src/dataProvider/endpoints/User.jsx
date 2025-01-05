import RestClient from "./RestClient.jsx";

class User extends RestClient {
    async login(params = {}) {
        return await this.post('/api/login', params, {}, true);
    }

    async register(params = {}) {
        return await this.post('/api/register', params, {}, true);
    }
}

export default User;