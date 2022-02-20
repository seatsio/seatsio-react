import React from 'react';
import './App.css';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react'

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            unusedState: 0,
            colorScheme: 'light'
        }
    }

    onColorSchemeChange (e) {
        this.setState({ colorScheme: e.target.value })
    }

    onUnusedStateChange (e) {
        this.setState({ unusedState: e.target.value })
    }

    render () {
        return (
            <div className="App">
                <select onChange={this.onColorSchemeChange.bind(this)} value={this.state.colorScheme}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
                <select onChange={this.onUnusedStateChange.bind(this)} value={this.state.unusedState}>
                    <option>0</option>
                    <option>1</option>
                </select>
                <h1>Seats.io React playground</h1>
                <SeatsioSeatingChart
                    workspaceKey="publicDemoKey"
                    event="theatreEvent"
                    colorScheme={this.state.colorScheme}
                    region="eu"
                />
            </div>
        )
    }
}

export default App
