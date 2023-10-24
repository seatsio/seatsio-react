import { SeatingChart } from "@seatsio/seatsio-types"

declare global {
    var seatsio: any
}

export type TestSeatingChart = SeatingChart & { 
    props?: any,
    state?: string
}

export {}