import React, { Component } from 'react'
import TimerAudio from './TimerAudio.js';
import { Link } from 'react-router-dom';

export default class Sudoku extends Component {
    constructor(props) {
        super(props)

        this.state =
        {
            sudoku: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
            ],
            newSudoku: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
            ],
            // לוח שעליו נבצע את כל השינויים- נכניס פתרונות, הלוח השני למקרה שנרצה להתחיל משחק מהתחלה
            tempSudoku: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
            ],

           
            disabled: [
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
                ['', '', '', '', '', '', '', '', ''],
            ],

            //   backgroundColor:this.props.backgroundColor, //default
            listColor: [{ background: 'bisque', board1: 'seashell', board2: 'gainsboro' },
            { background: 'lavender', board1: 'silver', board2: 'whitesmoke' },
            { background: 'LightCyan', board1: 'floralwhite', board2: 'aliceblue' },
            { background: 'Gainsboro', board1: 'ghostwhite', board2: 'lavender' }
            ],

            //הכפתור לאתחול משחק יהיה פעיל רק אם התחלנו לשחק
            reset: false,
            // כפתור לסיום משחק יהיה פעיל רק אם הלוח מלא
            finish: false,
            hint: false,
            startNewGame: true,
            //מערך שיכיל את הקואורדינטות של הרמזים למקרה שהמשתמש ירצה להתחיל לשחק מחדש
            listHints: [],
            // הגבלת רמזים לפי דרגת קושי
            countHints: 0,
            count: '',
            timer: false,
            haveGames: false,
            numOfHints: 0,

        }

    }
    //בדיקת תקינות הזנת מספרים ללוח
    validInput = (e) => {
        //לא ניתן להקליד 0
        if (e.target.value === '0') {
            e.target.value = (e.target.value.slice(0, 0));
        }
        //מספר חד ספרתי
        if (e.target.value.length > 1) {
            e.target.value = (e.target.value.slice(0, 0));
        }
        else {

            document.getElementById(`${e.target.id}`).value = e.target.value;
            document.getElementById(`${e.target.id}`).style.color = "blue";
            // הערך מהלוח נכנס לסודוקו הזמני
            this.state.tempSudoku[e.target.id.charAt(1)][e.target.id.charAt(2)] = parseInt(e.target.value);

            //כפתורים יהיו פעילים רק כאשר נתחיל משחק
            this.setState({ reset: true })
        }
    }
    selectLevel = (e) => {
        this.clearBoard();
        this.buildSudoku();
        let level, rndRow, rndCol;
        if (e.target.value === "hard") {
            level = 0.25;
            this.setState({ countHints: 10, numOfHints: 10 })
        }
        else if (e.target.value === "medium") {
            level = 0.5;
            this.setState({ countHints: 5, numOfHints: 5 })
        }
        else {
            level = 0.75;
            this.setState({ countHints: 2, numOfHints: 2 })
            //level=0.98
        }
        for (let i = 0; i < Math.pow(this.state.newSudoku.length, 2) * level; i++) {
            rndRow = Math.floor(Math.random() * (this.state.newSudoku.length));
            rndCol = Math.floor(Math.random() * (this.state.newSudoku.length));
            if (this.state.newSudoku[rndRow][rndCol] === '') {
                this.state.newSudoku[rndRow][rndCol] = this.state.sudoku[rndRow][rndCol];

            }
            else {
                //* if cell not empty, repeat loop from previous i
                i--;
            }
        }
        this.setState({ newSudoku: [...this.state.newSudoku] })
        // כפתור לסיום משחק יהיה פעיל
        this.setState({ finish: true });
        this.setState({ hint: true });
        this.setState({ startNewGame: false });
        this.disabledFunc();
        this.setState({ timer: true })
    }

    start = (count) => {
        this.setState({ count: count })
    }
    showTimer = () => {
        if (this.state.timer) {
            return (
                <TimerAudio add={this.start} />
            )
        }
    }
    // הפונקציה מקבלת אינדקסים ומחזירה מערך שרק ממנו ניתן להגריל מספרים
    arrayForRandomNum = (indexI, indexJ) => {
        let nums = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let startI, startJ;
        var arrNums = [], arrRandom = [];
        if (this.state.sudoku[indexI][indexJ] === '') {
            if (indexI >= 0 && indexI < 3 && indexJ >= 0 && indexJ < 3) {
                startI = 0;
                startJ = 0;
            }
            else if (indexI >= 0 && indexI < 3 && indexJ >= 3 && indexJ < 6) {
                startI = 0;
                startJ = 3;
            }
            else if (indexI >= 0 && indexI < 3 && indexJ >= 6 && indexJ < 9) {
                startI = 0;
                startJ = 6;
            }
            else if (indexI >= 3 && indexI < 6 && indexJ >= 0 && indexJ < 3) {
                startI = 3;
                startJ = 0;
            }

            else if (indexI >= 3 && indexI < 6 && indexJ >= 3 && indexJ < 6) {
                startI = 3;
                startJ = 3;
            }

            else if (indexI >= 3 && indexI < 6 && indexJ >= 6 && indexJ < 9) {
                startI = 3;
                startJ = 6;
            }

            else if (indexI >= 6 && indexI < 9 && indexJ >= 0 && indexJ < 3) {
                startI = 6;
                startJ = 0;
            }

            else if (indexI >= 6 && indexI < 9 && indexJ >= 3 && indexJ < 6) {
                startI = 6;
                startJ = 3;
            }

            else {
                startI = 6;
                startJ = 6;
            }
        }

        // בדיקה אילו מספרים ניתן להגריל לתת מטריצה
        for (let i = startI; i < startI + 3; i++) {
            for (let j = startJ; j < startJ + 3; j++) {
                if (this.state.sudoku[i][j] !== '')
                    arrNums.push(this.state.sudoku[i][j]);
            }
        }

        //בדיקה אילו מספרים ניתן להגריל לעמודה ושורה
        for (let i = 0; i < this.state.sudoku.length; i++) {
            if (this.state.sudoku[i][indexJ] !== '')
                arrNums.push(this.state.sudoku[i][indexJ]);
            if (this.state.sudoku[indexI][i] !== '')
                arrNums.push(this.state.sudoku[indexI][i]);
        }

        for (let i = 0; i < arrNums.length; i++) {
            nums[arrNums[i] - 1] = arrNums[i];
        }
        //מערך שמכיל את המספרים האפשריים עבור התא בסודוקו
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === 0) {
                arrRandom.push(i + 1)
            }
        }
        return arrRandom;
    }
    //לפני משחק חדש צריך "לנקות את כל המערכים"
    clearMatrix = () => {
        //debugger
        for (let i = 0; i < 9; i++) {
            this.state.sudoku[i] = ['', '', '', '', '', '', '', '', ''];
            this.state.newSudoku[i] = ['', '', '', '', '', '', '', '', ''];
            this.state.tempSudoku[i] = ['', '', '', '', '', '', '', '', ''];
            this.state.disabled[i] = ['', '', '', '', '', '', '', '', ''];
           // this.state.tempMatForSubMat[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
           // this.state.tempMatForRows[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            //this.state.tempMatForCols[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        this.setState({ sudoku: [this.state.sudoku] })
    }
   /* buildSudoku = () => {
        this.clearMatrix();
        for (let i = 0; i < this.state.sudoku.length; i++) {
            let nums = [];
            var listOfCols = [];
            var listOfRows = [];
            var listOfSub = [];
            let randomNumber;
            var subMatrixIndex;
            let randomIndex;
            for (let j = 0; j < this.state.sudoku[i].length; j++) {
                console.log(i, j);
                // אינדקס רנדומלי מתוך המערך
                nums = this.arrayForRandomNum(i, j);
                randomIndex = Math.floor(Math.random() * nums.length);
                randomNumber = nums[randomIndex];

                if (i >= 0 && i < 3 && j >= 0 && j < 3) {
                    subMatrixIndex = 0;
                }
                else if (i >= 0 && i < 3 && j >= 3 && j < 6) {
                    subMatrixIndex = 1;
                }
                else if (i >= 0 && i < 3 && j >= 6 && j < 9) {
                    subMatrixIndex = 2;
                }
                else if (i >= 3 && i < 6 && j >= 0 && j < 3) {
                    subMatrixIndex = 3;
                }
                else if (i >= 3 && i < 6 && j >= 3 && j < 6) {
                    subMatrixIndex = 4;
                }
                else if (i >= 3 && i < 6 && j >= 6 && j < 9) {
                    subMatrixIndex = 5;
                }
                else if (i >= 6 && i < 9 && j >= 0 && j < 3) {
                    subMatrixIndex = 6;
                }
                else if (i >= 6 && i < 9 && j >= 3 && j < 6) {
                    subMatrixIndex = 7;
                }
                else if (i >= 6 && i < 9 && j >= 6 && j < 9) {
                    subMatrixIndex = 8;
                }


                if (this.state.tempMatForRows[i][randomNumber - 1] === 0 &&
                    this.state.tempMatForCols[j][randomNumber - 1] === 0 &&
                    this.state.tempMatForSubMat[subMatrixIndex][randomNumber - 1] === 0 &&
                    this.state.sudoku[i][j] === '') {

                    //* The location of the random number in the sudoku matrix
                    this.state.sudoku[i][j] = randomNumber;

                    this.state.tempMatForRows[i][randomNumber - 1] = 1;
                    listOfRows.push({ x: i, y: randomNumber - 1 });

                    //* Changing the value in the auxiliary col-matrix
                    this.state.tempMatForCols[j][randomNumber - 1] = 1;
                    listOfCols.push({ x: j, y: randomNumber - 1 });


                    //* Changing the value in the auxiliary sub-matrix
                    this.state.tempMatForSubMat[subMatrixIndex][randomNumber - 1] = 1;
                    listOfSub.push({ x: subMatrixIndex, y: randomNumber - 1 });

                }
                else {
                    //*Clearing the sudoku in the [i] row in the auxiliary row-matrix
                    this.state.sudoku[i] = ['', '', '', '', '', '', '', '', ''];

                    //* Creating a loop for assembling assiting-arrays for clearing the auxiliary col and sub matrix
                    //* x is a varriable asisting in getting the coordinates of the numbers to be removed form tempMatForCols and tempMatForSubMat

                    for (let x = 0; x < listOfCols.length; x++) {
                        this.state.tempMatForRows[listOfRows[x].x][listOfRows[x].y] = 0;
                        this.state.tempMatForCols[listOfCols[x].x][listOfCols[x].y] = 0;
                        this.state.tempMatForSubMat[listOfSub[x].x][listOfSub[x].y] = 0;
                    }
                    if (i > 0) {
                        i = i - 1;
                        break;
                    }
                    break;
                }

            }
            this.setState({ sudoku: [...this.state.sudoku] });

        }
    }*/

    buildSudoku = () => {
        this.clearMatrix();
        let nums=[];
        let randomNumber;
        let randomIndex;
        for (let i = 0; i < this.state.sudoku.length; i++) {
            for (let j = 0; j < this.state.sudoku[i].length; j++) {
        
                // אינדקס רנדומלי מתוך המערך
                nums = this.arrayForRandomNum(i, j);
                randomIndex = Math.floor(Math.random() * nums.length);
                randomNumber = nums[randomIndex];

                if(randomNumber===undefined){
                   this.state.sudoku[i]=['','','','','','','','',''];
                    i--;
                    break;
                }

                this.state.sudoku[i][j] = randomNumber;
                }
            }
            this.setState({ sudoku: [...this.state.sudoku] });
    }
    disabledFunc = () => {
        for (let i = 0; i < this.state.tempSudoku.length; i++) {
            for (let j = 0; j < this.state.tempSudoku.length; j++) {
                if (this.state.newSudoku[i][j] !== '') {
                    this.state.disabled[i][j] = true;
                }
                else {
                    this.state.disabled[i][j] = false;
                }
            }
        }
    }
    //פןנקציה "מנקה" את הממשק
    clearBoard = () => {
        for (let i = 0; i < this.state.tempSudoku.length; i++) {
            for (let j = 0; j < this.state.tempSudoku.length; j++) {
                document.getElementById(`t${i}${j}`).value = '';
            }
        }
    }
    resetGame = () => {
        this.setState({ reset: false })
        for (let i = 0; i < this.state.tempSudoku.length; i++) {
            for (let j = 0; j < this.state.tempSudoku.length; j++) {
                if (this.state.tempSudoku[i][j] !== '') {
                    this.state.tempSudoku[i][j] = '';
                    document.getElementById(`t${i}${j}`).value = '';
                }
            }
        }
        for (let i = 0; i < this.state.listHints.length; i++) {
            document.getElementById(`t${this.state.listHints[i].row}${this.state.listHints[i].col}`).disabled = false;
        }
        this.setState({ hint: true });
        // מספר הרמזים חוזר להיות לפי בחירת הרמה
        this.setState({ numOfHints: this.state.countHints })
    }
    finishGame = () => {

        let checkGame = [[], [], [], [], [], [], [], [], []];
        let success = true;
        for (let i = 0; i < this.state.sudoku.length; i++) {
            for (let j = 0; j < this.state.sudoku[i].length; j++) {
                if (this.state.newSudoku[i][j] === '') {
                    checkGame[i][j] = this.state.tempSudoku[i][j];
                }
                else {
                    checkGame[i][j] = this.state.newSudoku[i][j];
                }
            }
        }
        for (let i = 0; i < this.state.sudoku.length; i++) {
            for (let j = 0; j < this.state.sudoku.length; j++) {
                if (this.state.sudoku[i][j] === '') {
                    success = false;
                }
            }
        }

        for (let i = 0; i < this.state.sudoku.length; i++) {
            for (let j = 0; j < this.state.sudoku.length; j++) {
                if (this.state.sudoku[i][j] !== checkGame[i][j]) {
                    success = false;
                }
            }
        }
        // רק כשאר סיימנו לשחק אפשר לבחור משחק חדש
        this.setState({ startNewGame: false })
        this.setState({ timer: false })
        if (success) {
            alert('Good');
            //  אם ניצח את המשחק התוצאה נשמרת במאגר המשחקים של המשתמש
            this.props.addGame(this.props.index, success, this.state.count/*, this.state.sudoku*/)
        }
        else {
            alert('Try again');
            this.props.addGame(this.props.index, success, 1000000/*, this.state.sudoku*/)
        }

    }
    //שינוי צבע רקע
    selectBackgroundColor = (e) => {
        this.props.changeBackgroundColor(e.target.value, this.state.listColor[e.target.id].board1, this.state.listColor[e.target.id].board2)
    }
    //קבלת רמז
    getHint = () => {
        let rndRow = Math.floor(Math.random() * (this.state.newSudoku.length));
        let rndCol = Math.floor(Math.random() * (this.state.newSudoku.length));

        //* if the cell containes a valvue, repeat function getHint()
        if (document.getElementById(`t${rndRow}${rndCol}`).value !== '') {
            this.getHint();
        }
        else {
            this.state.listHints.push({ row: rndRow, col: rndCol })
            //* if cell is empty, fill html field with number, disable cell, and make font color red
            this.state.tempSudoku[rndRow][rndCol] = this.state.sudoku[rndRow][rndCol];
            document.getElementById(`t${rndRow}${rndCol}`).value = this.state.sudoku[rndRow][rndCol];
            document.getElementById(`t${rndRow}${rndCol}`).disabled = true;
            document.getElementById(`t${rndRow}${rndCol}`).style.color = "red";
        }
        this.setState({ numOfHints: this.state.numOfHints - 1 })
        //this.setState({numOfHints:'you have '+this.state.countHint+' hints'})
        if (this.state.numOfHints === 1) {
            this.setState({ hint: false })
        }

    }


    render() {
        return (
            <div className='container' style={{ backgroundColor: this.props.backgroundColor }}>
                <div className='row'>
                    <div className='col-1'>
                        {this.showTimer()}
                    </div>

                    <div className='col-9'>
                        <img style={{ width: '50%', marginLeft: '30%', marginBottom: '20px' }} src={`${require(`../pictures/title2.png`)}`}></img>
                        <div id='divDifficulty' >
                            <button className='btnDifficulty' onClick={this.selectLevel} value='easy' style={{ backgroundColor: 'red' }} disabled={!this.state.startNewGame}>easy</button>
                            <button className='btnDifficulty' onClick={this.selectLevel} value='medium' style={{ backgroundColor: 'green' }} disabled={!this.state.startNewGame}>medium</button>
                            <button className='btnDifficulty' onClick={this.selectLevel} value='hard' style={{ backgroundColor: 'blue' }} disabled={!this.state.startNewGame}>hard</button>
                        </div>

                        <table id='tblBoard' >
                            {this.state.newSudoku.map((e, i) => {
                                return (
                                    <tr>
                                        {this.state.newSudoku[i].map((e, j) => {
                                            if ((i >= 0 && i < 3 && j >= 0 && j < 3) || (i >= 0 && i < 3 && j >= 6 && j < 9) || (i >= 3 && i < 6 && j >= 3 && j < 6) || (i >= 6 && i < 9 && j >= 0 && j < 3) || (i >= 6 && i < 9 && j >= 6 && j < 9))
                                                return (
                                                    <td><input style={{ backgroundColor: this.props.board1 }} onInput={this.validInput} disabled={this.state.disabled[i][j]} className='inptNumber' type="number" value={this.state.newSudoku[i][j] !== '' ? this.state.newSudoku[i][j] : null} id={`t${i}${j}`} /></td>
                                                )
                                            else
                                                return (
                                                    <td><input style={{ backgroundColor: this.props.board2 }} onInput={this.validInput} disabled={this.state.disabled[i][j]} className='inptNumber' type="number" value={this.state.newSudoku[i][j] !== '' ? this.state.newSudoku[i][j] : null} id={`t${i}${j}`} /></td>
                                                )
                                        })}
                                    </tr>)
                            })}
                        </table>
                        <div >
                            <br />
                            <button className='btnRestartFinishHint' onClick={this.resetGame} disabled={!this.state.reset} style={{ backgroundColor: 'yellow' }}>Reset</button>
                            <button className='btnRestartFinishHint' onClick={this.finishGame} disabled={!this.state.finish} style={{ backgroundColor: 'yellow' }}>End</button>
                            <button className='btnRestartFinishHint' onClick={this.getHint} disabled={!this.state.hint} style={{ backgroundColor: 'yellow' }}>Hint</button>
                        </div>
                        <br />
                    </div>
                    <div style={{ backgroundColor: 'black' }} className='col-2'>
                        <br />
                        {this.state.listColor.map((e, i) => <button className='changeView' id={i} value={e.background} onClick={this.selectBackgroundColor} style={{ backgroundColor: e.background }}></button>)}
                        <Link to={`/${this.props.users[this.props.index].name}/games`}><button id='btnMygames' onClick={this.showGames} disabled={this.props.users[this.props.index].games.length === 0}>my games</button></Link>
                        <Link to='/'><button id='btnChangeUser'>Change User</button></Link>
                        <Link to='/funsudoku'><button id='btnKids'>kids</button></Link>

                    </div>


                </div>
            </div>
        )
    }
}
