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
    private seatsio: Promise<Seatsio>
    private chart: SeatingChart

    private static seatsioBundles: { [key in Region]?: Seatsio } = {}

    static defaultProps = {
        chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
    }

    constructor(props: EmbeddableProps<T>) {
        super(props);
        this.container = React.createRef()
    }

    abstract createChart (seatsio: Seatsio, config: T): SeatingChart | EventManager | ChartDesigner

    componentDidMount () {
        console.log('Mounted')
        this.createAndRenderChart()
    }

    componentDidUpdate (prevProps: EmbeddableProps<T>) {
        if (didPropsChange(this.props, prevProps) && this.chart) {
            console.log('Props changed')
            this.destroyChart()
            this.createAndRenderChart()
        }
    }

    async createAndRenderChart () {
        const seatsio = await this.loadSeatsio()
        const config = this.extractConfigFromProps()
        config.container = this.container.current
        this.chart = this.createChart(seatsio, config).render()
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart)
        }
    }

    extractConfigFromProps (): any {
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

    loadSeatsio (): Promise<Seatsio> {
        if (!this.seatsio || (this.seatsio as any).region !== this.props.region) {
            console.log('Starting seatsio load')
            this.seatsio = new Promise((resolve, reject) => {
                const script = document.head.appendChild(document.createElement('script'))
                script.onload = () => {
                    (seatsio as any).region = this.props.region
                    resolve(seatsio)
                    console.log('Promise resolved')
                }
                script.onerror = () => reject(`Could not load ${script.src}`)
                script.src = this.props.chartJsUrl.replace('{region}', this.props.region)
            })
        }

        return this.seatsio
    }

    render (): React.ReactNode {
        return <div ref={this.container as unknown as React.RefObject<HTMLDivElement>} style={{'height': '100%', 'width': '100%'}} />
    }
}