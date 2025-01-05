import DataProvider from "../DataProvider.jsx";

class SecurityManager {
    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static isAuthenticated() {
        return localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined;
    }

    static clearToken() {
        localStorage.removeItem('token');
    }

    static async login(username, password) {
        const data = {
            username: username,
            password: password
        };
        const result = await DataProvider.userService.login(data);
        if (result.error) {
            throw result.error;
        }
        if (result.data.token) {
            SecurityManager.setToken(result.token);
        }
        return result.data.message;
    }

    static async register(username, password) {
        const data = {
            username: username,
            password: password
        };
        const result = await DataProvider.userService.register(data);
        if (result.error) {
            throw result.error;
        }
        return result.data.message;
    }
}

export default SecurityManager;