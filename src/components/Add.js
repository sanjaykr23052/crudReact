import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from './Employees';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator' 
function Add() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    let history = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const ids = uuid();
        let uniqueId = ids.slice(0, 8);

        let a = name,
            b = email,
            c = phone;

        Employees.push({ id: uniqueId, Name: a, email: b, phone: c });
        history("/");
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    
      const handleChange = event => {
        if (!isValidEmail(event.target.value)) {
          setError('Email is invalid');
        } else {
          setError(null);
        }
    
        setEmail(event.target.value);
      };
     const validatePhoneNumber = (e) => {
        setPhone(e.target.value)
        const isValidPhoneNumber = validator.isMobilePhone(phone)
        // return (isValidPhoneNumber)
        if (!isValidPhoneNumber) {
            setError('Phone Number is invalid');
          } else {
            setError(null);
          }
       }
       
    
    return <div>
        <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Control type="text" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)}>

                </Form.Control>

            </Form.Group>
            <Form.Group className="mb-3" controlId="formAge">
                <Form.Control type="email" placeholder="Enter Email" required onChange={handleChange}>
                </Form.Control>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Control type="text" placeholder="Enter Contact Number" required onChange={validatePhoneNumber}>
                    </Form.Control>
                </Form.Group>
                {error && <h6 style={{color: 'red'}}>{error}</h6>}
                
        
                <Button onClick={(e) => handleSubmit(e)} type="submit">Submit</Button>
        </Form>
    </div>
}

export default Add;