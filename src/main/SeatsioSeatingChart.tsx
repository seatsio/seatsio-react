import { ConfigOptions } from 'configOptions'
import Embeddable from './Embeddable'

export default class SeatsioSeatingChart extends Embeddable {
    createChart (seatsio: any, config: ConfigOptions) {
        return new seatsio.SeatingChart(config)
    }
}