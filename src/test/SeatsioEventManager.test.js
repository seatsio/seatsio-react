import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioChartManager, SeatsioEventManager} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioEventManager', () => {

    let seatsioMock = {

        EventManager: class {

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

    it('renders the event manager', () => {
        let chart = mount((
            <SeatsioEventManager/>
        ))

        expect(chart.find('div').length).toEqual(1)
    })

    it('passes parameters onto the event manager', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioEventManager
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

    it('does not pass chartJsUrl and region onto the event manager', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioEventManager
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
})
