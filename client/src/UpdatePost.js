import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './Nav'

const UpdatePost = (props) => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: ''
    })

    const { title, content, slug, user } = state

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
            .then(response => {
                // console.log(response.data.post);
                const { title, content, slug, user } = response.data.post
                setState({ ...state, title, content, slug, user })
            })
            .catch(error => alert('Error loading single post'))
    }, [props.match.params.slug])

    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.put(`${process.env.REACT_APP_API}/post/${slug}`, { title, content, user })
            .then(response => {
                const { title, content, slug, user } = response.data.post
                //empty state
                setState({ ...state, title, content, user, slug })
                //show success alert
                alert(`Post titled: ${title} is updated`)
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error)
            })
    }

    const showUpdateForm = () => {
        return (
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
                    <button className="btn btn-primary">Update</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>UPDATE POST</h1>
            {showUpdateForm()}
        </div>
    )
}

export default UpdatePost
