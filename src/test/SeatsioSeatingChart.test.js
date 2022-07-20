import React from 'react'
import {SeatsioSeatingChart} from '../main/index'
import Embeddable from '../main/Embeddable'
import {render} from '@testing-library/react'
import {removeContainer} from "./util";

describe('SeatsioSeatingChart', () => {

    let seatsioMock = {

        SeatingChart: class {

            constructor(props) {
                this.props = removeContainer(props)
            }

            render() {
                return this
            }

            destroy() {
            }
        }
    }

    Embeddable.prototype.loadSeatsio = () => {
        return Promise.resolve(seatsioMock)
    }

    it('renders the chart with default properties', () => {
        return new Promise(resolve => {
            render(
                <SeatsioSeatingChart
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('passes parameters onto the chart', () => {
        return new Promise(resolve => {
            render(
                <SeatsioSeatingChart
                    workspaceKey="aWorkspaceKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aWorkspaceKey',
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('does not pass chartJsUrl and region onto the chart', () => {
        return new Promise(resolve => {
            render(
                <SeatsioSeatingChart
                    workspaceKey="aworkspaceKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aworkspaceKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('destroys itself after unmounting', () => {
        let mockedDestroy = jest.fn()
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy

        return new Promise(resolve => {
            let chart = render(
                <SeatsioSeatingChart
                    onRenderStarted={() => {
                        chart.unmount()

                        expect(mockedDestroy.mock.calls.length).toEqual(1)
                        resolve()
                    }}
                />
            )
        })
    })

    it('does not destroy itself after unmounting if already destroyed', () => {
        let mockedDestroy = jest.fn()
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy

        return new Promise(resolve => {
            let chartComponent = render(
                <SeatsioSeatingChart
                    onRenderStarted={chart => {
                        chart.state = 'DESTROYED'
                        chartComponent.unmount()

                        expect(mockedDestroy.mock.calls.length).toEqual(0)
                        resolve()
                    }}
                />
            )
        })
    })

    it('re-renders if props change', () => {
        return new Promise(resolve => {
            let {rerender} = render(<SeatsioSeatingChart/>)
            rerender(
                <SeatsioSeatingChart
                    onRenderStarted={() => {
                        resolve()
                    }}
                />
            )
        })
    })
})
