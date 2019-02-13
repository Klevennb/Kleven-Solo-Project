import React, {Component} from 'react';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            start: 0,
            isOn: false
        }
    }
    startTimer = () => {
        
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => this.setState({
            //const action = {type: 'SET_TIME', payload:} This can't be here, but this is roughly where I should dispatch
            time: Date.now() - this.state.start
        }), 1);
    }
    stopTimer = () => {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }
    resetTimer = () => {
        this.setState({ time: 0 })
    }
    // sendTime =()=> {
    //     const timeToSend = this.state.time;
    //     this.props.onSaveClick(timeToSend);
    //     console.log('in sendTime');
        
    // }
    render() {
        let start = (this.state.time === 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.isOn) ?
            <button onClick={this.stopTimer}>Pause</button> :
            null
        // let reset = (this.state.time !== 0 && !this.state.isOn) ?
        //     <button onClick={this.resetTimer}>reset</button> :
        //     null
        let resume = (this.state.time !== 0 && !this.state.isOn) ?
            <button onClick={this.startTimer}>resume</button> :
            null
        let currentTime = this.state.time/1000; //to make it look like seconds rather than millisecs
        return (
            <div>
                <h3>timer: {currentTime}</h3>
                {start}
                {resume}
                {stop}
                {/* {reset} */}
            </div>
        )
    }
}
export default Timer;