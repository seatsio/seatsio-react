import { ChartRendererConfigOptions } from '@seatsio/seatsio-types';
import { render } from '@testing-library/react';
import React from 'react';
import Embeddable from '../main/Embeddable';
import { SeatsioSeatingChart } from '../main/index';
import { TestSeatingChart } from '../types';
import { removeContainer } from "./util";

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

    it('only renders one chart when mount/unmount/remount happens quickly (StrictMode)', () => {
        let renderCount = 0
        const originalRender = seatsioMock.SeatingChart.prototype.render
        seatsioMock.SeatingChart.prototype.render = function() {
            renderCount++
            return originalRender.call(this)
        }

        return new Promise<void>((resolve, reject) => {
            const { unmount } = render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
                />
            )

            unmount()

            render(
                <SeatsioSeatingChart
                    region="eu"
                    workspaceKey="aworkspaceKey"
                    onRenderStarted={() => {
                        setTimeout(() => {
                            seatsioMock.SeatingChart.prototype.render = originalRender
                            if (renderCount > 1) {
                                reject(new Error(`Expected 1 chart render, got ${renderCount}`))
                            } else {
                                resolve()
                            }
                        }, 0)
                    }}
                />
            )
        })
    })

    it('re-renders chart when componentDidMount is called again after componentWillUnmount (Next.js soft navigation)', async () => {
        let renderCount = 0
        const originalRender = seatsioMock.SeatingChart.prototype.render
        seatsioMock.SeatingChart.prototype.render = function() {
            renderCount++
            return originalRender.call(this)
        }

        const instance = new SeatsioSeatingChart({
            region: 'eu',
            workspaceKey: 'aworkspaceKey',
            chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
        });
        (instance as any).container = { current: document.createElement('div') }
        
        const chartUrl = (instance as any).getChartUrl();
        (Embeddable as any).seatsioBundles[chartUrl] = Promise.resolve(seatsioMock)
        
        instance.componentDidMount()
        await new Promise(resolve => setTimeout(resolve, 0))
        expect(renderCount).toBe(1)

        instance.componentWillUnmount()

        instance.componentDidMount()
        await new Promise(resolve => setTimeout(resolve, 0))

        expect(renderCount).toBe(2)
        
        delete (Embeddable as any).seatsioBundles[chartUrl]
        seatsioMock.SeatingChart.prototype.render = originalRender
    })
})
