import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            errorMsg: ''
        }
    }

    //בדיקת תקינות של יוזר והאם פנוי
    validUser = (e) => {
        let char = e.target.value.slice(e.target.value.length - 1, e.target.value.length);
        //שמירת אינדקס התו האחרון שהוקלד
        let index = e.target.value.indexOf(char);
        let user = this.props.users.filter((element => element.name === e.target.value));
        // אם בשם המשתמש הוכנסה ספרה
        if ((char > '0' && char < '9')) {
            e.target.value = (e.target.value.slice(0, index));
        }

        //אם היוזר קיים במערכת
        if (user.length > 0) {
            this.setState({ errorMsg: 'Username not available' });
            //מעדכנים את היוזר בסטייט שלא ישאר ערך מלא
            this.setState({ userName: '' });
        }
        else if (e.target.value.length < 5) {
            this.setState({ errorMsg: 'Username must be 5-8 letters' });
            //כפתור התחברות הופך לפעיל רק כאשר היוזר פנוי
            this.setState({ userName: '' });
        }
        else {
            this.setState({ errorMsg: '' });
            this.setState({ userName: e.target.value });
        }
    }

    // בדיקת תקינות של סיסמה
    validPassword = (e) => {
        if (e.target.value.length < 5) {
            this.setState({ errorMsg: 'password must be 5-8 characters' });
            //כפתור התחברות הופך לפעיל רק כאשר היוזר פנוי
            this.setState({ password: '' });
        }
        else {
            this.setState({ errorMsg: '' });
            this.setState({ password: e.target.value });

        }
    }

    validConfirmPassword = (e) => {
        if (e.target.value !== this.state.password) {
            this.setState({ errorMsg: 'the confirm password must accord with the password' });
            this.setState({ confirmPassword: '' })
        }
        else {
            this.setState({ errorMsg: '' });
            this.setState({ confirmPassword: e.target.value })

        }
    }

    //פונקציה להוספת יוזר חדש
    addUser = () => {
        this.props.add(this.state.userName, this.state.password);
        let body = { name: this.state.userName, password: this.state.password, games: [] }
        fetch('/api/users', {
            method: "POST", body: JSON.stringify(body), headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                // todo
                console.log(data);
            })
    }

    render() {
        return (
            <div className='container' style={{ backgroundColor: 'black', width: '100%', height: '700px', textAlign: 'center' }}>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <div>
                            <br />
                            <img style={{ width: '70%', height: '80%' }} src={`${require(`../pictures/welcome.gif`)}`}></img>
                            <br /><br />
                            <input onChange={this.validUser} style={{ width: '100%', height: '40px', backgroundColor: 'Gainsboro', borderRadius: '10px' }} maxLength='8' type='text' placeholder='Enter User Name' />
                            <br /><br />
                            <input onChange={this.validPassword} style={{ width: '100%', height: '40px', backgroundColor: 'Gainsboro', borderRadius: '10px' }} maxLength='8' type='password' placeholder='Enter Password' />
                            <br /><br />
                            <input onChange={this.validConfirmPassword} style={{ width: '100%', height: '40px', backgroundColor: 'Gainsboro', borderRadius: '10px' }} maxLength='8' type='password' placeholder='Confirm Password' />
                            <br /><br />
                            <p style={{ color: 'red' }}>{this.state.errorMsg}</p><br />
                            <Link to='/'><button id='btnSignUp' onClick={this.addUser} disabled={!(this.state.password && this.state.confirmPassword && this.state.userName) ? 'disabled' : ''} >Sign Up</button></Link>

                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        )
    }
}
