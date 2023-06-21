import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from './Employees';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';

function Edit() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');

    let history = useNavigate();
    var index = Employees.map(function (e) {
        return e.id
    }).indexOf(id);

    const handleSubmit = (e) => {
        e.preventDefault();

        let a = Employees[index];
        a.Name = name;
        a.Email = email;
        a.Phone = phone;
        history("/");
    }

    useEffect(() => {
        setName(localStorage.getItem('Name'))
        setEmail(localStorage.getItem('Email'))
        setPhone(localStorage.getItem('Phone'))
        setId(localStorage.getItem('Id'))
    }, [])

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)}>

                    </Form.Control>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control type="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Control type="text" placeholder="Enter Contact Number" value={phone} required onChange={(e) => setPhone(e.target.value)}>

                    </Form.Control>

                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">Update</Button>
            </Form>
        </div>
    )




}

export default Edit;
