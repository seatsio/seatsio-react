import { ConfigOptions } from 'configOptions'
import Embeddable from './Embeddable'

export default class SeatsioEventManager extends Embeddable {
    createChart (seatsio: any, config: ConfigOptions) {
        return new seatsio.EventManager(config)
    }
}
