import { ConfigOptions } from 'configOptions'
import Embeddable from './Embeddable'


export default class SeatsioChartManager extends Embeddable {
    createChart (seatsio: any, config: ConfigOptions) {
        return new seatsio.ChartManager(config)
    }
}
