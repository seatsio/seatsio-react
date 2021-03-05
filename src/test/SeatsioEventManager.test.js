import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioChartManager, SeatsioEventManager} from '../main/index'
import Embeddable from '../main/Embeddable'

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioEventManager', () => {

    let seatsioMock = {

        EventManager: class {

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

    it('renders the event manager', () => {
        let chart = mount((
            <SeatsioEventManager/>
        ))

        expect(chart.find('div#chart').length).toEqual(1)
    })

    it('passes parameters onto the event manager', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioEventManager
                    id="someID"
                    className="someClassName"
                    publicKey="aPublicKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            publicKey: 'aPublicKey',
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
                    id="someID"
                    className="someClassName"
                    publicKey="aPublicKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            publicKey: 'aPublicKey',
                        })
                        resolve()
                    }}/>
            ))
        })
    })
})
