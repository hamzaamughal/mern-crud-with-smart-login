import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import { authenticate, getUser } from './helpers'

const Login = (props) => {
    const [state, setState] = useState({
        name: '',
        password: '',
    })
    const { name, password } = state
    useEffect(() => {
        getUser() && props.history.push('/')
    }, [props.history])
    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/login`, { name, password })
            .then(response => {
                console.log(response.data);
                //response will contain token and name
                authenticate(response, () => props.history.push('/create'))
                //redirect to create page
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error)
            })
    }
    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>LOGIN</h1>
            <hr />
            <form onSubmit={handleSubmit} action="">
                <div className="form-group m-3">
                    <label htmlFor="name" className="text-muted p-2">Name</label>
                    <input onChange={handleChange('name')} value={name} id="name" type="text" className="form-control" placeholder="Your Name" required />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="password" className="text-muted p-2">Password</label>
                    <input onChange={handleChange('password')} value={password} id="password" type="password" className="form-control" placeholder="Your Password" required />
                </div>
                <div className="m-3 p-2">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default withRouter(Login)
