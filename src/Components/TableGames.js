import React, { Component } from 'react'

export default class TableGames extends Component {
    constructor(props) {
        super(props);


        let users = this.props.users.map(user => {
            let bestGame = user.games.reduce((min, game) => game.time < min ? game.time : min, 1000000);
            return {
                ...user,
                bestGame,
            }
        });

        console.log(users);

        this.state = {
            top5: [...users].sort((a, b) => a.bestGame - b.bestGame).slice(0, 5),
            winner: [...this.props.users].sort((a, b) => a.minTime - b.minTime).slice(0, 4).filter((e, i) => (i === 0)),
        }
    }
    componentDidMount() {
        this.setState({ sortUsers: [...this.props.users].sort((a, b) => a.minTime - b.mintime) })
    }
    render() {

        return (
            <div className='container' style={{ backgroundColor: 'white', height: '200px', overflowY: 'scroll', border: 'black solid 5px', top: '100%' }}>
                <br />
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6' style={{ color: 'gold' }}>

                        <table id='tbl' style={{ border: 'solid', borderCollapse: 'collapse' }}>
                            <th style={{ border: 'solid' }}>USER</th>
                            <th style={{ border: 'solid' }}>TIME</th>
                            {this.state.top5.map((e, i) => {
                                let best = this.state.top5[0].bestGame;
                                let imgSrc = best == e.bestGame ? '/pictures/winner1.jpg' : '/pictures/winner2.jpg';
                                return (<tr style={{ border: 'solid' }}>
                                    <td >{e.name}</td>
                                    <td >{e.bestGame}</td>
                                    <td ><img style={{ marginLeft: '40%' }} src={imgSrc} /></td>
                                </tr>)
                            }
                            )}
                        </table>
                    </div>
                    <div className='col-3'></div>
                </div>
            </div>
        )
    }

}
