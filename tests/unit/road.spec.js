import Road from '../../src/models/road'
import BusStop from '../../src/models/bus-stop'

describe('Road', () =>{
    it('should exist', () => {
        expect(Road).not.toBeNull();
    })

    it('should have start, end bus stop and travel time properties', () => {
        const startBusStop = new BusStop('Start Pint');
        const endBusStop = new BusStop('End Pint');
        const road = new Road(startBusStop, endBusStop, 500);

        expect(road.getStartBusStop()).toEqual(startBusStop);
        expect(road.getEndBusStop()).toEqual(endBusStop);
        expect(road.getTravelTime()).toEqual(500);
    })
})