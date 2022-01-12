import axios, {AxiosRequestConfig} from 'axios';
import TokenService from './token.service';
import userData from '../types/userData'

const host = 'http://localhost:8080/';

const instance = axios.create({
    baseURL: host,
    headers: {
        'Content-Type': 'application/json',
    },
});

// function pageableSearch(page: number, size: number) {
//     return '?page=' + page + '&size=' + size;
// }
//
// const pageableRequestQuery = (page: number, size: number) => pageableSearch(page, size);

instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            if (config.headers) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (res) => {
        return res;
    }, async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== 'login' && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const rs = await instance.post<userData>('/auth/refresh_token', {
                        refreshToken: TokenService.getLocalRefreshToken(),
                    });

                    const refreshToken = rs.data.refreshToken as string;

                    TokenService.updateLocalAccessToken(refreshToken);

                    return instance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);

const Api = {
    instance,
    // pageableRequestQuery,
};

export default Api;
