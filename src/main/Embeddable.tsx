/*global seatsio*/

import * as React from 'react'
import {didPropsChange} from './util'
import { ConfigOptions } from 'configOptions'
import SeatsioSeatingChart from './SeatsioSeatingChart'

export default abstract class Embeddable extends React.Component<ConfigOptions> {
    static defaultProps = {
        chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
    }

    private container: React.RefObject<HTMLDivElement>
    private rendering?: Promise<void>
    private chart: SeatsioSeatingChart

    constructor(props: ConfigOptions) {
        super(props);
        this.container = React.createRef();
    }

    abstract createChart (seatsio: any, config: ConfigOptions): any

    async componentDidMount () {
        if(!this.rendering) {
            this.rendering = this.createAndRenderChart()
        }
    }

    async componentDidUpdate (prevProps: ConfigOptions) {
        if (didPropsChange(this.props, prevProps) && this.chart) {
            this.destroyChart()
            this.createAndRenderChart()
        }
    }

    async createAndRenderChart () {
        const seatsio = await this.getSeatsio()
        const config = this.extractConfigFromProps()
        config.container = this.container.current as any
        this.chart = this.createChart(seatsio, config).render()
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart)
        }
    }

    extractConfigFromProps (): ConfigOptions {
        // noinspection JSUnusedLocalSymbols
        let { divId, container, onRenderStarted, chartJsUrl, region, ...config } = this.props
        return config
    }

    componentWillUnmount () {
        this.destroyChart()
    }

    destroyChart () {
        if (this.chart && this.chart.state !== 'DESTROYED') {
            (this.chart as any).destroy()
        }
    }

    getSeatsio () {
        if (typeof seatsio === 'undefined') {
            return this.loadSeatsio()
        } else if (seatsio.region !== this.props.region) {
            seatsio = undefined
            return this.loadSeatsio()
        } else {
            return Promise.resolve(seatsio)
        }
    }

    loadSeatsio () {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.onload = () => {
                seatsio.region = this.props.region
                resolve(seatsio)
            }
            script.onerror = () => reject(`Could not load ${script.src}`)
            script.src = this.props.chartJsUrl.replace('{region}', this.props.region)
            document.head.appendChild(script)
        })
    }

    render () {
        return (
            <div ref={this.container as unknown as React.RefObject<HTMLDivElement>} style={{'height': '100%', 'width': '100%'}} />
        )
    }
}