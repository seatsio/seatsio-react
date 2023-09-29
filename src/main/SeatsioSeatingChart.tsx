import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import Embeddable from './Embeddable'

export default class SeatsioSeatingChart extends Embeddable<ChartRendererConfigOptions> {
    createChart (seatsio: any, config: ChartRendererConfigOptions) {
        return new seatsio.SeatingChart(config)
    }
}