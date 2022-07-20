import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioSeatingChart} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioSeatingChart', () => {

    let seatsioMock = {

        SeatingChart: class {

            constructor (props) {
                this.props = removeContainer(props)
            }

            render () {
                return this
            }
        }
    }

    Embeddable.prototype.loadSeatsio = () => {
        return Promise.resolve(seatsioMock)
    }

    it('renders the chart with default properties', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioSeatingChart
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({})
                        resolve()
                    }}/>
            ))
        })
    })

    it('passes parameters onto the chart', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioSeatingChart
                    workspaceKey="aworkspaceKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aworkspaceKey'
                        })
                        resolve()
                    }}/>
            ))
        })
    })

    it('does not pass chartJsUrl and region onto the chart', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioSeatingChart
                    workspaceKey="aworkspaceKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aworkspaceKey'
                        })
                        resolve()
                    }}/>
            ))
        })
    })

    it('destroys itself after unmounting', () => {
        let mockedDestroy = jest.fn()
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy

        return new Promise(resolve => {
            let chart = mount((
                <SeatsioSeatingChart
                    onRenderStarted={() => {
                        chart.unmount()

                        expect(mockedDestroy.mock.calls.length).toEqual(1)
                        resolve()
                    }}
                />
            ))
        })
    })

    it('does not destroy itself after unmounting if already destroyed', () => {
        let mockedDestroy = jest.fn()
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy

        return new Promise(resolve => {
            let chartComponent = mount((
                <SeatsioSeatingChart
                    onRenderStarted={chart => {
                        chart.state = 'DESTROYED'
                        chartComponent.unmount()

                        expect(mockedDestroy.mock.calls.length).toEqual(0)
                        resolve()
                    }}
                />
            ))
        })
    })
})
