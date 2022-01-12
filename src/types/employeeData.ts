export default interface EmployeeData {

    /**
     * Common fields
     */
    id?: number | null,
    firstName?: string,
    lastName?: string,
    patronymic?: string,
    // employeeType?: string,
    type?: string,
    employeeStatus?: string,
    gender?: string,
    childrenCount?: number,
    coefficient?: number,
    extraVacationDays?: number,
    dateOfBirth?: string,
    dateOfEmployment?: string,
    overworkingStrategy?: string,

    /**
     * Engineer
     */
    electricalSafetyGrade?: number,
    fireSafetyRank?: number,
    informationSecurityRank?: number,

    /**
     * Manager
     */
    countOfProjects?: number,

    /**
     * Worker
     */
    numberOfDetails?: number,
    hazardRatio?: number,
}
