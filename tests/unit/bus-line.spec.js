import BusLine from '../../src/models/bus-line'
import BusStop from '../../src/models/bus-stop'

describe('Bus Line', () =>{
    it('should exist', () => {
        expect(BusLine).not.toBeNull();
    })

    it('should be have name property', ()=>{
        let busLine = new BusLine('Meksiko-Kuusamo')
        expect(busLine.getName()).toEqual('Meksiko-Kuusamo')
    })

    it('should have info what stops are on the way', ()=>{
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)
        let stops = busLine.getStops()
        expect(stops).toContain(stopTurku)
        expect(stops).toContain(stopTampere)
        expect(stops).toContain(stopLappeenranta)
    })

    it('should be able to tell the next stop from certain spot', ()=>{
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)

        expect(busLine.getNextStopFrom(stopTurku)).toEqual(stopTampere)
        expect(busLine.getNextStopFrom(stopTampere)).toEqual(stopLappeenranta)
    })

    it('should be return null if no such stop on the way', ()=>{
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        let stopRovaniemi = new BusStop('Rovaniemi')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)

        expect(busLine.getNextStopFrom(stopRovaniemi)).toBeNull()
    })

    it('should be return null if stop is the end of the line', ()=>{
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)
        expect(busLine.getNextStopFrom(stopLappeenranta)).toBeNull()
    })

    it('should be able to answer if it stops in A and B with that order', () => {
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)
        expect(busLine.goingFromAToB(stopTurku, stopLappeenranta)).toBeTruthy();
    })

    it('should be able to answer if it wont stop in A or B or the order is wrong', () => {
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        let stopLappeenranta = new BusStop('Lappeenranta')
        let stopRovaniemi = new BusStop('Rovaniemi')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        busLine.addStop(stopLappeenranta)

        expect(busLine.goingFromAToB(stopTurku, stopRovaniemi)).toBeFalsy();
        expect(busLine.goingFromAToB(stopTampere, stopTurku)).toBeFalsy();
    })

    it('should have method to check if stops in certain bus stop' ,() => {
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        expect(busLine.doesStopIn('Turku')).toBeTruthy()
    })

    it('should have method to check if line does not stop in certain bus stop' ,() => {
        let busLine = new BusLine('Turku-Lappeenranta')
        let stopTurku = new BusStop('Turku')
        let stopTampere = new BusStop('Tampere')
        busLine.addStop(stopTurku)
        busLine.addStop(stopTampere)
        expect(busLine.doesStopIn('Lappeenranta')).toBeFalsy()
    })
})