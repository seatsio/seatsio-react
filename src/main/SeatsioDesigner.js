import AbstractChart from "./AbstractChart";

export default class SeatsioDesigner extends AbstractChart {

    createChart(seatsio, config) {
        return new seatsio.SeatingChartDesigner(config);
    }
}