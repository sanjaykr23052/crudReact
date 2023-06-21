import React, { Fragment } from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employees from './Employees';
 import {Link,useNavigate} from 'react-router-dom';

function Home()
{
    let history = useNavigate(); 

    const handleEdit = (id, name,email,phone) =>{
        localStorage.setItem('Name',name);
        localStorage.setItem('Email',email);
        localStorage.setItem('Phone',phone);
        localStorage.setItem('Id',id);

    }
    const handleDelete = (id) =>{
        var index = Employees.map(function(e){
        return e.id
    }).indexOf(id);
    Employees.splice(index,1);

    history('/');


}
    return(
       <Fragment>
        <div style={{margin:"10rem"}}>
            <Table striped bordered hover size="sm">
                <thead  >
                    <tr style={{marginLeft:"100px"}} >
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
                        Employees && Employees.length>0
                        ?
                        Employees.map((item) =>{
                            return(
                                <tr>
                                    <td>
                                        {item.Name}
                                    </td>
                                    <td>
                                        {item.Email}
                                    </td>
                                    <td>
                                        {item.Phone}
                                    </td>
                                    <td>
                                        <Link to={`/edit`}>
                                        <Button onClick={() => handleEdit(item.id, item.Name, item.Email,item.Phone)}>Edit</Button>
                                        </Link>
                                        &nbsp;
                                        <Button onClick={() => handleDelete(item.id)}>Delete</Button>

                                    </td>
    
                                </tr>
                            )
                        })
                        :
                        "No data available"
                    }
                </tbody>
            </Table>
            
            <Link className='d-grid gap-2' to="/create">
                <Button size="lg">Create</Button>
            </Link>
            
        </div>
       </Fragment>
    )
}
export default Home;