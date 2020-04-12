import BusLineManager from '../../src/services/bus-line-manager'

describe('Bus Line Manager', () => {
    it('should exist', () => {
        expect(BusLineManager).not.toBeNull();
    })

    it('should be able to ingest all the stops', () => {
        let busLineManager = new BusLineManager()
        busLineManager.addBusStop('Stop 1')
        busLineManager.addBusStop('Stop 2')

        expect(busLineManager.getBusStops()).toHaveLength(2)
    })

    it('should throw an error if duplicate stop name is given', () =>{
        let busLineManager = new BusLineManager()
        busLineManager.addBusStop('Stop 1')
        expect(()=> {
            busLineManager.addBusStop('Stop 1')
        }).toThrow();
    })

    it('should be able to find a stop with name', ()=>{
        let busLineManager = new BusLineManager()
        let created = busLineManager.findOrCreateBusStop('Stop 1')
        
        expect(busLineManager.findBusStopByName('Stop 1').getName()).toEqual('Stop 1')
    })

    it('should be able to add bus stop if not exist', () =>{
        let busLineManager = new BusLineManager()
        let created = busLineManager.findOrCreateBusStop('Stop 1')
        
        expect(created.getName()).toEqual('Stop 1')
    })

    it('should be able to find bus stop when exists', () =>{
        let busLineManager = new BusLineManager()
        let initial = busLineManager.findOrCreateBusStop('Stop 1')

        let secondary = busLineManager.findOrCreateBusStop('Stop 1')
        
        expect(initial).toEqual(secondary)
    })

    it('should find or add the stop', () => {
        let busLineManager = new BusLineManager()
        busLineManager.add
    })

    it('should return added bus stop', () => {
        let busLineManager = new BusLineManager()
        let addedStop = busLineManager.addBusStop('new bus stop')
        expect(addedStop.getName()).toEqual('new bus stop')
    })

    it('should be able to ingest all the missing stops and routes', () => {
        let busLineManager = new BusLineManager();
        let testData = [{
            "mista": "A",
            "mihin": "B",
            "kesto": 3
        }]
        busLineManager.addRoadBetweenStops('A', 'B', 3)
        expect(busLineManager.getBusStops()).toHaveLength(2)
        expect(busLineManager.getRoads()).toHaveLength(1)
    })

    it('should throw an error if unknown stop is given with bus line', () => {
        let busLineManager = new BusLineManager()
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        expect(busLineManager.getBusLines()).toHaveLength(1)
    })

    it('should throw an error if duplicate bus line is inserted', () => {
        let busLineManager = new BusLineManager()
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        expect(() => {
            busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        }).toThrow()
    })

    it('should be able to ingest stops for line', () => {
        let busLineManager = new BusLineManager()
        busLineManager.addBusLine('Midnigt Express', ['Airport', 'Court', 'Prison'])
        let storedBusLine = busLineManager.getBusLines()[0]
        expect(storedBusLine.getStops()).toHaveLength(3)
    })

    it('should be able to fetch all lines that stop in certain bus stop', ()=> {
        let busLineManager = new BusLineManager()
        busLineManager.addBusLine('Route A', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route B', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route C', ['Stop 1', 'Stop 3', 'Stop 4'])
        let lines = busLineManager.getAllLinesForStop('Stop 2')
        expect(lines).toHaveLength(2)
        let receivedLineNames = lines.map(line => line.getName())
        expect(receivedLineNames).toContain('Route A')
        expect(receivedLineNames).toContain('Route B')
    })

    it('should have method to return route solver for built bus line mapping', () => {
        let busLineManager = new BusLineManager()
        busLineManager.addRoadBetweenStops('Stop 1', 'Stop 2', 5)
        busLineManager.addRoadBetweenStops('Stop 2', 'Stop 3', 6)
        busLineManager.addRoadBetweenStops('Stop 3', 'Stop 4', 15)
    
        busLineManager.addBusLine('Route A', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route B', ['Stop 1', 'Stop 2', 'Stop 3'])
        busLineManager.addBusLine('Route C', ['Stop 1', 'Stop 3', 'Stop 4'])
        let routeSolver = busLineManager.getRouteSolver()
        expect(routeSolver).not.toBeNull()
        expect(routeSolver.getNodes()).toHaveLength(4)
    });
})