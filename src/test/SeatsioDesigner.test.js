import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {SeatsioChartManager, SeatsioDesigner} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";

Enzyme.configure({ adapter: new Adapter() })

describe('SeatsioDesigner', () => {

    let seatsioMock = {

        SeatingChartDesigner: class {

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

    it('renders the designer', () => {
        let chart = mount(
            <SeatsioDesigner/>
        )

        expect(chart.find('div').length).toEqual(1)
    })

    it('passes parameters onto the designer', () => {
        return new Promise(resolve => {
            mount(
                <SeatsioDesigner
                    designerKey="aDesignerKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            designerKey: 'aDesignerKey'
                        })
                        resolve()
                    }}/>
            )
        })
    })

    it('does not pass chartJsUrl and region onto the designer', () => {
        return new Promise(resolve => {
            mount(
                <SeatsioDesigner
                    designerKey="aDesignerKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            designerKey: 'aDesignerKey'
                        })
                        resolve()
                    }}/>
            )
        })
    })

})
