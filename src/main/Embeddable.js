/*global seatsio*/

import React from 'react';
import { didPropsChange } from './util';

export default class Embeddable extends React.Component {
    constructor(params) {
        super(params);
        this.state = {
            loaded: false,
        };
    }

    async componentDidMount() {
        this.createAndRenderChart();
    }

    async componentDidUpdate(prevProps) {
        if (didPropsChange(this.props, prevProps) && this.state.loaded) {
            this.destroyChart();
            this.createAndRenderChart()
        }
    }

    async createAndRenderChart() {
        const seatsio = await this.getSeatsio();
        const config = this.extractConfigFromProps();
        config.divId = this.props.id;
        this.chart = this.createChart(seatsio, config).render();
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(this.chart);
        }
    }

    extractConfigFromProps() {
        // noinspection JSUnusedLocalSymbols
        let {id, className, onRenderStarted, chartJsUrl, ...config} = this.props;
        return config;
    }

    componentWillUnmount() {
        this.destroyChart()
    }

    destroyChart() {
        if (this.chart && this.chart.state !== 'DESTROYED') {
            this.chart.destroy();
        }
    }

    getSeatsio() {
        if (typeof seatsio !== 'undefined') {
            return Promise.resolve(seatsio);
        }
        return this.loadSeatsio();
    }

    loadSeatsio() {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.onload = async () => {
                await this.setState({ loaded: true });
                resolve(seatsio);
            };
            script.onerror = () => reject(`Could not load ${script.src}`);
            script.src = this.props.chartJsUrl;
            document.head.appendChild(script);
        });
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.className}/>
        );
    }
}

Embeddable.defaultProps = {
    id: 'chart',
    chartJsUrl: 'https://cdn.seatsio.net/chart.js'
};