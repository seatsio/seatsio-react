/*global seatsio*/

import React from 'react';

export default class Embeddable extends React.Component {

    async componentDidMount() {
        let seatsio = await this.getSeatsio();
        let {id, className, onRenderStarted, ...config} = this.props;
        config.divId = this.props.id;
        config.chartJsUrl = this.props.chartJsUrl;
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