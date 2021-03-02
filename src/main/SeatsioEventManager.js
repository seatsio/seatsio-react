import Embeddable from './Embeddable'

export default class SeatsioEventManager extends Embeddable {
    createChart (seatsio, config) {
        return new seatsio.EventManager(config)
    }
}
