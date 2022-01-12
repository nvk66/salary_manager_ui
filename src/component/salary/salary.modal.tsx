import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SalaryData from "../../types/salaryData";
import EmployeeData from "../../types/employeeData";

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
    salaryData: SalaryData;
}

const SalaryModalComponent: React.FC<SalaryModalProps> = ({
                                                              isModalVisible,
                                                              onClose,
                                                              employeeData,
                                                              salaryData
                                                          }) => {
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
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    {`Calculated salary for Employee ${employeeData.lastName} ${employeeData.firstName} ${employeeData.patronymic}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Wage – ${salaryData.wage}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Amount – ${salaryData.amount}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Ndfl – ${salaryData.ndfl}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Recoupment – ${salaryData.recoupment}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Medical – ${salaryData.medical}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Social – ${salaryData.social}`}
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="div">
                    {`Calculation date – ${salaryData.calculationDate}`}
                </Typography>
            </Box>
        </Modal>
    );
};

export default SalaryModalComponent;
