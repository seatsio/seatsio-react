
import React from 'react'
import {SeatsioDesigner} from '../main/index'
import Embeddable from '../main/Embeddable'
import {removeContainer} from "./util"
import {render} from '@testing-library/react'
import { ChartDesignerConfigOptions } from '@seatsio/seatsio-types'

describe('SeatsioDesigner', () => {

    let seatsioMock = {
        SeatingChartDesigner: class {
            public props: ChartDesignerConfigOptions

            constructor(props: ChartDesignerConfigOptions) {
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
        return new Promise<void>(resolve => {
            render(
                <SeatsioDesigner
                    region="eu"
                    chartKey="aChartKey"
                    secretKey="aSecretKey"
                    onRenderStarted={chart => {
                        expect((chart as any).props).toEqual({
                            chartKey: 'aChartKey',
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

    it('does not pass chartJsUrl and region onto the designer', () => {
        return new Promise<void>(resolve => {
            render(
                <SeatsioDesigner
                    region="eu"
                    chartKey="aChartKey"
                    secretKey="aSecretKey"
                    chartJsUrl="https://www.google.com"
                    onRenderStarted={chart => {
                        expect((chart as any).props).toEqual({
                            chartKey: 'aChartKey',
                            secretKey: 'aSecretKey'
                        })
                        resolve()
                    }}
                />
            )
        })
    })

})
