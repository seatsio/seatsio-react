import { EventManagerConfigOptions, Seatsio } from '@seatsio/seatsio-types'
import Embeddable from './Embeddable'

export default class SeatsioEventManager extends Embeddable<EventManagerConfigOptions> {
    createChart (seatsio: Seatsio, config: EventManagerConfigOptions) {
        return new seatsio.EventManager(config)
    }
}