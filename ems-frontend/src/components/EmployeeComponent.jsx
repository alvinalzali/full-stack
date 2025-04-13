import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";


const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])
    



    function saveOrUpdateEmployee(e) {
        e.preventDefault();

        

        if (validateForm()) {
            const employee = { firstName, lastName, email };
            console.log(employee);

            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }else{

                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {... error};

        // FIRST NAME
        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else if (firstName.length > 50) {
            errorsCopy.firstName = 'First Name must be less than 50 characters';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        // LAST NAME
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        } else if (lastName.length > 50) {
            errorsCopy.lastName = 'Last Name must be less than 50 characters';
            valid = false;
        } else {
            errorsCopy.lastName = '';
        }

        // EMAIL
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        } else if (email.length > 254) {
            errorsCopy.email = 'Email must be less than 254 characters';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errorsCopy.email = 'Email is not valid';
            valid = false;
        } else {
            errorsCopy.email = '';
        }

        setError(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Update Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }



    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        {pageTitle()}
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>First Name</label>
                                    <input
                                        type='text'
                                        placeholder='Enter First Name'
                                        name='firstName'
                                        value={firstName}
                                        maxLength={50}
                                        className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                        onChange ={ (e) => setFirstName(e.target.value)}

                                    />
                                    {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name</label>
                                    <input
                                        type='text'
                                        className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                        value={lastName}
                                        maxLength={50}
                                        placeholder='Enter Last Name'
                                        name='lastName'
                                        onChange={ (e) => setLastName(e.target.value)}
                                    />
                                    {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                        value={email}
                                        maxLength={254}
                                        placeholder='Enter Email'
                                        name='email'
                                        onChange={ (e) => setEmail(e.target.value)}
                                    />
                                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                                </div>
                                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
};

export default EmployeeComponent;