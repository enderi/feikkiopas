import BusStop from '../../src/models/bus-stop'

describe('Bus Stop', () =>{
    it('should exist', () => {
        expect(BusStop).not.toBeNull();
    })

    it('should be able to store a name', () => {
        const busStop1 = new BusStop('Bus Stop 1');
        expect(busStop1.getName() === 'Bus Stop 1')
    })
})