/*global seatsio*/

import React from 'react';

export default class AbstractChart extends React.Component {

    async componentDidMount() {
        let seatsio = await this.getSeatsio();
        let {id, className, onChartCreated, ...config} = this.props;
        config.divId = this.props.id;
        let chart = this.createChart(seatsio, config).render();
        this.chart = chart;
        if (this.props.onChartCreated) this.props.onChartCreated(chart);
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
            script.src = 'https://cdn.seatsio.net/chart.js';
            document.head.appendChild(script);
        });
    }

    render() {
        return (
            <div id={this.props.id} className={this.props.className}/>
        );
    }
}

AbstractChart.defaultProps = {
    id: 'chart'
};