import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import React, { useState } from 'react';
import './App.css';

type ColorScheme = 'light' | 'dark'

export const App = () => {
  const [unusedState, setUnusedState] = useState(0)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  return (
    <div className={['container', colorScheme].join(' ')}>
        <div className="App">
            <select onChange={e => setColorScheme(e.target.value as ColorScheme)} value={colorScheme}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            <select onChange={e => setUnusedState(parseInt(e.target.value))} value={unusedState}>
                <option>0</option>
                <option>1</option>
            </select>
            <h1>Seats.io React playground</h1>
            <div id="chart">
                { /* @ts-ignore */ }
                <SeatsioSeatingChart
                    workspaceKey="publicDemoKey"
                    event="smallTheatreEvent1"
                    colorScheme={colorScheme}
                    region="eu"
                    chartJsUrl="https://cdn-staging-{region}.seatsio.net/chart.js"
                />
            </div>
        </div>
    </div>
  )
}

export default App