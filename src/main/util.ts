import {Booth, GeneralAdmissionArea, InteractiveSection, Seat, SelectableObject, Table} from "@seatsio/seatsio-types"

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

export const isSeat = (obj: SelectableObject) => obj.objectType === 'Seat'
export const isTable = (obj: SelectableObject): obj is Table => obj.objectType === 'Table'
export const isSection = (obj: SelectableObject): obj is InteractiveSection => obj.objectType === 'section'
export const isBooth = (obj: SelectableObject): obj is Booth => obj.objectType === 'Booth'
export const isGeneralAdmission = (obj: SelectableObject): obj is GeneralAdmissionArea => obj.objectType === 'GeneralAdmissionArea'
