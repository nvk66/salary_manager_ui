import userData from '../type/userData'

const getLocalRefreshToken = () => {
    const user = JSON.parse(sessionStorage.getItem('salary_manager_user') as string);
    return user?.refreshToken;
};

const getLocalAccessToken = () => {
    const user = JSON.parse(sessionStorage.getItem('salary_manager_user') as string);
    return user?.accessToken;
};

const updateLocalAccessToken = (token: string) => {
    let user = JSON.parse(sessionStorage.getItem('salary_manager_user') as string);
    user.accessToken = token;
    sessionStorage.setItem('salary_manager_user', JSON.stringify(user));
};

const getUser = () => {
    return JSON.parse(sessionStorage.getItem('salary_manager_user') as string);
};

const setUser = (user: userData) => {
    console.log(JSON.stringify(user));
    sessionStorage.setItem('salary_manager_user', JSON.stringify(user));
};

const removeUser = () => {
    sessionStorage.removeItem('salary_manager_user');
};

const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateLocalAccessToken,
    getUser,
    setUser,
    removeUser,
};

export default TokenService;
