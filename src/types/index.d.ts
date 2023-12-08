import { EventManager, SeatingChart } from "@seatsio/seatsio-types"
import { SeatsioDesigner } from "../main"

export type TestSeatingChart = (SeatingChart | EventManager | SeatsioDesigner) & { 
    props?: any,
    state?: string
}

export {}