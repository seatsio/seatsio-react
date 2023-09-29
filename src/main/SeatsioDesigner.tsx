import Embeddable from './Embeddable'
import { ChartDesignerConfigOptions } from '@seatsio/seatsio-types'

export default class SeatsioDesigner extends Embeddable<ChartDesignerConfigOptions> {
    createChart (seatsio: any, config: ChartDesignerConfigOptions) {
        return new seatsio.SeatingChartDesigner(config)
    }
}
