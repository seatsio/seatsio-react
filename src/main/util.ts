export const didPropsChange = <P extends { [key: string]: any}>(prevProps: P, nextProps: P): boolean => {
    if (Object.keys(prevProps).length !== Object.keys(nextProps).length) {
        return true
    }
    return Object.keys(nextProps).some((propName: string) => {
        let prevValue = prevProps[propName]
        let nextValue = nextProps[propName]
        if (prevValue && nextValue) {
            if (typeof prevValue === 'function' && typeof nextValue === 'function') {
                return prevValue.toString() !== nextValue.toString()
            }
            if (typeof prevValue === 'object' && typeof nextValue === 'object') {
                return didPropsChange(prevValue, nextValue)
            }
        }
        return prevValue !== nextValue
    })
}