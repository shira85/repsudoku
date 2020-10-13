import React, { Component } from 'react'
import TimerAudio from './TimerAudio.js';
import { Link } from 'react-router-dom';

export default class Kids extends Component {
    constructor(props) {
        super(props)

        this.state = {
            sudoku: [[
                [1, 2, 3, 4],
                [3, 4, 1, 2],
                [2, 1, 4, 3],
                [4, 3, 2, 1]],
            [
                [2, 3, 4, 1],
                [4, 1, 3, 2],
                [3, 2, 1, 4],
                [1, 4, 2, 3]],
            [
                [2, 3, 1, 4],
                [1, 4, 3, 2],
                [4, 1, 2, 3],
                [3, 2, 4, 1]],
            [
                [4, 3, 2, 1],
                [2, 1, 4, 3],
                [3, 4, 1, 2],
                [1, 2, 3, 4]],
            [
                [2, 3, 4, 1],
                [1, 4, 3, 2],
                [3, 2, 1, 4],
                [4, 1, 2, 3]
            ]

            ],
            myGame: [[], [], [], []],
            tempGame: [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
            winGame: true,
            //כדי שהתמונה תופיע רק לאחר משחק
            endGame: false,
            disabledBtnEnd: true,
            timer: false,
        }
    }
    showTimer = () => {
        if (this.state.timer) {
            return (
                <TimerAudio add={this.start} />
            )
        }
    }
    start = (count) => {
        this.setState({ count: count })
    }
    createSudoku = () => {
        // 0--4
        { this.clearMatrix() }
        this.setState({ disabledBtnEnd: false })
        let rndRow, rndCol
        let chooseTable = Math.floor(Math.random() * 5);
        let randMatrix = this.state.sudoku[chooseTable];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.state.myGame[i][j] = randMatrix[i][j];
            }
        }
        this.setState({ myGame: [...this.state.myGame] });

        for (let i = 0; i < 8; i++) {
            rndRow = Math.floor(Math.random() * (this.state.myGame.length));
            rndCol = Math.floor(Math.random() * (this.state.myGame.length));
            if (this.state.tempGame[rndRow][rndCol] === '') {
                this.state.tempGame[rndRow][rndCol] = this.state.myGame[rndRow][rndCol];
                document.getElementById(`t${rndRow}${rndCol}`).disabled = true;

            }
            else {
                //* if cell not empty, repeat loop from previous i
                i--;
            }
        }
        this.setState({ tempGame: [...this.state.tempGame] })
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                document.getElementById(`t${i}${j}`).value = this.state.tempGame[i][j];

            }
        }
        this.setState({ timer: true });
    }
    validInput = (e) => {
        if (e.target.value === '0' || (e.target.value > 4 && e.target.value <= 9)) {
            e.target.value = (e.target.value.slice(0, 0));
        }
        if (e.target.value.length > 1) {
            e.target.value = (e.target.value.slice(0, 0));
        }
        else {

            document.getElementById(`${e.target.id}`).value = e.target.value;
            document.getElementById(`${e.target.id}`).style.color = "blue";
            // הערך מהלוח נכנס לסודוקו הזמני
            this.state.tempGame[e.target.id.charAt(1)][e.target.id.charAt(2)] = parseInt(e.target.value);
        }
    }
    endGame = () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.state.myGame[i][j] !== this.state.tempGame[i][j]) {
                    this.setState({ winGame: false });
                }
            }
        }
        this.setState({ endGame: true })
        this.setState({ timer: false });


    }
    clearMatrix = () => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this.state.myGame[i][j] = '';
                this.state.tempGame[i][j] = '';
                document.getElementById(`t${i}${j}`).disabled = false;
                document.getElementById(`t${i}${j}`).value = '';
            }
        }
        this.setState({ endGame: false })
    }
    showFaild = () => {
        if (this.state.winGame === false && this.state.endGame === true) {
            return (
                <div>
                    <img style={{ width: '70%', marginLeft: '10%' }} src={`${require(`../pictures/crying.gif`)}`}></img>
                </div>
            )
        }
        else if (this.state.endGame === true) {
            return (
                <div>
                    <img style={{ width: '70%', marginLeft: '10%' }} src={`${require(`../pictures/good.gif`)}`}></img>
                </div>
            )

        }
    }
    render() {
        return (
            <div className='container' style={{ backgroundColor: 'black' }}>
                <div className='row'>
                    <div className='col-1' >
                        {this.showTimer()}
                        <Link to='/'><button id='btnBackKids'>HOME</button></Link>
                    </div>

                    <div className='col-10' id='kids' style={{ backgroundImage: `url(${require(`../pictures/background.jpg`)}`, height: '700px' }}>
                        <div id='divBoardKids' >
                            <button id='btnStartKids' onClick={this.createSudoku} >start</button>
                            <button id='btnEndKids' onClick={this.endGame} disabled={this.state.disabledBtnEnd}>end</button>
                            <table>
                                <tr>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t00' style={{ backgroundColor: 'MintCream', color: 'Cyan' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t01' style={{ backgroundColor: 'MintCream' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t02' style={{ color: 'orange' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t03' style={{ color: 'Chartreuse' }} /></td>
                                </tr>
                                <tr>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t10' style={{ backgroundColor: 'MintCream', color: 'Cyan' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t11' style={{ backgroundColor: 'MintCream' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t12' style={{ color: 'Chartreuse' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t13' style={{ color: 'orange' }} /></td>
                                </tr>
                                <tr>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t20' style={{ color: 'orange' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t21' style={{ color: 'Chartreuse' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t22' style={{ backgroundColor: 'MintCream', color: 'Cyan' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t23' style={{ backgroundColor: 'MintCream' }} /></td>
                                </tr>
                                <tr>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t30' style={{ color: 'Chartreuse' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t31' style={{ color: 'orange' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t32' style={{ backgroundColor: 'MintCream', color: 'Cyan' }} /></td>
                                    <td><input onInput={this.validInput} className='inptNumberKids' type="number" id='t33' style={{ backgroundColor: 'MintCream' }} /></td>
                                </tr>
                            </table>
                            <br />
                            <div style={{ width: '50%' }}>
                                {this.showFaild()}

                            </div>

                        </div>

                    </div>
                    <div className='col-1' ></div>
                </div>
            </div>
        )
    }
}
