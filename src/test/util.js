export function removeContainer(config) {
    let { container, ...configWithoutContainer } = config
    return configWithoutContainer
}
