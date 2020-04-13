import BusLineManager from '../../src/services/bus-line-manager'

describe('Bus Line Manager', () => {
    it('should exist', () => {
        expect(BusLineManager).not.toBeNull();
    })

    it('should be able to ingest all the stops', () => {
        const busLineManager = new BusLineManager();
        busLineManager.addBusStop('Stop 1')
        busLineManager.addBusStop('Stop 2')

        expect(busLineManager.getBusStops()).toHaveLength(2)
    })

    it('should throw an error if duplicate stop name is given', () =>{
        const busLineManager = new BusLineManager();
        busLineManager.addBusStop('Stop 1')
        expect(()=> {
            busLineManager.addBusStop('Stop 1')
        }).toThrow();
    })

    it('should be able to find a stop with name', ()=>{
        const busLineManager = new BusLineManager();
        const created = busLineManager.findOrCreateBusStop('Stop 1');

        expect(busLineManager.findBusStopByName('Stop 1').getName()).toEqual('Stop 1')
    })

    it('should be able to add bus stop if not exist', () =>{
        const busLineManager = new BusLineManager();
        const created = busLineManager.findOrCreateBusStop('Stop 1');

        expect(created.getName()).toEqual('Stop 1')
    })

    it('should be able to find bus stop when exists', () =>{
        const busLineManager = new BusLineManager();
        const initial = busLineManager.findOrCreateBusStop('Stop 1');

        const secondary = busLineManager.findOrCreateBusStop('Stop 1');

        expect(initial).toEqual(secondary)
    })

    it('should find or add the stop', () => {
        const busLineManager = new BusLineManager();
        busLineManager.add
    })

    it('should return added bus stop', () => {
        const busLineManager = new BusLineManager();
        const addedStop = busLineManager.addBusStop('new bus stop');
        expect(addedStop.getName()).toEqual('new bus stop')
    })

    it('should be able to ingest all the missing stops and routes', () => {
        const busLineManager = new BusLineManager();
        const testData = [{
            "mista": "A",
            "mihin": "B",
            "kesto": 3
        }];
        busLineManager.addRoadBetweenStops('A', 'B', 3)
        expect(busLineManager.getBusStops()).toHaveLength(2)
        expect(busLineManager.getRoads()).toHaveLength(1)
    })

    it('should throw an error if unknown stop is given with bus line', () => {
        const busLineManager = new BusLineManager();
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        expect(busLineManager.getBusLines()).toHaveLength(1)
    })

    it('should throw an error if duplicate bus line is inserted', () => {
        const busLineManager = new BusLineManager();
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        expect(() => {
            busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        }).toThrow()
    })

    it('should be able to ingest stops for line', () => {
        const busLineManager = new BusLineManager();
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        const storedBusLine = busLineManager.getBusLines()[0];
        expect(storedBusLine.getStops()).toHaveLength(3)
    })

    it('should have method to return route solver for built bus line mapping', () => {
        const busLineManager = new BusLineManager();
        busLineManager.addRoadBetweenStops('Stop 1', 'Stop 2', 5)
        busLineManager.addRoadBetweenStops('Stop 2', 'Stop 3', 6)
        busLineManager.addRoadBetweenStops('Stop 3', 'Stop 4', 15)
    
        busLineManager.addBusLine('Route A', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route B', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route C', ['Stop 1', 'Stop 3', 'Stop 4'])
        const routeSolver = busLineManager.getRouteSolver();
        expect(routeSolver).not.toBeNull()
        expect(routeSolver.getNodes()).toHaveLength(4)
    });
})