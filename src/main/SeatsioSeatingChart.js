import AbstractChart from "./AbstractChart";

export default class SeatsioSeatingChart extends AbstractChart {

    createChart(seatsio, config) {
        return new seatsio.SeatingChart(config);
    }
}