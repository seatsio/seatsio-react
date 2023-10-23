import { CommonConfigOptions } from "@seatsio/seatsio-types"

export function removeContainer<T extends CommonConfigOptions>(config: T): Omit<T, 'container'> {
    let { container, ...configWithoutContainer } = config
    return configWithoutContainer
}
