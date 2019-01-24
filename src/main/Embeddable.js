/*global seatsio*/

import React from 'react';

export default class Embeddable extends React.Component {

    async componentDidMount() {
        const seatsio = await this.getSeatsio();
        const config = this.extractConfigFromProps();
        config.divId = this.props.id;
        const chart = this.createChart(seatsio, config).render();
        this.chart = chart;
        if (this.props.onRenderStarted) {
            this.props.onRenderStarted(chart);
        }
    }

    extractConfigFromProps() {
        // noinspection JSUnusedLocalSymbols
        let {id, className, onRenderStarted, chartJsUrl, ...config} = this.props;
        return config;
    }

    componentWillUnmount() {
        if (this.chart.state !== 'DESTROYED') {
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
            script.onload = () => resolve(seatsio);
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