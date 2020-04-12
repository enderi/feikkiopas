import BusLineEdge from '../../src/models/bus-line-edge'
import BusLine from '../../src/models/bus-line';
import BusStop from '../../src/models/bus-stop';

describe('Bus Line Edge', () =>{
    it('should exist', () => {
        expect(BusLineEdge).not.toBeNull();
    })

    it('should know its travel time', ()=>{
        let busLineEdge = new BusLineEdge()
        busLineEdge.setTravelTime(15)

        expect(busLineEdge.getTravelTime()).toEqual(15)
    })

    it('should know which line owns it', ()=>{
        let busLineEdge = new BusLineEdge()
        let busLine = new BusLine('Savo Express')
        busLineEdge.setOwnerBusLine(busLine)

        expect(busLineEdge.getOwnerBusLine()).toEqual(busLine)
    })

    it('should have start and end stops', ()=>{
        let busLineEdge = new BusLineEdge()
        let startStop = new BusStop('Beginning')
        let endStop = new BusStop('The end')
        busLineEdge.setStartBusStop(startStop)
        busLineEdge.setEndBusStop(endStop)

        expect(busLineEdge.getStartBusStop()).toEqual(startStop)
        expect(busLineEdge.getEndBusStop()).toEqual(endStop)
    })
})