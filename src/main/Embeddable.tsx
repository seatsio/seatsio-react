import * as React from 'react'
import {didPropsChange} from './util'
import { ChartDesigner, CommonConfigOptions, EventManager, Region, SeatingChart, Seatsio } from '@seatsio/seatsio-types'

export type EmbeddableProps<T> = {
    onRenderStarted?: (chart: SeatingChart) => void
    chartJsUrl?: string
    region: Region
} & T

export default abstract class Embeddable<T extends CommonConfigOptions> extends React.Component<EmbeddableProps<T>> {
    private container: React.RefObject<HTMLDivElement>
    private rendering?: Promise<void>
    private chart: SeatingChart

    static defaultProps = {
        chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
    }

    constructor(props: EmbeddableProps<T>) {
        super(props);
        this.container = React.createRef();
    }

    abstract createChart (seatsio: Seatsio, config: T): SeatingChart | EventManager | ChartDesigner

    async componentDidMount () {
        if(!this.rendering) {
            this.rendering = this.createAndRenderChart()
        }
    }

    async componentDidUpdate (prevProps: EmbeddableProps<T>) {
        if (didPropsChange(this.props, prevProps) && this.chart) {
            this.destroyChart()
            this.createAndRenderChart()
        }
    }

    async createAndRenderChart () {
        const seatsio = await this.getSeatsio()
        const config = this.extractConfigFromProps()
        config.container = this.container.current
        this.chart = this.createChart(seatsio, config).render()
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart)
        }
    }

    extractConfigFromProps (): any {
        // noinspection JSUnusedLocalSymbols
        let { chartJsUrl, divId, onRenderStarted, region, ...config } = this.props
        return config
    }

    componentWillUnmount () {
        this.destroyChart()
    }

    destroyChart () {
        if (this.chart && (this.chart as any).state !== 'DESTROYED') {
            this.chart.destroy()
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