import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import Embeddable from './Embeddable'

export default class SeatsioEventManager extends Embeddable<EventManagerConfigOptions> {
    createChart (seatsio: any, config: EventManagerConfigOptions) {
        return new seatsio.EventManager(config)
    }
}