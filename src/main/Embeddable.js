/*global seatsio*/

import React from 'react'
import {didPropsChange} from './util'

export default class Embeddable extends React.Component {
    async componentDidMount () {
        this.createAndRenderChart()
    }

    async componentDidUpdate (prevProps) {
        if (didPropsChange(this.props, prevProps) && this.chart) {
            this.destroyChart()
            this.createAndRenderChart()
        }
    }

    async createAndRenderChart () {
        const seatsio = await this.getSeatsio()
        const config = this.extractConfigFromProps()
        config.divId = this.props.id
        this.chart = this.createChart(seatsio, config).render()
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart)
        }
    }

    extractConfigFromProps () {
        // noinspection JSUnusedLocalSymbols
        let { id, className, onRenderStarted, chartJsUrl, region, ...config } = this.props
        return config
    }

    componentWillUnmount () {
        this.destroyChart()
    }

    destroyChart () {
        if (this.chart && this.chart.state !== 'DESTROYED') {
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
            <div id={this.props.id} className={this.props.className}/>
        )
    }
}

Embeddable.defaultProps = {
    id: 'chart',
    chartJsUrl: 'https://cdn-{region}.seatsio.net/chart.js'
}
