import { ConfigOptions } from './types'
import Embeddable from './Embeddable'

export default class SeatsioDesigner extends Embeddable {
    createChart (seatsio: any, config: ConfigOptions) {
        return new seatsio.SeatingChartDesigner(config)
    }
}
