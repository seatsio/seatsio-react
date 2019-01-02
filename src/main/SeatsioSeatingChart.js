/*global seatsio*/

import React from 'react';

export default class SeatsioSeatingChart extends React.Component {

    async componentDidMount() {
        let seatsio = await this.loadSeatsio();
        let {id, className, onChartCreated, ...config} = this.props;
        config.divId = this.props.id;
        let chart = new seatsio.SeatingChart(config).render();
        if (this.props.onChartCreated) this.props.onChartCreated(chart);
        this.setState({chart});
    }

    componentWillUnmount() {
        if (this.state.chart.state !== 'DESTROYED') {
            this.state.chart.destroy();
        }
    }

    loadSeatsio() {
        return new Promise((resolve, reject) => {
            if (typeof seatsio !== 'undefined') {
                resolve(seatsio);
                return;
            }

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

SeatsioSeatingChart.defaultProps = {
    id: 'chart'
};