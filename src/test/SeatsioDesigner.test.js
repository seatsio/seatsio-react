import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioDesigner} from '../main/index'
import Embeddable from '../main/Embeddable'

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioDesigner', () => {

    let seatsioMock = {

        SeatingChartDesigner: class {

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

    it('renders the designer', () => {
        let chart = mount(
            <SeatsioDesigner/>
        )

        expect(chart.find('div#chart').length).toEqual(1)
    })

    it('passes parameters onto the designer', () => {
        return new Promise(resolve => {
            mount(
                <SeatsioDesigner
                    id="someID"
                    className="someClassName"
                    designerKey="aDesignerKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            designerKey: 'aDesignerKey',
                        })
                        resolve()
                    }}/>
            )
        })
    })

    it('does not pass chartJsUrl onto the designer', () => {
        return new Promise(resolve => {
            mount(
                <SeatsioDesigner
                    id="someID"
                    className="someClassName"
                    designerKey="aDesignerKey"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            designerKey: 'aDesignerKey',
                        })
                        resolve()
                    }}/>
            )
        })
    })

})
