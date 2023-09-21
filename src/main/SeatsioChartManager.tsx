import Embeddable from './Embeddable'
import { ConfigOptions } from './types'

export default class SeatsioChartManager extends Embeddable {
    createChart (seatsio: any, config: ConfigOptions) {
        return new seatsio.ChartManager(config)
    }
}
