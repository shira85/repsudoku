import React, { Component } from 'react';
import Login from './Login.js'
import { Link } from 'react-router-dom';


export default class HomePage extends Component {

    render() {
        return (
            <div className='container' style={{ backgroundColor: 'black', width: '100%', height: '700px' }}>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <div style={{ color: 'white', textAlign: 'center' }}>
                            <br /><br />
                            <img style={{ width: '70%', height: '80%' }} src={`${require(`../pictures/welcome.gif`)}`}></img>
                            <br />
                            <br />
                        </div>
                    </div>
                    <div style={{ width: "100%", top: '10%' }}>
                        <div><Login users={this.props.users} /></div>
                        <br />
                        <Link to='/signup'><button id='moveSignup' style={{ width: '30%' }}>sign up</button></Link>
                    </div>

                    <div className='col-3'></div>
                </div>
            </div>

        )
    }
}
