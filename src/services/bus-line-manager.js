import BusStop from '../models/bus-stop'
import Road from '../models/road'
import BusLine from '../models/bus-line'
import BusRouteSolver from './bus-route-solver'

export default class BusLineManager {
  constructor () {
    this.stops = []
    this.roads = []
    this.busLines = []
  }

  addBusStop (busStopName) {
    if (this.stops.find(stop => stop.getName() === busStopName)) {
      throw new Error('Bus stop name already exists')
    }
    const busStop = new BusStop(busStopName)
    this.stops.push(busStop)

    return busStop
  }

  findBusStopByName (busStopName) {
    return this.stops.find(stop => stop.getName() === busStopName)
  }

  findOrCreateBusStop (busStopName) {
    const doesItExist = this.findBusStopByName(busStopName)
    if (doesItExist) {
      return doesItExist
    }
    return this.addBusStop(busStopName)
  }

  getBusStops () {
    return this.stops
  }

  addRoadBetweenStops (stopNameA, stopNameB, travelTime) {
    const firstStop = this.findOrCreateBusStop(stopNameA)
    const secondStop = this.findOrCreateBusStop(stopNameB)
    const road = new Road(firstStop, secondStop, travelTime)
    this.roads.push(road)
    return road
  }

  getRoads () {
    return this.roads
  }

  addBusLine (busLineName, stopNames) {
    if (this.busLines.find(line => line.getName() === busLineName)) {
      throw new Error('Line already exists')
    }
    const busLine = new BusLine(busLineName)

    stopNames.forEach(stopName => {
      const busStop = this.findOrCreateBusStop(stopName)
      busLine.addStop(busStop)
    })
    this.busLines.push(busLine)
  }

  getBusLines () {
    return this.busLines
  }

  getRouteSolver (useBiDirectionalLines) {
    const routeSolver = new BusRouteSolver()
    routeSolver.setBiDirectionalLines(useBiDirectionalLines)
    this.stops.forEach(stop => routeSolver.addStop(stop.name))
    this.roads.forEach(road =>
      routeSolver.addTravelTimeBetweenStops(
        road.getStartBusStop().getName(),
        road.getEndBusStop().getName(),
        road.getTravelTime()
      )
    )
    this.busLines.forEach(busLine => {
      const busStops = busLine.getStops().map(busStop => busStop.getName())
      routeSolver.addBusLine(busLine.getName(), busStops)
    })
    return routeSolver
  }
}
