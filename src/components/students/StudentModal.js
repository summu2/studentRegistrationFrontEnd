import React from 'react';
import {Button,Input, Col, Container, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table} from 'reactstrap';

const { useState } = React;

const StudentModal = (props) => {

    // const [firstName, setFirstName] = React.useState('');
    // const [lastName, setLastName] = React.useState('');
    // const [email, setEmail] = React.useState('');
    // const [phone, setPhone] = React.useState('');
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        phone: ""
    };

    const [
        { first_name, last_name ,phone,email },
        setState
    ] = useState(initialState);



    React.useEffect(()=>{
        setState({...props.editData})
    },[props])


    const [editSelected, setEditSelected] = React.useState(false);
    const handleInput  = (e) =>{
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSave = (e)=>{
        const payload = {}
        if(props.editData.id) {
            payload["id"] = props.editData.id;
        }
        if (first_name!=='') {
            payload["first_name"] = first_name;
        }
        if (last_name!=='') {
            payload["last_name"] = last_name;
        }
        if(email!=='') {
            payload["email"] = email;
        }
        if(phone!=='') {
            payload["phone"] = phone;
        }
        setState({ ...initialState });
        props.createUpdateStudents(payload);
    }

    const onHandleClose = () => {
        setState({ ...initialState });
        props.toggle();
    }

    return (
        <Modal isOpen={props.modal} toggle={onHandleClose} size="xl">
            <ModalHeader toggle={onHandleClose}> {editSelected ? 'Edit Escalation' : 'Add Escalation'}</ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            <Label>First Name </Label>
                                <Input
                                    placeholder={'First Name'}
                                    name={'first_name'}
                                    defaultValue={first_name}
                                    onKeyPress={(e) => {
                                        handleInput(e);
                                        }
                                    }
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Second Name </Label>
                            <Input
                                name={'last_name'}
                                placeholder={'Last Name'}
                                defaultValue={last_name}
                                onKeyPress={(e) => {
                                    handleInput(e);
                                }
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Email </Label>
                            <Input
                                placeholder={'Email'}
                                name={'email'}
                                defaultValue={email}
                                onKeyPress={(e) => {
                                    handleInput(e);
                                }
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Label>Phone </Label>
                            <Input
                                name={'phone'}
                                placeholder={'Phone'}
                                defaultValue={phone}
                                onKeyPress={(e) => {
                                    handleInput(e);
                                }
                                }
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button onClick={handleSave}>{'Save'}</Button>
                        </Col>
                    </Row>

                </Container>
            </ModalBody>

        </Modal>
    )
}
export default StudentModal;