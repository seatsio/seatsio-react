import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioChartManager} from '../main/index'
import Embeddable from '../main/Embeddable'

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioChartManager', () => {
    let seatsioMock = {
        ChartManager: class {
            constructor (props) {
                this.props = props
            }

            render () {
                return this
            }
        }
    }

    Embeddable.prototype.loadSeatsio = () => {
        return Promise.resolve(seatsioMock)
    }

    it('renders the chart manager', () => {
        let chart = mount((
            <SeatsioChartManager/>
        ))

        expect(chart.find('div#chart').length).toEqual(1)
    })

    it('passes parameters onto the chart manager', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioChartManager
                    id="someID"
                    className="someClassName"
                    secretKey="aSecretKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            secretKey: 'aSecretKey',
                        })
                        resolve()
                    }}
                />
            ))
        })
    })

    it('does not pass chartJsUrl onto the chart manager', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioChartManager
                    id="someID"
                    className="someClassName"
                    secretKey="aSecretKey"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            secretKey: 'aSecretKey',
                        })
                        resolve()
                    }}
                />
            ))
        })
    })
})
