import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const minuteSeconds = 60;
const hourSeconds = 3600;
const getTimeMinutes = (time) => time | 0;

const renderTime = (dimension, time) => {
    console.log(time);
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    )
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        }
    }

    componentDidMount() {
        this.setState({ isPlaying: this.props.isPlaying})
        // Begin countdown when task due to start
        this.interval = setInterval(() => {
            let today = new Date()
            if (today.getHours() >= this.props.timeStart)
                this.setState({ isPlaying: true})
        }, 1000);
    }

    componentDidUpdate() {
        // Stop checking for timer start when task has already begun
        if(this.state.isPlaying){
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const duration = this.props.timeEnd - this.props.timeStart
        return (
            <CountdownCircleTimer
                isPlaying={this.props.isPlaying}
                duration={duration}
                colors={[["#238823", 0.33], ["#FFBF00", 0.33], ["#D2222D", 0.33]]}
                onComplete={() => [true, 1000]}
            >
                {({ elapsedTime }) =>
                    renderTime("minutes", getTimeMinutes(duration - elapsedTime))
                }
            </CountdownCircleTimer>
        )
    }
}



class Task extends React.Component {
    render() {
        return (
            <div className="rounded overflow-hidden shadow-lg">
                <div className="full">
                    <Timer
                        isPlaying={false}
                        timeStart={this.props.values.timeStart}
                        timeEnd={this.props.values.timeEnd}
                        length={this.props.values.length}
                    />
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{this.props.values.name}</div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                </div>
            </div>
        )
    }
}

class TaskBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [{
                name: "work",
                timeStart: 8,
                timeEnd: 12,
                length: 10,
            },
            {
                name: "party",
                timeStart: 12,
                timeEnd: 20,
                length: 30,
            },
            {
                name: "after party",
                timeStart: 12,
                timeEnd: 20,
                length: 20,
            },
        ],
        }
    }

    renderTask(task, index) {
        console.log(task)
        console.log(index)
        return (
            <Task key={index} values={task}/>
        )
    }

    render() {
        return (
            <div className="p-10 grid grid-cols-3 gap-5">
                {this.state.tasks.map((task, index) => {
                    return this.renderTask(task, index)
                })}
            </div>
        )
    }
}

export default TaskBoard;