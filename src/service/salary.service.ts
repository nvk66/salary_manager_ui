import http from './api.service';
import salaryData from '../types/salaryData'

const salaryUrl = 'salary/'

const getEmployeeSalaries = (employeeId: number, requestString?: string) => {
    return http.instance
        .get<{
            content: salaryData[],
            empty: boolean,
            first: boolean,
            last: boolean,
            number: number,
            numberOfElements: number,
            totalElements: number,
            totalPages: number,
        }>(`/employees/${employeeId}/salaries/` + requestString);
}

const calculateSalary = (employeeId: any) => {
    return http.instance
        .get<salaryData>(`/employees/${employeeId}/salaries/calculate`);

}

const SalaryService = {
    getEmployeeSalaries,
    calculateSalary
}

export default SalaryService;
