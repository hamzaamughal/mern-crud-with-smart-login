import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import axios from 'axios'
import Nav from './Nav'
import { getUser } from './helpers'
import 'react-quill/dist/quill.bubble.css'

const Create = () => {
    //state
    const [state, setState] = useState({
        title: '',
        user: getUser()
    })

    const [content, setContent] = useState('')

    //rich text editor handleChange
    const handleContent = (event) => {
        setContent(event)
    }

    //destructure values from state
    const { title, user } = state

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
                setState({ ...state, title: '', user: '' })
                setContent('')
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
                    <ReactQuill onChange={handleContent} value={content} id="content" className="pb-5 mb-3" theme="bubble" placeholder="Write something.." required
                        style={{ border: '1px solid #666' }} />
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
