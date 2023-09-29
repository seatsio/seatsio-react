import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import Embeddable from './Embeddable'


export default class SeatsioChartManager extends Embeddable<EventManagerConfigOptions> {
    createChart <EventManagerConfigOptions>(seatsio: any, config: EventManagerConfigOptions) {
        return new seatsio.ChartManager(config)
    }
}