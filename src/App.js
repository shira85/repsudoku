import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './Components/Signup.js';
import Sudoku from './Components/Sudoku.js';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage.js';
import Game from './Components/Game.js';
import TableGames from './Components/TableGames.js';
import Kids from './Components/Kids.js';

export default class App extends Component {
  state = {
    users: [
      {
        name: "shira",
        password: "111111",
        games: [
          {
            win: true,
            time: 7
          },
          {
            win: true,
            time: 20
          },
          {
            win: true,
            time: 6
          },
          {
            win: true,
            time: 7
          },
          {
            win: true,
            time: 4
          },
          {
            win: true,
            time: 20
          },
          {
            win: true,
            time: 15
          },
          {
            win: false,
            time: 1000000
          }
        ]
      },
      {
        name: "efrat",
        password: "123456",
        games: [
          {
            win: true,
            time: 6
          },
          {
            win: true,
            time: 6
          },
          {
            win: true,
            time: 6
          }
        ]
      },
    ],

    backgroundColor: 'black', //default
    board1: 'ghostwhite',
    board2: 'lightgray',
    count: '',

  }

  // run after first render!!!!
  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        // todo
        console.log(data);
        this.setState({ users: data })
      })
  }


  addUser = (name, password) => {
    this.setState({ users: [...this.state.users, { name, password, games: [] }] });
  }

  addGame = (index, win, time, sudoku) => {
    const user = this.state.users[index];
    //דמכניסים לתוך המערך ורק אח"כ מעדכנים בסט סטייט
    this.state.users[index].games.push({ win, time, sudoku });
    this.setState({ users: [...this.state.users] });
    fetch('/api/users/addGame', {
      method: "POST", body: JSON.stringify({ userName: user.name, game: { win, time, sudoku } }), headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        // todo
        console.log(data);
      })
  }
  //שינוי צבעי תצוגה
  changeBackgroundColor = (backgroundColor, board1, board2) => {
    this.setState({ backgroundColor, board1, board2 })
  }
  updateTime = (count) => {
    this.setState({ count: count })
  }

  render() {
    return (
      <div>
        <div>
        </div>
        <Router>
          <Switch>
            <Route exact path='/' component={() => { return <HomePage style={this.state.style} users={this.state.users} /> }} />
            <Route exact path='/signup' component={() => { return <Signup users={this.state.users} add={this.addUser} /> }} />
            {/**לולאה שרצה על המערך ומחזירה לנו משתמשים שנוכל ליצור מהם ערוצים שונים */
              this.state.users.map((e, i) => {
                return (
                  <Route exact path={`/welcome/${e.name}`} component={() => { return <div><Sudoku index={i} addGame={this.addGame} changeBackgroundColor={this.changeBackgroundColor} backgroundColor={this.state.backgroundColor} board1={this.state.board1} board2={this.state.board2} users={this.state.users} /><TableGames users={this.state.users} /></div> }} />
                )
              })
            }
            {
              this.state.users.map((e, i) => {
                return (
                  <Route exact path={`/${e.name}/games`} component={() => { return <div><Game index={i} users={this.state.users} /></div> }} />
                )
              })
            }
            {/**לולאה שרצה על המערך ומחזירה לנו משתמשים שנוכל ליצור מהם ערוצים שונים */
              this.state.users.map((e, i) => {
                return (
                  <Route exact path={`/funsudoku`} component={() => { return <Kids index={i} /> }} />
                )
              })
            }
          </Switch>
        </Router>
      </div>
    )
  }
}
