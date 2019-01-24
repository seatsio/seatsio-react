/*global seatsio*/

import React from 'react';

export default class Embeddable extends React.Component {

    async componentDidMount() {
        let seatsio = await this.getSeatsio();
        let {id, className, onRenderStarted, chartJsUrl, ...config} = this.props;
        config.divId = this.props.id;
        this.chartJsUrl = chartJsUrl;
        let chart = this.createChart(seatsio, config).render();
        this.chart = chart;
        if (this.props.onRenderStarted) this.props.onRenderStarted(chart);
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
            script.src = this.chartJsUrl;
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