import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useEffect, useState} from "react";
import EmployeeData from "../../types/employeeData";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField} from "@mui/material";
import EmployeeService from "../../service/employee.service";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import DatePicker from '@mui/lab/DatePicker';

const style = {
    position: 'absolute' as 'absolute',
    top:'40%',
    bottom: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    overflow:'scroll',
    boxShadow: 24,
    p: 4,
};

interface EmployeeModalProps {
    onClose: () => void;
    isModalVisible: boolean;
    employeeData: EmployeeData;
    types: string[];
    genders: string[];
    strategis: string[];
}

const CreateEmployeeModal: React.FC<EmployeeModalProps> = ({
                                                               isModalVisible,
                                                               onClose,
                                                               employeeData,
                                                               types,
                                                               genders,
                                                               strategis
                                                           }) => {
    const [employee, setEmployee] = useState(employeeData);
    const [loading, setLoading] = useState(false);

    const handleChange = (prop: keyof EmployeeData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployee({...employee, [prop]: event.target.value});
    };

    const handleChildrenSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, childrenCount: Number(newValue)});
    };

    const handleCoefficientSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, coefficient: Number(newValue)});
    };

    const handlVacationSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, extraVacationDays: Number(newValue)});
    };

    const handleElecticalSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, electricalSafetyGrade: Number(newValue)});
    };
    const handleFireSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, fireSafetyRank: Number(newValue)});
    };
    const handleSecuritySlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, informationSecurityRank: Number(newValue)});
    };
    const handleDetailsSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, numberOfDetails: Number(newValue)});
    };
    const handleProjectsSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, countOfProjects: Number(newValue)});
    };
    const handleHazardSlider = (event: Event, newValue: number | number[]) => {
        setEmployee({...employee, hazardRatio: Number(newValue)});
    };

    const handleTypeChange = (event: SelectChangeEvent) => {
        setEmployee({...employee, type: String(event.target.value)});
    };

    const handleGenderChange = (event: SelectChangeEvent) => {
        setEmployee({...employee, gender: String(event.target.value)});
    };

    const handleStrategyChange = (event: SelectChangeEvent) => {
        setEmployee({...employee, overworkingStrategy: String(event.target.value)});
    };

    console.log(employee)
    console.log(employeeData)

    const save = () => {
        setLoading(true);

        if (!employee.id) {
            employee.id = employeeData.id;
        }
        if (!employee.firstName) {
            employee.firstName = employeeData.firstName;
        }
        if (!employee.lastName) {
            employee.lastName = employeeData.lastName;
        }
        if (!employee.patronymic) {
            employee.patronymic = employeeData.patronymic;
        }
        if (!employee.type) {
            employee.type = employeeData.type;
        }
        if (!employee.gender) {
            employee.gender = employeeData.gender;
        }
        if (!employee.childrenCount) {
            employee.childrenCount = employeeData.childrenCount ? employeeData.childrenCount : 0;
        }
        if (!employee.coefficient) {
            employee.coefficient = employeeData.coefficient ? employeeData.coefficient : 0;
        }
        if (!employee.extraVacationDays) {
            employee.extraVacationDays = employeeData.extraVacationDays ? employeeData.extraVacationDays : 0;
        }
        if (!employee.dateOfBirth) {
            employee.dateOfBirth = employeeData.dateOfBirth;
        }
        if (!employee.electricalSafetyGrade) {
            employee.electricalSafetyGrade = employeeData.electricalSafetyGrade;
        }
        if (!employee.fireSafetyRank) {
            employee.fireSafetyRank = employeeData.fireSafetyRank;
        }
        if (!employee.informationSecurityRank) {
            employee.informationSecurityRank = employeeData.informationSecurityRank;
        }
        if (!employee.countOfProjects) {
            employee.countOfProjects = employeeData.countOfProjects;
        }
        if (!employee.numberOfDetails) {
            employee.numberOfDetails = employeeData.numberOfDetails;
        }
        if (!employee.hazardRatio) {
            employee.hazardRatio = employeeData.hazardRatio;
        }
        if (!employee.overworkingStrategy) {
            employee.overworkingStrategy = employeeData.overworkingStrategy;
        }

        employee.id ?
            EmployeeService.updateEmployee(employee.id, employee).then((response) => {
                setLoading(false);
                onClose();
            }).catch((e) => {
                setLoading(false);
                console.log(e);
            }) :
            EmployeeService.addEmployee(employee).then((response) => {
                setLoading(false);
                onClose();
            }).catch((e) => {
                setLoading(false);
                console.log(e);
            });
    }

    return (
        <Modal
            open={isModalVisible}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}
                 component="form"
                 autoComplete="off"
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {employeeData.lastName ? 'Update employee' : 'Create employee'}
                </Typography>
                <div>
                    <TextField
                        required
                        id="guid"
                        color="secondary"
                        label="Last Name"
                        defaultValue={employeeData.lastName}
                        margin="normal"
                        fullWidth
                        onChange={handleChange('lastName')}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="name"
                        color="secondary"
                        label="First Name"
                        defaultValue={employeeData.firstName}
                        margin="normal"
                        fullWidth
                        onChange={handleChange('firstName')}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="phoneNumber"
                        color="secondary"
                        label="Patronymic"
                        defaultValue={employeeData.patronymic}
                        margin="normal"
                        fullWidth
                        onChange={handleChange('patronymic')}
                    />
                </div>
                <div>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="searchTypeSelectLabel" color="secondary">Type</InputLabel>
                        <Select
                            labelId="searchTypeSelectLabel"
                            id="searchTypeSelect"
                            value={employeeData.type}
                            color="secondary"
                            onChange={handleTypeChange}
                            label="Type"
                        >
                            {types.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="genderSelectLabel" color="secondary">Gender</InputLabel>
                        <Select
                            labelId="genderSelectLabel"
                            id="genderSelect"
                            value={employeeData.gender}
                            color="secondary"
                            onChange={handleGenderChange}
                            label="Gender"
                        >
                            {genders.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel id="strategySelectLabel" color="secondary">Over Working Strategy</InputLabel>
                        <Select
                            labelId="strategySelectLabel"
                            id="strategySelect"
                            value={employee.overworkingStrategy}
                            color="secondary"
                            onChange={handleStrategyChange}
                            label="Over Working Strategy"
                        >
                            {strategis.map((key: string) => (
                                <MenuItem value={key}>{key}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Typography id="non-linear-slider" gutterBottom>
                        {`Children Count: ${employee.childrenCount ? employee.childrenCount : 0}`}
                    </Typography>
                    <Slider
                        aria-label="Children Count"
                        defaultValue={employee.childrenCount ? employee.childrenCount : 0}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={10}
                        color="secondary"
                        onChange={handleChildrenSlider}
                    />
                </div>
                <div>
                    <Typography id="non-linear-slider" gutterBottom>
                        {`Coefficient: ${employee.coefficient ? employee.coefficient : 0}`}
                    </Typography>
                    <Slider
                        aria-label="Coefficient"
                        defaultValue={employee.coefficient ? employee.coefficient : 0}
                        valueLabelDisplay="auto"
                        step={5}
                        marks
                        min={0}
                        max={100}
                        color="secondary"
                        onChange={handleCoefficientSlider}
                    />
                </div>
                <div>
                    <Typography id="non-linear-slider" gutterBottom>
                        {`Extra Vacation Days: ${employee.extraVacationDays ? employee.extraVacationDays : 0}`}
                    </Typography>
                    <Slider
                        aria-label="Coefficient"
                        defaultValue={employee.extraVacationDays ? employee.extraVacationDays : 0}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={0}
                        max={100}
                        color="secondary"
                        onChange={handlVacationSlider}
                    />
                </div>
                <div>
                    {/*<DatePicker*/}
                    {/*    disableFuture*/}
                    {/*    label="Responsive"*/}
                    {/*    openTo="year"*/}
                    {/*    views={['year', 'month', 'day']}*/}
                    {/*    value={employeeData.dateOfBirth}*/}
                    {/*    onChange={(newValue) => {*/}
                    {/*        setEmployee({...employee, dateOfBirth: String(newValue)});*/}
                    {/*    }}*/}
                    {/*    renderInput={(params) => <TextField {...params} />}*/}
                    {/*/>*/}
                </div>
                {employee.type === 'ENGINEER' ? (
                    <>
                        <div>
                            <Typography id="non-linear-slider" gutterBottom>
                                {`Electrical Safety Grade: ${employee.electricalSafetyGrade ? employee.electricalSafetyGrade : 0}`}
                            </Typography>
                            <Slider
                                aria-label="electricalSafetyGrade"
                                defaultValue={employee.electricalSafetyGrade ? employee.electricalSafetyGrade : 0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                                color="secondary"
                                onChange={handleElecticalSlider}
                            />
                        </div>
                        <div>
                            <Typography id="non-linear-slider" gutterBottom>
                                {`Fire Safety Rank: ${employee.fireSafetyRank ? employee.fireSafetyRank : 0}`}
                            </Typography>
                            <Slider
                                aria-label="fireSafetyRank"
                                defaultValue={employee.fireSafetyRank ? employee.fireSafetyRank : 0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                                color="secondary"
                                onChange={handleFireSlider}
                            />
                        </div>
                        <div>
                            <Typography id="non-linear-slider" gutterBottom>
                                {`Information Security Rank: ${employee.informationSecurityRank ? employee.informationSecurityRank : 0}`}
                            </Typography>
                            <Slider
                                aria-label="informationSecurityRank"
                                defaultValue={employee.informationSecurityRank ? employee.informationSecurityRank : 0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                                color="secondary"
                                onChange={handleSecuritySlider}
                            />
                        </div>
                    </>
                ) : (
                    employee.type === 'MANAGER' ? (
                        <>
                            <div>
                                <Typography id="non-linear-slider" gutterBottom>
                                    {`Count Of Projects: ${employee.countOfProjects ? employee.countOfProjects : 0}`}
                                </Typography>
                                <Slider
                                    aria-label="Coefficient"
                                    defaultValue={employee.countOfProjects ? employee.countOfProjects : 0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    color="secondary"
                                    onChange={handleProjectsSlider}
                                />
                            </div>
                        </>
                    ) : (employee.type === 'WORKER' ? (
                            <>
                                <div>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        {`Number Of Details: ${employee.numberOfDetails ? employee.numberOfDetails : 0}`}
                                    </Typography>
                                    <Slider
                                        aria-label="Coefficient"
                                        defaultValue={employee.numberOfDetails ? employee.numberOfDetails : 0}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                        color="secondary"
                                        onChange={handleDetailsSlider}
                                    />
                                </div>
                                <div>
                                    <Typography id="non-linear-slider" gutterBottom>
                                        {`Hazard Ratio: ${employee.hazardRatio ? employee.hazardRatio : 0}`}
                                    </Typography>
                                    <Slider
                                        aria-label="Coefficient"
                                        defaultValue={employee.hazardRatio ? employee.hazardRatio : 0}
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}
                                        color="secondary"
                                        onChange={handleHazardSlider}
                                    />
                                </div>
                            </>
                        ) : (<></>)
                ))}
                <div>
                    <LoadingButton
                        color="secondary"
                        onClick={save}
                        loading={loading}
                        loadingPosition="start"
                        variant="contained"
                        fullWidth
                    >
                        Save
                    </LoadingButton>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateEmployeeModal;
