import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Candidate.css'
import { Link } from 'react-router-dom';


class Candidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: [],
            experiences: [],
            educations: [],
            links: [],
            choice: '',
            showPopup: false,
        }
        this.get_all = this.get_all.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.show_detail = this.show_detail.bind(this);
        this.onchange_text = this.onchange_text.bind(this);
        this.change_status = this.change_status.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount() {
        this.get_all()
    }

    onchange_text(e) {
        this.setState({ [e.target.name]: e.target.value })
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

    async get_all() {
        var csrftoken = this.getCookie('csrftoken');
        await fetch('http://localhost:8000/show_candidates/', {
            method: 'GET',
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data['all_candidates'])
                this.setState({ candidates: data['all_candidates'] })
            });
    }

    async show_detail(id) {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('id', id);
        await fetch('http://localhost:8000/show_detail/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data['experiences'])
                console.log(data['educations'])
                console.log(data['links'])
                this.setState({
                    educations: data['educations'], experiences: data['experiences'], links: data['links']
                })
            });
    }

    togglePopup(i) {
        this.setState({
          showPopup: !this.state.showPopup
        });
        this.show_detail(i);
      };

    async change_status(id) {
        console.log(id)
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('id', id);
        formdata.append('status', this.state.choice);
        console.log(this.state.choice)
        await fetch('http://localhost:8000/change_status/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    }

    render() {
        return (
            <div>
                {this.state.showPopup?<div>

                </div>:<div className='grid_container_2_explore'>
                    {
                        this.state.candidates.map((candidate, i) => (
                            <div key={i} className="card_2_explore">
                                <button style={{height:"100%"}} onClick={() => this.togglePopup(candidate.id)} id="close">
                                    <img className='image_2_explore' src={`http://localhost:8000/media/${candidate.pic}`} placeholder='random_picture' />
                                    <div className="container_2_explore">
                                        <h4><b>{candidate.first_name}</b></h4>
                                        <p>{candidate.status}</p>
                                        <p>{candidate.email}</p>
                                    </div>
                                </button>
                            </div>
                        ))
                    }
                </div>}
            </div>
        )
    }
}

export default Candidate;