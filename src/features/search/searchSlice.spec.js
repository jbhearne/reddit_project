import searchReducer, { setSearch } from './searchSlice'

describe('search reducer', () => {
    const expectedInitialState = {
        search: ''
    }

    it('should handle initial state', () => {
        expect(searchReducer(undefined, { type: 'unknown' })).toEqual(expectedInitialState)
    })
    it('should set the search term with setSerch', () => {
        const actual = searchReducer(expectedInitialState, setSearch('test'))
        expect(actual.search).toBe('test')
    })
})