import React from 'react'
import {SeatsioEventManager} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";
import {render} from '@testing-library/react'

describe('SeatsioEventManager', () => {

    let seatsioMock = {

        EventManager: class {

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

    it('passes parameters onto the event manager', () => {
        return new Promise(resolve => {
            render(
                <SeatsioEventManager
                    workspaceKey="aworkspaceKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            workspaceKey: 'aworkspaceKey'
                        })
                        resolve()
                    }}/>
            )
        })
    })

    it('does not pass chartJsUrl and region onto the event manager', () => {
        return new Promise(resolve => {
            render(
                <SeatsioEventManager
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
})
