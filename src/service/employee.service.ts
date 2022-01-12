import http from './api.service';
import employeeData from '../types/employeeData'

const employeeUrl = 'employees/'

const getEmployee = (id: any) => {
    return http.instance
        .get(employeeUrl + id)
}

const fireEmployee = (id: any) => {
    return http.instance
        .delete(employeeUrl + id)
}

const addEmployee = (employee: employeeData) => {
    return http.instance
        .post<employeeData>(employeeUrl, employee)
}

const updateEmployee = (id: any, employee: employeeData) => {
    return http.instance
        .put<employeeData>(employeeUrl + id, employee);
}

const changeActivity = (id: any) => {
    return http.instance
        .put<employeeData>(employeeUrl + id + '/');
}

const getAllEmployees = (requestString?: string) => {
    return http.instance
        .get<{
            content: employeeData[],
            empty: boolean,
            first: boolean,
            last: boolean,
            number: number,
            numberOfElements: number,
            totalElements: number,
            totalPages: number,
        }>(employeeUrl + requestString);
}

const EmployeeService = {
    getEmployee,
    fireEmployee,
    addEmployee,
    updateEmployee,
    changeActivity,
    getAllEmployees
}

export default EmployeeService;
