import { ChartDesigner, CommonConfigOptions, EventManager, Region, SeatingChart, Seatsio } from '@seatsio/seatsio-types'
import * as React from 'react'
import { didPropsChange } from './util'

export type EmbeddableProps<T> = {
    onRenderStarted?: (chart: SeatingChart | EventManager) => void
    chartJsUrl?: string
    region: Region
} & T

export default abstract class Embeddable<T extends CommonConfigOptions> extends React.Component<EmbeddableProps<T>> {
    private container: React.RefObject<HTMLDivElement>
    private chart: SeatingChart
    private mountId: number = 0

    private static seatsioBundles: { [key: string]: Promise<Seatsio> } = {}

    static defaultProps = {
        chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
    }

    constructor(props: EmbeddableProps<T>) {
        super(props);
        this.container = React.createRef()
    }

    abstract createChart (seatsio: Seatsio, config: T): SeatingChart | EventManager | ChartDesigner

    componentDidMount () {
        this.createAndRenderChart(this.mountId)
    }

    componentDidUpdate (prevProps: EmbeddableProps<T>) {
        if(this.chart) {
            // @ts-ignore
            this.chart.config = this.extractConfigFromProps()
            if (didPropsChange(this.props, prevProps)) {
                this.destroyChart()
                this.createAndRenderChart(this.mountId)
            }
        }
    }

    getChartUrl () {
        return this.props.chartJsUrl.replace('{region}', this.props.region)
    }

    async createAndRenderChart (currentMountId: number) {
        const seatsio = await this.loadSeatsio()
        if (currentMountId !== this.mountId) return
        const config = this.extractConfigFromProps()
        this.chart = this.createChart(seatsio, config).render()
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart)
        }
    }

    extractConfigFromProps (): any {
        let { chartJsUrl, divId, onRenderStarted, region, ...config } = this.props
        // @ts-ignore
        config.container = this.container.current
        return config
    }

    componentWillUnmount () {
        this.mountId++
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
