// import http from '../http-common';
import http from  './api.service'
import loginDada from '../types/loginData'
import userData from '../types/userData'
import TokenService from "./token.service";

class AuthService {
    parseJwt(token: string) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    }

    login(auth: loginDada) {
        return http.instance
            .post<userData>('api/login', {
                login: auth.login,
                password: auth.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    const parsedToken = this.parseJwt(response.data.accessToken)
                    const user = {
                        login: parsedToken.sub,
                        roles: parsedToken.roles,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                        expireDataAccessToken: parsedToken.exp
                    }
                    console.log(user);
                    TokenService.setUser(user);
                    // localStorage.setItem('user', JSON.stringify(user));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user') as string);
    }
}

export default new AuthService();

