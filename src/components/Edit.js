import React, { useState, useEffect } from "react";
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from './Employees';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate,useParams } from 'react-router-dom';
function Edit(props) {
    const [firstName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [id, setId] = useState('');
    let history = useNavigate();
    const params=useParams()
   
useEffect(()=>{
    setId(params.id)
},[])
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(id)
        console.log(firstName)
        fetch(`https://dummyjson.com/users/${id}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                email:email,
                phone: phone,
            })
          })
        //   .then(res => res.json())
          .then(()=>{
        })

        history("/");
    }
   

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "15rem" }}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Control type="text" placeholder="Enter Name" value={firstName} required onChange={(e) => setName(e.target.value)}>

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
