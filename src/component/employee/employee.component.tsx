import React, {useState, useEffect, useMemo, useRef, ChangeEvent} from "react";
import Pagination from "@mui/lab/Pagination";
import EmployeeService from "../../service/employee.service";
import SearchService from "../../service/search.service";
import EmployeeData from "../../types/employeeData";
import UserData from "../../types/userData";
import {RouteComponentProps} from "react-router-dom";
import {Column, useTable} from "react-table";
import {Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Switch} from "@mui/material";
import SearchType from "../../types/searchType";
import InputMask from "react-input-mask";
import SearchIcon from '@mui/icons-material/Search';
import SalaryComponent from "../salary/salary.component";
import { useHistory } from "react-router";
import TokenService from "../../service/token.service";
import SalaryService from "../../service/salary.service";
import SalaryData from "../../types/salaryData";
import SalaryModalComponent from "../salary/salary.modal";
import AddIcon from '@mui/icons-material/Add';
import CreateEmployeeModal from "./employee.create.component";

type Search = {} & SearchType & EmployeeData;

type Props = {} & RouteComponentProps;

type State = {
    employees: Array<EmployeeData>,
    filteredEmployees: Array<EmployeeData>,
    currentEmployee: EmployeeData | null,
    currentIndex: number,
    search: EmployeeData | null,
    currentUser: UserData | null,
    redirect: string | null,
    page: number,
    count: number,
    size: number,
    pageSizes: Array<number>,
    totalPages: number
};

const EmployeesTable = (props: Props, state: State) => {

    if (!TokenService.getUser()) {
        props.history.push({
            pathname:  "/login"
        });
    }

    const [employees, setEmployees] = useState<Array<EmployeeData>>([]);
    const employeesRef = useRef<Array<EmployeeData>>([]);
    const [pageSizes] = useState<Array<number>>([3, 20, 25]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSalaryVisible, setIsSalaryVisible] = useState(false);
    const [isSalaryModalVisible, setIsSalaryModalVisible] = useState(false);
    const [isEmployeeModalVisible, setIsEmployeeModalVisible] = useState(false);
    const [selected, setSelected] = useState<EmployeeData>({});
    const [employeeTypes, setEmployeeTypes] = useState<Array<string>>([]);
    const [genders, setGenders] = useState<Array<string>>([]);
    const [salary, setSalary] = useState<SalaryData>({});
    const [strategis, setStrategis] = useState<Array<string>>([]);
    const [statuses, setStatuses] = useState<Array<string>>([]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [type, setType] = useState<string>('');
    const [gender, setGender] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState<Search>({
        page: page,
        size: size
    })

    employeesRef.current = employees;

    const retrieveEmployees = () => {
        const params = getRequestParams(page, size);

        const requestString = prepareStringRequest(params);

        EmployeeService.getAllEmployees(requestString)
            .then((response) => {
                setEmployees(response.data.content);
                setTotalPages(response.data.totalPages);

                console.log(response.data);
            }).catch((e) => {
            console.log(e);
        });

        retrieveSearch();
    };

    const retrieveSearch = () => {
        SearchService.getEmployeeTypes()
            .then((response) => {
                setEmployeeTypes(response.data);
            }).catch((e) => {
            console.log(e);
        });
        SearchService.getGenres()
            .then((response) => {
                setGenders(response.data);
            }).catch((e) => {
            console.log(e);
        });
        SearchService.getStrategies()
            .then((response) => {
                setStrategis(response.data);
            }).catch((e) => {
            console.log(e);
        });
        SearchService.getStatus()
            .then((response) => {
                setStatuses(response.data);
            }).catch((e) => {
            console.log(e);
        });
    }


    useEffect(retrieveEmployees, [page, size]);
    // useEffect(retrieveSearch, [type]);

    const getRequestParams = (page: number, size: number) => {
        setSearch({page: 0, size: 0});

        if (page) {
            search.page = page - 1;
        }

        if (size) {
            search.size = size;
        }

        return search;
    };

    const prepareStringRequest = (search: Search) => {
        let requestString = '?';

        Object.entries(search).forEach((value, key, map) => {
            if (value) {
                requestString += `${value[0]}=${value[1]}&`;
            }
        })

        if (requestString.endsWith('&')) {
            requestString = requestString.substr(0, requestString.length - 1);
        }

        console.log(requestString)

        return requestString;
    }

    const handleActivityChange = (rowIndex: number) => {
        const id = employeesRef.current[rowIndex].id;

        EmployeeService.changeActivity(id)
            .then((response) => {
                // props.history.push("/employeeTable");
                let newEmployees: Array<EmployeeData> = [...employeesRef.current];
                newEmployees[rowIndex] = response.data;
                setEmployees(newEmployees);
            }).catch((e) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveEmployees();
    };

    const findByTitle = () => {
        setPage(1);
        retrieveEmployees();
    };

    const closeEmployee = () => {
        setIsModalVisible(false)
    }

    const closeSalaries = () => {
        setIsSalaryVisible(false)
    }

    const closeSalariesModal = () => {
        setIsSalaryModalVisible(false)
    }

    const closeEmployeesModal = () => {
        setIsEmployeeModalVisible(false);
        props.history.push('/employees')
    }

    const openEmployee = (rowIndex: number) => {
        // const id = employeesRef.current[rowIndex].id;
        //
        // props.history.push("/employees/" + id);
        setIsEmployeeModalVisible(true);
        setSelected(employeesRef.current[rowIndex]);
        // return (
        //     <EmployeeModal onClose={onBackdropClick} isModalVisible={isModalVisible} />
        // );
    };

    const openEmployeeSalaries = (rowIndex: number) => {
        setIsSalaryVisible(true);
        setSelected(employeesRef.current[rowIndex]);
    }

    const fireEmployee = (rowIndex: number) => {
        const id = employeesRef.current[rowIndex].id;

        EmployeeService.fireEmployee(id)
            .then((response) => {
                props.history.push("/employees");
            }).catch((e) => {
            console.log(e);
        });
    }

    const calculateSalary = (rowIndex: number) => {
        const id = employeesRef.current[rowIndex].id;

        setSelected(employeesRef.current[rowIndex]);

        SalaryService.calculateSalary(id)
            .then((response) => {
                setSalary(response.data);
            }).catch((e) => {
            console.log(e);
        });

        setIsSalaryModalVisible(true);
    }

    const createEmployee = () => {
        setIsEmployeeModalVisible(true);
    }

    const deleteEmployee = (rowIndex: number) => {
        const id = employeesRef.current[rowIndex].id;

        EmployeeService.fireEmployee(id)
            .then((response) => {
                props.history.push("/employees");
            }).catch((e) => {
            console.log(e);
        });
    };

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSize(Number(event.target.value));
        setPage(1);
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setType(String(event.target.value));
        setSearch({
            ...search,
            type: String(event.target.value)
        });
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setGender(String(event.target.value));
        setSearch({
            ...search,
            gender: String(event.target.value)
        });
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(String(event.target.value));
        setSearch({
            ...search,
            employeeStatus: String(event.target.value)
        });
    };

    const columns: Column<EmployeeData>[] = useMemo(() => [
            // {
            //     Header: 'Activity',
            //     accessor: 'id',
            //     Cell: props => {
            //         const rowIdx = Number(props.row.id);
            //         const activity = props.cell.row.original.active;
            //         return (
            //             <div>
            //                 <Switch checked={activity} onChange={() => handleActivityChange(rowIdx)} color="secondary"/>
            //             </div>
            //         );
            //     },
            //     maxWidth: 120,
            //     minWidth: 80,
            //     width: 100
            // },
            {
                Header: 'Last Name',
                accessor: 'lastName',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'First Name',
                accessor: 'firstName',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Patronymic',
                accessor: 'patronymic',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Type',
                accessor: 'type',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Status',
                accessor: 'employeeStatus',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: (props) => {
                    const rowIdx = Number(props.row.id);
                    const employee = employeesRef.current[rowIdx];
                    return (
                        <div>
                            <Button
                                key="salaries"
                                variant="contained"
                                color="secondary"
                                onClick={() => openEmployeeSalaries(rowIdx)}
                            >
                                Salaries
                            </Button>
                            {employee.employeeStatus === 'FIRED' ? (<div />) : (
                                <>
                                    <Button
                                        key="change"
                                        variant="contained"
                                        className="ml-1"
                                        color="secondary"
                                        onClick={() => openEmployee(rowIdx)}
                                    >
                                        Change
                                    </Button>
                                    <Button
                                        key="fire"
                                        variant="contained"
                                        className="ml-1"
                                        color="secondary"
                                        onClick={() => fireEmployee(rowIdx)}
                                    >
                                        Fire
                                    </Button>
                                    <Button
                                        key="calculate"
                                        variant="contained"
                                        className="ml-1"
                                        color="secondary"
                                        onClick={() => calculateSalary(rowIdx)}
                                    >
                                        Calculate
                                    </Button>
                                </>
                                )}
                        </div>
                    );
                },
                maxWidth: 600,
                minWidth: 100,
                width: 400
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<EmployeeData>({
        columns,
        data: employees,
    });

    return (
        <div className="list row ml-3">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    {/*{todo добавить критерии поиска}*/}
                </div>
                <div className="input-group mb-3">
                    {/*{todo добавить критерии поиска}*/}
                </div>
                <div className="input-group mb-3">
                    <FormControl>
                        <InputLabel id="searchTypeSelectLabel" color="secondary">Type</InputLabel>
                        <Select
                            labelId="searchTypeSelectLabel"
                            id="searchTypeSelect"
                            value={type}
                            color="secondary"
                            onChange={handleTypeChange}
                            label="Type"
                            sx={{minWidth: 150}}
                        >
                            <MenuItem value=''>{'----'}</MenuItem>
                            {employeeTypes.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="ml-3">
                        <InputLabel id="genderSelectLabel" color="secondary">Gender</InputLabel>
                        <Select
                            labelId="genderSelectLabel"
                            id="genderSelect"
                            value={gender}
                            color="secondary"
                            onChange={handleGenderChange}
                            label="Gender"
                            sx={{minWidth: 150}}
                        >
                            <MenuItem value={''}>{'----'}</MenuItem>
                            {genders.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className="ml-3">
                        <InputLabel id="statusSelectLabel" color="secondary">Status</InputLabel>
                        <Select
                            labelId="statusSelectLabel"
                            id="statusSelect"
                            value={status}
                            color="secondary"
                            onChange={handleStatusChange}
                            label="Status"
                            sx={{minWidth: 150}}
                        >
                            <MenuItem value={''}>{'----'}</MenuItem>
                            {statuses.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group">
                        {/*<button*/}
                        {/*    className="btn btn-outline-secondary"*/}
                        {/*    type="button"*/}
                        {/*    onClick={findByTitle}*/}
                        {/*>*/}
                        {/*    Search*/}
                        {/*</button>*/}
                        <Button
                            variant="outlined"
                            startIcon={<SearchIcon/>}
                            onClick={findByTitle}
                            color="secondary"
                            sx={{minWidth: 150}}
                        >
                            Search
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon/>}
                            onClick={createEmployee}
                            color="secondary"
                            className="ml-3"
                            sx={{minWidth: 150}}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>

            <div className="col-md-12 list">
                <div className="mt-3">
                    <FormControl>
                        <InputLabel id="sizeSelectLabel" color="secondary">Items per Page:</InputLabel>
                        <Select
                            labelId="sizeSelectLabel"
                            id="sizeTypeSelect"
                            value={String(size)}
                            color="secondary"
                            onChange={handleSizeChange}
                            label="Size"
                            sx={{minWidth: 150}}
                        >
                            {pageSizes.map((size: number) => (
                                <MenuItem value={size}>{size}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Pagination
                        className="my-3"
                        count={totalPages}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        onChange={handlePageChange}
                        color="secondary"
                    />
                </div>

                <table
                    {...getTableProps()}
                >
                    <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps({
                            style: {
                                textAlign: 'center'
                            }
                        })}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps({
                                            style: {
                                                minWidth: cell.column.minWidth,
                                                width: cell.column.width,
                                                textAlign: 'center'
                                            },
                                        })}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <SalaryComponent
                onClose={closeSalaries}
                isModalVisible={isSalaryVisible}
                employeeData={selected}
            />
            <SalaryModalComponent
                onClose={closeSalariesModal}
                isModalVisible={isSalaryModalVisible}
                employeeData={selected}
                salaryData={salary}
            />
            <CreateEmployeeModal
                onClose={closeEmployeesModal}
                isModalVisible={isEmployeeModalVisible}
                employeeData={selected}
                genders={genders}
                types={employeeTypes}
                strategis={strategis}
            />
        </div>
    );
};

export default EmployeesTable;
