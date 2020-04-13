import BusLine from '../../src/models/bus-line'
import BusStop from '../../src/models/bus-stop'

describe('Bus Line', () =>{
    it('should exist', () => {
        expect(BusLine).not.toBeNull();
    })

    it('should be have name property', ()=>{
        const busLine = new BusLine('Meksiko-Kuusamo');
        expect(busLine.getName()).toEqual('Meksiko-Kuusamo')
    })

    it('should have info what stops are on the way', ()=>{
        const busLine = new BusLine('Turku-Lappeenranta');
        const stopTurku = new BusStop('Turku');
        const stopTampere = new BusStop('Tampere');
        const stopLappeenranta = new BusStop('Lappeenranta');
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)
        const stops = busLine.getStops();
        expect(stops).toContain(stopTurku)
        expect(stops).toContain(stopTampere)
        expect(stops).toContain(stopLappeenranta)
    })
})