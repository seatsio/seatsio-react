import Embeddable from "./Embeddable";

export default class SeatsioSeatingChart extends Embeddable {

    createChart(seatsio, config) {
        return new seatsio.SeatingChart(config);
    }
}