import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: '',
            errorMsg: '',
            movePage: '/'
        }
    }

    //בדיקת תקינות של יוזר והאם פנוי
    validUser = (e) => {
        this.setState({ userName: e.target.value })
    }

    // בדיקת תקינות של סיסמה
    validPassword = (e) => {
        this.setState({ password: e.target.value });
        let user = this.props.users.filter((element => element.name === this.state.userName && element.password === e.target.value));
        if (user.length === 0) {
            //אם היוזר אינו קיים במערכת, נשארים באותו עמוד
            this.setState({ movePage: '/' });
            this.setState({  errorMsg: '' })
        }
        else {
            this.setState({ movePage: `/welcome/${this.state.userName}` })
           // this.setState({ movePage: `/choose` })
        }

    }

    //בדיקה אם משתמש קיים במערכת
    checkUser = (e) => {
        if (this.state.movePage === '/') {
            this.setState({ errorMsg: 'user name or password is incorrect' });
        }
    }
    /**
     * 
     * <Link to={this.state.movePage}><button  className="btn btn-light" onClick={this.checkUser} style={{ width:'100%', height:'40px', backgroundColor:'Gainsboro',borderRadius:'10px',fontSize:'18px',fontWeight:'bold' }}>Login</button></Link>

     */

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>
                        <div >
                            <p style={{ color: 'red', fontSize:'20px'}}>{this.state.errorMsg}</p>
                            <input onChange={this.validUser} style={{width:'100%', height:'40px', backgroundColor:'Gainsboro',borderRadius:'10px'}} maxLength='10' type='text' placeholder='Enter User Name' />
                            <br /><br />
                            <input onChange={this.validPassword} style={{ width:'100%', height:'40px', backgroundColor:'Gainsboro',borderRadius:'10px' }} maxLength='10' type='password' placeholder='Enter Password' />
                            <br /><br/><br/>
                            <Link to={this.state.movePage}><button id='btnLogin' onClick={this.checkUser} >Login</button></Link>

                            <br/>
                        </div>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        )
    }
}
