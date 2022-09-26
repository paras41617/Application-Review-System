import React from 'react';
import '../styles/Candidate.css'

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
            candidate: null,
        }
        this.get_all = this.get_all.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.show_detail = this.show_detail.bind(this);
        this.onchange_text = this.onchange_text.bind(this);
        this.change_status = this.change_status.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.download_resume = this.download_resume.bind(this)
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
                this.setState({ candidates: data['all_candidates'] })
            });
    }

    async show_detail(id) {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('id', this.state.candidates[id].id);
        this.setState({ candidate: this.state.candidates[id] });
        let response = await fetch('http://localhost:8000/show_detail/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        });
        await response.json().then(data => {
            this.setState({
                educations: data['educations'], experiences: data['experiences'], links: data['links']
            });
        });
        this.togglePopup()
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
        });
    };

    async change_status(ans) {
        var csrftoken = this.getCookie('csrftoken');
        let formdata = new FormData();
        formdata.append('id', this.state.candidate.id);
        formdata.append('status', ans);
        await fetch('http://localhost:8000/change_status/', {
            method: 'POST',
            body: formdata,
            headers: {
                'X-CSRFToken': csrftoken,
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    }

    download_resume() {
        const link = document.createElement('a');
        link.href = `http://localhost:8000/media/${this.state.candidate.resume}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    render() {
        return (
            <div>
                {this.state.showPopup ? <div>
                    <div id='detail_first_section'>
                        <div>
                            <img className='detail_pic' src={`http://localhost:8000/media/${this.state.candidate.pic}`} />
                        </div>
                        <div id='detail_candidate'>
                            <h1>
                                {this.state.candidate.first_name}
                            </h1>
                            <p>&nbsp;</p>
                            <h5>
                                {this.state.candidate.last_name}
                            </h5>
                            <h5>
                                {this.state.candidate.email}
                            </h5>
                            <h5>
                                {this.state.candidate.contact}
                            </h5>
                            <h5>
                                {this.state.candidate.status}
                            </h5>
                        </div>
                    </div>
                    <div id='detail_second_section'>
                        <div>
                            <h1>
                                Experiences
                            </h1>
                        </div>
                        <div>
                            {this.state.experiences.map((experience, i) => (
                                <ul style={{ marginTop: "2%" }} key={experience.id}>
                                    <li style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>{i + 1}. : </h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Role : {experience.role}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Start Year : {experience.start_year}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Last Year : {experience.end_year}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Institution : {experience.institution}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}> Type : {experience.type}</h5>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div id='detail_third_section'>
                        <div>
                            <h1>
                                Educations
                            </h1>
                        </div>
                        <div>
                            {this.state.educations.map((education, i) => (
                                <ul style={{ marginTop: "2%" }} key={education.id}>
                                    <li style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>{i + 1}. : </h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Title : {education.title}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Start Year : {education.start_year}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Last Year : {education.end_year}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Institution : {education.institution}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}> Grade : {education.grade}</h5>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div id='detail_fourth_section'>
                        <div>
                            <h1>
                                Links
                            </h1>
                        </div>
                        <div>
                            {this.state.links.map((link, i) => (
                                <ul style={{ marginTop: "2%" }} key={link.id}>
                                    <li style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>{i + 1}. : </h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>Title : {link.title}</h5>
                                        <h5 style={{ marginLeft: "2%", marginRight: "2%" }}>URL : {link.url}</h5>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                    <div style={{marginLeft:"7%" , marginBottom:"2%"}}>
                        <button onClick={this.togglePopup} className='button-27'>Close</button>
                        <a href={`http://localhost:8000/media/${this.state.candidate.resume}`} target='_blank' rel='noopener noreferrer'><button className='button-27'>Resume</button></a>
                        {this.state.candidate.status == "applied" || this.state.candidate.status == "accept" ? <button onClick={() => this.change_status('reject')} className='button-27'>Reject</button> : null}
                        {this.state.candidate.status == "applied" || this.state.candidate.status == "reject" ? <button onClick={() => this.change_status('accept')} className='button-27'>Accept</button> : null}
                    </div>
                </div> : <div className='grid_container_2_explore'>
                    {
                        this.state.candidates.map((candidate, i) => (
                            <div key={i} className="card_2_explore">
                                <button style={{ height: "100%" }} onClick={() => this.show_detail(i)} id="close">
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