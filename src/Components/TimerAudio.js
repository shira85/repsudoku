import React, { Component } from 'react'

export default class TimerAudio extends Component {
    constructor(props) {
        super(props)

        this.state = {
            count: 1,//this.props.count,
            hour: 0,
            minuts: 0,
            second: 0,
            play: false,

        }

    }
    playMusic = () => {
        let myMusic = document.getElementById('music');
        myMusic.play();
        this.setState({ play: false })
    }
    pouseMusic = () => {
        let myMusic = document.getElementById('music');
        myMusic.pause();
        this.setState({ play: true })
    }

    render() {

        return (
            <div>
                <h2 style={{ color: 'white' }}>Time: {Math.floor(this.state.count / 60)}:{Math.floor(this.state.count % 60)}</h2>
                <audio id='music'>
                    <source src={`${require(`../pictures/sound.mp3`)}`} type='audio/mpeg' />
                </audio>
                <button className='btnAudio' onClick={this.pouseMusic} disabled={this.state.play}>mute</button>
                <button className='btnAudio' onClick={this.playMusic} disabled={!this.state.play}>unMute</button>

            </div>
        )
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            this.setState({
                count: this.state.count + 1,
            })
            this.props.add(this.state.count)
        }, 1000)
        var myMusic = document.getElementById('music');
        myMusic.play();
    }

}
