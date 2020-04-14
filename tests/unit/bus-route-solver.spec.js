import BusRouteSolver from '../../src/services/bus-route-solver'
import BusLineInfo from '../resources/test-bus-info.json'
import SplitEdgeCase from '../resources/split-edge-case.json'
import TwoStopRoute from '../resources/two-stop-route.json'
import Constants from '../../src/const'

describe('Bus Route Solver', () => {
    it('should exist', () => {
        expect(BusRouteSolver).not.toBeNull();
    })

    it('should read test data and have some stops', () => {
        const solver = buildSolver(BusLineInfo);
        expect(solver.getNodes().length).toBeGreaterThan(0)
    })

    it('should have an option to enable two way routes', ()=>{
        const solver = buildSolver(TwoStopRoute, true)
        const nodes = solver.getNodes()
        expect(nodes).toHaveLength(2)
        expect(nodes[0].getEdges()).toHaveLength(1)
        expect(nodes[1].getEdges()).toHaveLength(1)
    })

    it('should find a path from A to D', () => {
        const solver = buildSolver(BusLineInfo);
        const path = solver.findShortestPathBetween('A', 'D');
        expect(path.getTotalTravelTime()).toEqual(4)
    })

    it('should prefer current bus line when next edge has same travel time', () => {
        const solver = buildSolver(SplitEdgeCase)
        const path = solver.findShortestPathBetween('L', 'N')
        expect(path.getTotalTravelTime()).toEqual(3)
        const traveledEdges = path.getTraveledEdges()
        const line1 = traveledEdges[0].getProperty(Constants.BUS_LINE_PROPERTY)
        const line2 = traveledEdges[1].getProperty(Constants.BUS_LINE_PROPERTY)
        expect(line1).toEqual(line2)
    })

    function buildSolver(data, biDirectionalLines) {
        const routeSolver = new BusRouteSolver();
        routeSolver.setBiDirectionalLines(biDirectionalLines)
        data.pysakit.forEach(stop => routeSolver.addStop(stop))
        data.tiet.forEach(road => routeSolver.addTravelTimeBetweenStops(
            road.mista,
            road.mihin,
            road.kesto))
        const busLineNames = Object.keys(data.linjastot);
        busLineNames.forEach(busLineName => {
            routeSolver.addBusLine(busLineName, data.linjastot[busLineName])
        })
        return routeSolver
    }
})