import BusRouteSolver from '../../src/services/bus-route-solver'
import BusLineInfo from '../resources/test-bus-info.json'

describe('Bus Route Solver', () => {
    it('should exist', () => {
        expect(BusRouteSolver).not.toBeNull();
    })

    it('should read test data and have some stops', () => {
        let solver = buildSolver(BusLineInfo)
        expect(solver.getNodes().length).toBeGreaterThan(0)
    })

    it('should find a path from A to D', () => {
        let solver = buildSolver(BusLineInfo)
        let path = solver.findShortestPathBetween('A', 'D')
        expect(path.getTotalTravelTime()).toEqual(4)
    })

    function buildSolver(data) {
        let routeSolver = new BusRouteSolver()
        data.pysakit.forEach(stop => routeSolver.addStop(stop))
        data.tiet.forEach(road => routeSolver.addTravelTimeBetweenStops(
            road.mista,
            road.mihin,
            road.kesto))
        let busLineNames = Object.keys(data.linjastot)
        busLineNames.forEach(busLineName => {
            routeSolver.addBusLine(busLineName, data.linjastot[busLineName])
        })
        return routeSolver
    }
})