import AbstractChart from "./AbstractChart";

export default class SeatsioEventManager extends AbstractChart {

    createChart(seatsio, config) {
        return new seatsio.EventManager(config);
    }
}