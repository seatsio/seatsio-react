import * as React from 'react'
import {didPropsChange} from './util'
import { ChartDesigner, CommonConfigOptions, EventManager, Region, SeatingChart, Seatsio } from '@seatsio/seatsio-types'

export type EmbeddableProps<T > = {
    onRenderStarted?: (chart: SeatingChart | EventManager) => void
    chartJsUrl?: string
    region: Region
} & T

export default abstract class Embeddable<T extends CommonConfigOptions> extends React.Component<EmbeddableProps<T>> {
    private container: React.RefObject<HTMLDivElement>
    private chart: SeatingChart
    private firstRender: boolean

    private static seatsioBundles: { [key: string]: Promise<Seatsio> } = {}

    static defaultProps = {
        chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
    }

    constructor(props: EmbeddableProps<T>) {
        super(props);
        this.container = React.createRef()
        this.firstRender = true
    }

    abstract createChart (seatsio: Seatsio, config: T): SeatingChart | EventManager | ChartDesigner

    componentDidMount () {
        if (!Embeddable.seatsioBundles[this.getChartUrl()] || this.firstRender) {
            this.createAndRenderChart()
            this.firstRender = false
        }
    }

    componentDidUpdate (prevProps: EmbeddableProps<T>) {
        if (didPropsChange(this.props, prevProps) && this.chart) {
            this.destroyChart()
            this.createAndRenderChart()
        }
    }

    getChartUrl () {
        return this.props.chartJsUrl.replace('{region}', this.props.region)
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
        const chartUrl = this.getChartUrl()
        if (!Embeddable.seatsioBundles[chartUrl]) {
            Embeddable.seatsioBundles[chartUrl] = new Promise<Seatsio>((resolve, reject) => {
                const script = document.head.appendChild(document.createElement('script'))
                // Seatsio global is not replaced if already present, which would cause the wrong region bundle to resolve when changing region
                window.seatsio = undefined
                script.onload = () => {
                    resolve(seatsio)
                }
                script.onerror = () => reject(`Could not load ${script.src}`)
                script.src = chartUrl
            })
        }

        return Embeddable.seatsioBundles[chartUrl]
    }

    render (): React.ReactNode {
        return (
            <div ref={this.container as unknown as React.RefObject<HTMLDivElement>} style={{'height': '100%', 'width': '100%'}} />
        )
    }
}