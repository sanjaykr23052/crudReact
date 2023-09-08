import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from './Employees';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
function Home() {

    const [users, setUsers] = useState([])
    const[newuser,setNewuser]=useState()


    useEffect(() => {
        userData();
    }, []);
    let history = useNavigate();

    const handleEdit = (id, name, email, phone) => {
        localStorage.setItem('Name', name);
        localStorage.setItem('Email', email);
        localStorage.setItem('Phone', phone);
        localStorage.setItem('Id', id);

    }
    const handleDelete = (id) => {
        var index = Employees.map(function (e) {
            return e.id
        }).indexOf(id);
        Employees.splice(index, 1);

        history('/');


    }




    //api  data



    // const userData =async ()=>{
    // await axios.get("https://dummyjson.com/user")
    // .then ((response)=>{
    //     // console.log("response",response) first  check the response before saving it in any variable
    //     const myData = response.data.users;
    //     setUsers(myData);
    // })
    // .catch((err)=>{console.log(err)})
    // };


    const userData = async () => {
        const res = await axios.get("https://dummyjson.com/user")
        console.log(res.data.users)
        if (res.data.users) {
            setUsers(res.data.users)
        }
    };



    const deleteUser = (id) => {
        fetch(`https://dummyjson.com/users/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                //pure users me se srf isko chhod k  baki saab ko filetr kr do
                setUsers(users.filter(user => user.id !== id));
            })
            .then(console.log);

    }


    // const updateUser = (id, name, email, phoneno) => {
        // console.log(name)
        //     fetch(`https://dummyjson.com/users/${id}`, {
        //   method: 'PUT', /* or PATCH */
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     // firstName:name,
        //     // email:email,
        //     // phone:phoneno
        //     firstName:"archu",
        //     email:"archu@gmail.com",
        //     phone:"5647566"
        //   })
        // })
        // .then(res => res.json())
        // .then(console.log);
        const updateUser = (id, newName, newEmail, newPhone) => {
            // Make a PUT request to update the user data
                     console.log("line94",newName)
            fetch(`/api/users/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: newName,
                    email: newEmail,
                    phone: newPhone,
                }),
            })
            .then((response) => response.json())
            .then((data) => console.log("up",data))
                .catch((error) => console.error('Error updating user data:', error));
        };
    // }


    const handleCreate = (e) => {
        e.preventDefault();
        const user1={
            firstName: 'Muhammad',
                 email: 'Ovi@gmail.com',
                 phone: 250,   
        }
        setNewuser(user1)
        setUsers(...users,newuser)
        // fetch('https://dummyjson.com/users/add', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     firstName: 'Muhammad',
        //     email: 'Ovi@gmail.com',
        //     phone: 250,
        //     /* other user data */
        //   })
        // })
        // .then(res => res.json())
        // .then(console.log);                 

    }

        return (
            <Fragment>
                <div style={{ margin: "10rem" }}>
                    <Table striped bordered hover size="sm">
                        <thead  >
                            <tr style={{ marginLeft: "100px" }} >
                                <th >
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Phone
                                </th>
                                <th>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.length > 0
                                    ?
                                    users.map((item) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {item.firstName}
                                                </td>
                                                <td>
                                                    {item.email}
                                                </td>
                                                <td>
                                                    {item.phone}
                                                </td>
                                                <td>
                                                    <Link to={`/edit/${item.id}`}>
                                                        <Button onClick={() => updateUser(item.id, item.firstName, item.email, item.phone)}>Edit</Button>
                                                    </Link>
                                                    &nbsp;
                                                    <Button onClick={() => deleteUser(item.id)}>Delete</Button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                    :
                                    "No data available"
                            }
                        </tbody>
                    </Table>

                    {/* <Link className='d-grid gap-2' to="/create"> */}
                        <Button size="lg" onClick={{handleCreate}}>Create</Button>
                    {/* </Link> */}

                </div>


            </Fragment>
        )
    
}
export default Home;
// {JSON.stringify(users)}