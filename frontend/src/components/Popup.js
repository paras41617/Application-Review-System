import React from 'react';
import '../styles/Popup.css'

class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            start_year: '',
            end_year: '',
            institution: '',
            grade: '',
            type: '',
            role: '',
            url: '',
        }
        this.onchange_file = this.onchange_file.bind(this);
        this.onchange_text = this.onchange_text.bind(this);
        this.add_education = this.add_education.bind(this)
        this.add_experience = this.add_experience.bind(this)
        this.add_link = this.add_link.bind(this);
        this.getCookie = this.getCookie.bind(this);
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
                <div class="modal_container">
                    {this.props.type == "experience" ? <div class="form_2">
                        <div class="title">Experience</div>
                        <div class="subtitle">Add Experience</div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="role" name="role" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="role" class="placeholder">Role</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="startyear" name="start_year" class="input" type="number" placeholder=" " />
                            <div class="cut"></div>
                            <label for="startyear" class="placeholder">Start Year</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="endyear" name="end_year" class="input" type="number" placeholder=" " />
                            <div class="cut"></div>
                            <label for="endyear" class="placeholder">End Year</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="institution" name="institution" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="institution" class="placeholder">Institution</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="type" name="type" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="type" class="placeholder">Type</label>
                        </div>
                        <button onClick={this.add_experience} type="text" class="submit_2">Add</button>
                        <button onClick={this.props.closePopup} type="text" class="submit_2">Close</button>
                    </div> : this.props.type == "education" ? <div class="form_2">
                        <div class="title">Education</div>
                        <div class="subtitle">Add Education</div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="title" name="title" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="title" class="placeholder">Title</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="startyear" name="start_year" class="input" type="number" placeholder=" " />
                            <div class="cut"></div>
                            <label for="startyear" class="placeholder">Start Year</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="endyear" name="end_year" class="input" type="number" placeholder=" " />
                            <div class="cut"></div>
                            <label for="endyear" class="placeholder">End Year</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="institution" name="institution" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="institution" class="placeholder">Institution</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="grade" name="grade" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="grade" class="placeholder">Grade</label>
                        </div>
                        <button onClick={this.add_education} type="text" class="submit_2">Add</button>
                        <button onClick={this.props.closePopup} type="text" class="submit_2">Close</button>
                    </div> : <div class="form_2">
                        <div class="title">Link</div>
                        <div class="subtitle">Add Link</div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="title" name="title" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="title" class="placeholder">Title</label>
                        </div>
                        <div class="input-container ic3">
                            <input onChange={this.onchange_text} id="url" name="url" class="input" type="text" placeholder=" " />
                            <div class="cut"></div>
                            <label for="url" class="placeholder">URL</label>
                        </div>
                        <button onClick={this.add_link} type="text" class="submit_2">Add</button>
                        <button onClick={this.props.closePopup} type="text" class="submit_2">Close</button>
                    </div>}
                </div>
            </div>
        )
    }
}

export default Popup;
