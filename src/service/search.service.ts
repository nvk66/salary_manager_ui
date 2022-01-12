import http from './api.service';

const searchUrl = 'search/';

const getEmployeeTypes = () => {
    return http.instance
        .get<string[]>(searchUrl + 'employeeType');
}

const getGenres = () => {
    return http.instance
        .get<string[]>(searchUrl + 'gender');
}

const getStrategies = () => {
    return http.instance
        .get<string[]>(searchUrl + 'strategy');
}

const getStatus = () => {
    return http.instance
        .get<string[]>(searchUrl + 'status');
}

const SearchService = {
    getEmployeeTypes,
    getGenres,
    getStrategies,
    getStatus
}

export default SearchService;
