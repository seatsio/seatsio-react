import React from 'react'
import {SeatsioChartManager} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";
import {render} from '@testing-library/react'

describe('SeatsioChartManager', () => {
    let seatsioMock = {
        ChartManager: class {
            constructor (props) {
                this.props = removeContainer(props)
            }

            render () {
                return this
            }

            destroy () {
            }
        }
    }

    Embeddable.prototype.loadSeatsio = () => {
        return Promise.resolve(seatsioMock)
    }

    it('passes parameters onto the chart manager', () => {
        return new Promise(resolve => {
            render(
                <SeatsioChartManager
                    secretKey="aSecretKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('does not pass chartJsUrl and region onto the chart manager', () => {
        return new Promise(resolve => {
            render(
                <SeatsioChartManager
                    secretKey="aSecretKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })
})
