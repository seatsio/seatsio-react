import {didPropsChange} from '../main/util'

describe('didPropsChange', () => {
    it('returns true if a number changes', () => {
        const prevProps = {
            ducks: 1
        }
        const nextProps = {
            ducks: 2
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })

    it('returns true if a string changes', () => {
        const prevProps = {
            name: 'Clarke the duck'
        }
        const nextProps = {
            name: 'Stephan the duck'
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })

    it('returns true if a parameter is no longer passed', () => {
        const prevProps = {
            ducks: 1
        }
        const nextProps = {}
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })

    it('returns true if a parameter is no longer passed, but a new one is', () => {
        const prevProps = {
            ducks: 1
        }
        const nextProps: any = {
            pineapples: 1
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })

    it('returns true if an arrow function changes', () => {
        const prevProps = {
            parameter: () => { 1 }
        }
        const nextProps = {
            parameter: () => { 1.0 }
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })

    it('returns false if an arrow function does not change', () => {
        const prevProps = {
            parameter: () => { 1 }
        }
        const nextProps = {
            parameter: () => { 1 }
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(false)
    })

    it('returns true if an arrow function inside an object changes', () => {
        const prevProps = {
            parameter: {
                parameter: () => { 1 }
            }
        }
        const nextProps = {
            parameter: {
                parameter: () => { 1.0 }
            }
        }
        expect(didPropsChange(prevProps, nextProps)).toBe(true)
    })
})
