import React from 'react';
import '../styles/Navigation.css';

class Navigation extends React.Component {
    render() {
        return (
            <div id='nav_complete'>
                <div id='nav_title'>
                    <a id='home_link' href='/'>System</a>
                    <a id='add_candidate' href='/candidates'>Add</a>
                </div>
            </div>
        )
    }
}

export default Navigation;