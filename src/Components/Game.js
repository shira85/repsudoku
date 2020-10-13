import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Game extends Component {
    constructor(props) {
        super(props);
        let users = this.props.users[this.props.index].games.sort((a, b) => a.time - b.time);
        console.log(users);

    }

    render() {
        return (
            <div className='container' style={{ backgroundColor: 'black' }}>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6'>

                        {this.props.users[this.props.index].games.map((element, i) => {
                            return (
                                <table className='tdMyGames' style={{ color: 'gold', width: '100%' }}>
                                    <tr >
                                        <td className='tdMyGames'>{element.win === true ? 'win' : 'lose'}</td>
                                        <td className='tdMyGames'>{element.time === 1000000 ? '--' : element.time} </td>
                                        <td className='tdMyGames'><img src={i === 0 ? require('../pictures/star.gif') : ''}></img>
                                        </td>
                                    </tr>


                                </table>
                            )

                        })}
                        <br />
                        <Link to={`/welcome/${this.props.users[this.props.index].name}`}>
                            <button id="btnBack" style={{ width: '50%' }}>Back</button></Link>
                    </div>
                    <div className='col-3'>
                    </div>
                </div>
            </div>

        )
    }
}
