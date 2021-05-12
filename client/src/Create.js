import React, { useState } from 'react'
import axios from 'axios'
import Nav from './Nav'

const Create = () => {
    //state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    })

    //destructure values from state
    const { title, content, user } = state

    //onChange event handler
    const handleChange = (name) => (event) => {
        console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post(`${process.env.REACT_APP_API}/post`, { title, content, user })
            .then(response => {
                //empty state
                setState({ ...state, title: '', content: '', user: '' })
                //show success alert
                alert(`Post titled: ${response.data.title} is created`)
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
            <h1>CREATE POST</h1>
            <br />
            <form onSubmit={handleSubmit} action="">
                <div className="form-group m-3">
                    <label htmlFor="title" className="text-muted p-2">Title</label>
                    <input onChange={handleChange('title')} value={title} id="title" type="text" className="form-control" placeholder="Post title" required />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="content" className="text-muted p-2">Content</label>
                    <textarea onChange={handleChange('content')} value={content} id="content" type="text" className="form-control" placeholder="Write something.." required />
                </div>
                <div className="form-group m-3">
                    <label htmlFor="user" className="text-muted p-2">User</label>
                    <input onChange={handleChange('user')} value={user} id="user" type="text" className="form-control" placeholder="Your name" required />
                </div>
                <div className="m-3 p-2">
                    <button className="btn btn-primary">Create</button>
                </div>
            </form>
        </div>
    )
}

export default Create
