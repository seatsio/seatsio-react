import { BoothProps, GeneralAdmissionAreaProps, InteractiveObjectProps, InteractiveSectionProps, SeatProps, SelectableObjectProps, TableProps } from "@seatsio/seatsio-types"

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

export const isSeat = (obj: SelectableObjectProps): obj is SeatProps => obj.objectType === 'Seat'
export const isTable = (obj: SelectableObjectProps): obj is TableProps => obj.objectType === 'Table'
export const isSection = (obj: SelectableObjectProps): obj is InteractiveSectionProps => obj.objectType === 'Section'
export const isBooth = (obj: SelectableObjectProps): obj is BoothProps => obj.objectType === 'Booth'
export const isGeneralAdmission = (obj: SelectableObjectProps): obj is GeneralAdmissionAreaProps => obj.objectType === 'GeneralAdmissionArea'