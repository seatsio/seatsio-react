import Embeddable from './Embeddable'

export default class SeatsioDesigner extends Embeddable {
    createChart (seatsio, config) {
        return new seatsio.SeatingChartDesigner(config)
    }
}
