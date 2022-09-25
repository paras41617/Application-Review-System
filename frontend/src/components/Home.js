import React from 'react'
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            resume: "None",
            pic: "None",
            contact: "None",
            id: '',
            title: '',
            start_year: '',
            end_year: '',
            institution: '',
            grade: '',
            type: '',
            role: '',
            url: ''
        }
        this.onchange_file = this.onchange_file.bind(this);
        this.onchange_text = this.onchange_text.bind(this);
        this.add_candidate = this.add_candidate.bind(this);
        this.getCookie = this.getCookie.bind(this)
        this.add_education = this.add_education.bind(this)
        this.add_experience = this.add_experience.bind(this)
        this.add_link = this.add_link.bind(this)
    }

    async add_candidate() {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('first_name', this.state.first_name);
        formdata.append('last_name', this.state.last_name);
        formdata.append('email', this.state.email);
        formdata.append('resume', this.state.resume);
        formdata.append('pic', this.state.pic);
        formdata.append('contact', this.state.contact);
        // const item = { 'first_name': this.state.first_name, 'last_name': this.state.last_name, 'email': this.state.email, 'contact': this.state.contact, 'resume': this.state.resume, 'pic': this.state.pic }
        console.log(formdata)
        await fetch('http://localhost:8000/create_candidate/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data['id'])
                this.setState({ id: data['id'] })
                localStorage.setItem('id' , data['id'])
            });
    }

    async add_education() {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('title', this.state.title);
        formdata.append('end_year', this.state.end_year);
        formdata.append('start_year', this.state.start_year);
        formdata.append('institution', this.state.institution);
        formdata.append('grade', this.state.grade);
        formdata.append('id', localStorage.getItem('id'));
        console.log(formdata)
        await fetch('http://localhost:8000/create_education/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    }

    async add_experience() {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('role', this.state.role);
        formdata.append('end_year', this.state.end_year);
        formdata.append('start_year', this.state.start_year);
        formdata.append('institution', this.state.institution);
        formdata.append('type', this.state.type);
        formdata.append('id', localStorage.getItem('id'));
        console.log(formdata)
        await fetch('http://localhost:8000/create_experience/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    }

    async add_link() {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('title', this.state.title);
        formdata.append('url', this.state.url);
        formdata.append('id', localStorage.getItem('id'));
        console.log(formdata)
        await fetch('http://localhost:8000/create_link/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    }

    onchange_text(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onchange_file(e) {
        this.setState({ [e.target.name]: e.target.files[0] })
    }

    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    render() {
        return (
            <div>
                Home
                <div>
                    <input onChange={this.onchange_text} type="text" name='first_name' placeholder='First Name' />
                    <input onChange={this.onchange_text} type="text" name='last_name' placeholder='Last Name' />
                    <input onChange={this.onchange_text} type="email" name='email' placeholder='Email' />
                    <input onChange={this.onchange_text} type="number" name='contact' placeholder='Contact No.' />
                    <input onChange={this.onchange_file} type="file" name='resume' placeholder='Resume' />
                    <input onChange={this.onchange_file} type="file" name='pic' placeholder='Profile Image' />
                    <button onClick={this.add_candidate}>Add</button>
                </div>
                <div>
                    <input onChange={this.onchange_text} type="text" name='role' placeholder='Role' />
                    <input onChange={this.onchange_text} type="number" name='start_year' placeholder='Start Year' />
                    <input onChange={this.onchange_text} type="number" name='end_year' placeholder='End Year' />
                    <input onChange={this.onchange_text} type="text" name='institution' placeholder='Institution' />
                    <input onChange={this.onchange_text} type="text" name='type' placeholder='Type' />
                    <button onClick={this.add_experience}>Add Experience</button>
                </div>
                <div>
                    <input onChange={this.onchange_text} type="text" name='title' placeholder='Title' />
                    <input onChange={this.onchange_text} type="number" name='start_year' placeholder='Start Year' />
                    <input onChange={this.onchange_text} type="number" name='end_year' placeholder='End Year' />
                    <input onChange={this.onchange_text} type="text" name='institution' placeholder='Institution' />
                    <input onChange={this.onchange_text} type="text" name='grade' placeholder='Grade' />
                    <button onClick={this.add_education}>Add Education</button>
                </div>
                <div>
                    <input onChange={this.onchange_text} type="text" name='title' placeholder='Title' />
                    <input onChange={this.onchange_text} type="text" name='url' placeholder='URL' />
                    <button onClick={this.add_link}>Add Link</button>
                </div>
            </div>
        )
    }
}

export default Home;