import { ChartRendererConfigOptions, Seatsio } from '@seatsio/seatsio-types'
import Embeddable from './Embeddable'

export default class SeatsioSeatingChart extends Embeddable<ChartRendererConfigOptions> {
    createChart (seatsio: Seatsio, config: ChartRendererConfigOptions) {
        return new seatsio.SeatingChart(config)
    }
}