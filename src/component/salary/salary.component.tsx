import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import SalaryData from "../../types/salaryData";
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import EmployeeData from "../../types/employeeData";
import EmployeeService from "../../service/employee.service";
import SalaryService from "../../service/salary.service";
import SearchType from "../../types/searchType";
import {Column, useTable} from "react-table";
import Pagination from "@mui/lab/Pagination";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface SalaryModalProps {
    onClose: () => void;
    isModalVisible: boolean;
    employeeData: EmployeeData;
}

type Search = {} & SearchType & SalaryData;

const SalaryComponent: React.FC<SalaryModalProps> = ({
                                                         isModalVisible,
                                                         onClose,
                                                         employeeData,
                                                     }) => {

    const [salaries, setSalaries] = useState<Array<SalaryData>>([]);
    const salariesRef = useRef<Array<SalaryData>>([]);
    const [pageSizes] = useState<Array<number>>([3, 12, 24]);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(3);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState<Search>({
        page: page,
        size: size
    })

    salariesRef.current = salaries;

    const retrieveSalaries = () => {
        console.log('!!');
        console.log(employeeData);
        if (employeeData) {
            const params = getRequestParams(page, size);

            const requestString = prepareStringRequest(params);

            SalaryService.getEmployeeSalaries(Number(employeeData.id), requestString)
                .then((response) => {
                    setSalaries(response.data.content);
                    setTotalPages(response.data.totalPages);

                    console.log(response.data);
                }).catch((e) => {
                console.log(e);
            });
        }
    };

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

    useEffect(retrieveSalaries, [page, size, employeeData]);

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleSizeChange = (event: SelectChangeEvent) => {
        setSize(Number(event.target.value));
        setPage(1);
    };

    const columns: Column<SalaryData>[] = useMemo(() => [
            {
                Header: 'Wage',
                accessor: 'wage',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Recoupment',
                accessor: 'recoupment',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Ndfl',
                accessor: 'ndfl',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Retirement',
                accessor: 'retirement',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Medical',
                accessor: 'medical',
                maxWidth: 200,
                minWidth: 100,
                width: 200
            },
            {
                Header: 'Social',
                accessor: 'social',
                maxWidth: 200,
                minWidth: 100,
                width: 200
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
    } = useTable<SalaryData>({
        columns,
        data: salaries,
    });

    return (
        <Modal
            open={isModalVisible}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}
                 component="div"
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {`Salaries for Employee ${employeeData.lastName} ${employeeData.firstName} ${employeeData.patronymic}`}
                </Typography>
                <div>
                    <div className="col-md-12 list">
                        <div className="mt-3">
                            {"Items per Page: "}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={String(size)}
                                label='Size'
                                onChange={handleSizeChange}
                            >
                                {pageSizes.map((size: number) => (
                                    <MenuItem value={size}>{size}</MenuItem>
                                ))}
                            </Select>

                            <Pagination
                                className="my-3"
                                count={totalPages}
                                page={page}
                                siblingCount={1}
                                boundaryCount={1}
                                variant="outlined"
                                // shape="rounded"
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
                </div>
            </Box>
        </Modal>
    );
};

export default SalaryComponent;
