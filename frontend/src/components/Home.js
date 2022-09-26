import React from 'react'
import '../styles/Home.css'
import Popup from './Popup';

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
            created: false,
            showPopup:false,
            popup_type:''
        }
        this.onchange_file = this.onchange_file.bind(this);
        this.onchange_text = this.onchange_text.bind(this);
        this.add_candidate = this.add_candidate.bind(this);
        this.getCookie = this.getCookie.bind(this)
        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup(type) {
        this.setState({
            showPopup: !this.state.showPopup,
            popup_type:type
        });
    };

    async add_candidate(e) {
        e.preventDefault();
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('first_name', this.state.first_name);
        formdata.append('last_name', this.state.last_name);
        formdata.append('email', this.state.email);
        formdata.append('resume', this.state.resume);
        formdata.append('pic', this.state.pic);
        formdata.append('contact', this.state.contact);
        await fetch('http://localhost:8000/create_candidate/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({ id: data['id'] })
                localStorage.setItem('id', data['id'])
            });
        this.setState({ created: true });
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
            <div style={{ backgroundColor: "black", }} >
                {this.state.created ? <div style={{ paddingTop: '10%', marginLeft: "25%", width: "50%", height: "400px", textAlign: "center" }}>
                    <button onClick={() => this.togglePopup('experience')} className='button-27'>
                        Add Experience
                    </button>
                    <button onClick={() => this.togglePopup('education')} className='button-27'>
                        Add Education
                    </button>
                    <button onClick={() => this.togglePopup('link')} className='button-27'>
                        Add Link
                    </button>
                </div> : <div class="form">
                    <div class="title">Create</div>
                    <div class="subtitle">Add a new Candidate</div>
                    <div class="input-container ic1">
                        <input onChange={this.onchange_text} id="firstname" name="first_name" class="input" type="text" placeholder=" " />
                        <div class="cut"></div>
                        <label for="firstname" class="placeholder">First Name</label>
                    </div>
                    <div class="input-container ic2">
                        <input onChange={this.onchange_text} id="lastname" name="last_name" class="input" type="text" placeholder=" " />
                        <div class="cut"></div>
                        <label for="lastname" class="placeholder">Last Name</label>
                    </div>
                    <div class="input-container ic2">
                        <input onChange={this.onchange_text} id="email" name="email" class="input" type="email" placeholder=" " />
                        <div class="cut"></div>
                        <label for="email" class="placeholder">Email</label>
                    </div>
                    <div class="input-container ic2">
                        <input onChange={this.onchange_text} name="contact" id="contact" class="input" placeholder=" " type='number' />
                        <div class="cut cut-short"></div>
                        <label for="contact" class="placeholder">Contact No.</label>
                    </div>
                    <div class="input-container ic2">
                        <input onChange={this.onchange_file} name="pic" id="pic" class="input_2" type="file" placeholder=" " />
                        <div class="cut"></div>
                        <label for="pic" class="placeholder">Pic</label>
                    </div>
                    <div class="input-container ic2">
                        <input onChange={this.onchange_file} name="resume" id="resume" class="input_2" type="file" placeholder=" " />
                        <div class="cut"></div>
                        <label for="resume" class="placeholder">Resume</label>
                    </div>
                    <button onClick={this.add_candidate} type="text" class="submit">Create</button>
                </div>}
                <div>
                    {this.state.showPopup ?
                        <Popup
                            type={this.state.popup_type}
                            closePopup={this.togglePopup}
                        />
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default Home;