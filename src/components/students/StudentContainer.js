import React from 'react';
import { Col, Container, Row , Table , Button} from 'reactstrap';
import {useCreateUpdateStudent, useDeleteStudent, useGetAllStudents, useGetStudent} from '../../actions'
import TableData from './TableData'
import StudentModal from "./StudentModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const StudentContainer = () => {
    const [getAllStudents, { data: indexData }] = useGetAllStudents();
    const [createUpdateStudent, { data: postIndexData }] = useCreateUpdateStudent();
    const [deleteStudent, { data: deleteData }] = useDeleteStudent();
    const [getStudent, { data: getStudentData }] = useGetStudent();
    const [allData, setAllData] = React.useState([]);
    const [editData, setEditData] = React.useState({});
    const [modal, setModal] = React.useState(false);
    const [sortConfig, setSortConfig] = React.useState(null);
    const [toggleName , setToggleName] = React.useState('desc');



    React.useEffect(()=>{
        applyFilter()
    },[])

    const toggle = () => {
        setModal(!modal);
    };

    React.useEffect(()=>{
        if(indexData && indexData.success){
            setAllData(indexData.data);
        }
    },[indexData])

    React.useEffect(()=>{
        if(postIndexData && postIndexData.success){
            toggle();
            applyFilter();
        }
    },[postIndexData])

    React.useEffect(()=>{
        if(deleteData && deleteData.success){
            applyFilter();
        }
    },[deleteData])

    React.useEffect(()=>{
        if(getStudentData && getStudentData.success){
            toggle();
            setEditData(getStudentData.data)
        }
    },[getStudentData]);

    const applyFilter = async (payload={}) => {
        await getAllStudents(payload);
    };

    const createUpdateStudents = async (payload) => {
        await createUpdateStudent(payload);
    };

    const deleteRegisteredStudent = async (payload) => {
        await deleteStudent(payload);
    };


    const getEditStudent = async (id) =>{
        await getStudent({id: id});
    }
    const sortTable = (e) => {
        const { name } = e.target;
        const toggleValue = (toggleName === 'desc') ? 'asc' : 'desc'
        setToggleName(toggleValue);
        const payload = {}
        if(name){
            payload.sort = name;
            payload.direction = toggleValue;
            applyFilter(payload);
        }
    }

    const tableColumns = [
        {'first_name' : 'First Name'},
        {'last_name' : 'Last Name' },
        {'email' : 'Email'},
        {'phone' : 'Phone'},
        {},
        {},
    ];

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <Container fluid>
                            <StudentModal editData={editData} toggle={toggle} modal={modal} createUpdateStudents={createUpdateStudents} />
                            <Row>
                                <Col>
                                    <Button
                                        className="float-right mt-4 px-3 ml-3 mb-4"
                                        onClick={toggle}
                                    >
                                        ADD ESCALATION
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Table responsive className="custom-table subtitle-color font-weight-normal">
                                        <thead>
                                        <tr>
                                            {tableColumns.map((head, index) => (
                                                <th className="font-weight-normal" key={index}>
                                                    {Object.keys(head).map(function (k) {
                                                        return ( <button
                                                            type="button"
                                                            name={k}
                                                            onClick={(e) => sortTable(e)}
                                                        >
                                                            {head[k]}
                                                        </button>)

                                                    })}
                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <TableData deleteRegisteredStudent={deleteRegisteredStudent} getEditStudent={getEditStudent} allData={allData} />
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
         </>
    )

}

export default StudentContainer;