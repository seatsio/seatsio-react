import React from 'react'
import {SeatsioEventManager} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";
import {render} from '@testing-library/react'
import { EventManagerConfigOptions } from '@seatsio/seatsio-types';
import { TestSeatingChart } from '../types'

describe('SeatsioEventManager', () => {

    let seatsioMock = {

        EventManager: class {
            public props: EventManagerConfigOptions
            constructor(props: EventManagerConfigOptions) {
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

    it('passes parameters onto the event manager', () => {
        return new Promise<void>(resolve => {
            render(
                <SeatsioEventManager
                    event="eventA"
                    mode="static"
                    region="eu"
                    secretKey="aSecretKey"
                    onRenderStarted={(chart: TestSeatingChart) => {
                        expect(chart.props).toEqual({
                            event: 'eventA',
                            mode: 'static',
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}/>
            )
        })
    })

    it('does not pass chartJsUrl and region onto the event manager', () => {
        return new Promise<void>(resolve => {
            render(
                <SeatsioEventManager
                    secretKey="aSecretKey"
                    event="eventA"
                    mode="static"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={(chart: TestSeatingChart) => {
                        expect(chart.props).toEqual({
                            event: 'eventA',
                            mode: 'static',
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })
})
