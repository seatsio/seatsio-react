import React from 'react'
import {SeatsioSeatingChart} from '../main/index'
import Embeddable from '../main/Embeddable'
import {render} from '@testing-library/react'
import {removeContainer} from "./util";
import {TestSeatingChart} from '../types';
import {ChartRendererConfigOptions} from '@seatsio/seatsio-types';

describe('SeatsioSeatingChart', () => {

    let seatsioMock: any = {

        SeatingChart: class {
            public props: ChartRendererConfigOptions
            constructor(props: ChartRendererConfigOptions) {
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
        return new Promise<void>(resolve => {
            render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aWorkspaceKey"
                    onRenderStarted={(chart: TestSeatingChart) => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aWorkspaceKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('passes parameters onto the chart', () => {
        return new Promise<void>(resolve => {
            render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aWorkspaceKey"
                    onRenderStarted={(chart: TestSeatingChart) => {
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
        return new Promise<void>(resolve => {
            render(
                <SeatsioSeatingChart
                    workspaceKey="aworkspaceKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={(chart: TestSeatingChart) => {
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

        return new Promise<void>(resolve => {
            let chart = render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
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

        return new Promise<void>(resolve => {
            let chartComponent = render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
                    onRenderStarted={(chart: TestSeatingChart) => {
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
        return new Promise<void>(resolve => {
            let {rerender} = render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
                />
            )

            rerender(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
                    onRenderStarted={() => {
                        resolve()
                    }}
                />
            )
        })
    })
})
