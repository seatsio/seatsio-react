import Embeddable from "./Embeddable";

export default class SeatsioChartManager extends Embeddable {
    createChart(seatsio, config) {
        return new seatsio.ChartManager(config);
    }
}