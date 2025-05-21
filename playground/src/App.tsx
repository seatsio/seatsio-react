import { SeatsioSeatingChart, Region } from '@seatsio/seatsio-react';
import React, {useRef, useState} from 'react';
import './App.css';
import {SeatingChart, SelectableObject} from "@seatsio/seatsio-types";

type ColorScheme = 'light' | 'dark'

export const App = () => {
  const [unusedState, setUnusedState] = useState(0)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [shown, setShown] = useState(true)
  const chartRef = useRef<SeatingChart | null>(null);
  const [selection, setSelection] = useState<SelectableObject[]>([]);
  const region: Region = 'eu'

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
            <select onChange={e => setShown(e.target.value === 'true')} value={shown + ''}>
                <option value="true">visible</option>
                <option value="false">hidden</option>
            </select>
            <h1>Seats.io React playground</h1>
            <div id="chart">
                {shown &&
                <SeatsioSeatingChart
                    workspaceKey="publicDemoKey"
                    event="smallTheatreEvent1"
                    colorScheme={colorScheme}
                    region={region}
                    chartJsUrl="https://cdn-staging-{region}.seatsio.net/chart.js"
                    onChartRendered={(chart) => (chartRef.current = chart)}
                    onObjectSelected={async () => setSelection(await chartRef.current!.listSelectedObjects())}
                    onObjectDeselected={async () => setSelection(await chartRef.current!.listSelectedObjects())}
                />
                }
            </div>
            <p>{JSON.stringify(selection.map((o) => o.labels.displayedLabel))}</p>
        </div>
    </div>
  )
}

export default App
