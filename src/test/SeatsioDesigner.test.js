import React from 'react'
import {SeatsioDesigner} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util";
import {render} from '@testing-library/react'

describe('SeatsioDesigner', () => {

    let seatsioMock = {

        SeatingChartDesigner: class {

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

    it('passes parameters onto the designer', () => {
        return new Promise(resolve => {
            render(
                <SeatsioDesigner
                    designerKey="aDesignerKey"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            designerKey: 'aDesignerKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('does not pass chartJsUrl and region onto the designer', () => {
        return new Promise(resolve => {
            render(
                <SeatsioDesigner
                    designerKey="aDesignerKey"
                    region="eu"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect(chart.props).toEqual({
                            designerKey: 'aDesignerKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

})
