import BusStop from '../models/bus-stop'
import Road from '../models/road'
import BusLine from '../models/bus-line'
import BusRouteSolver from './bus-route-solver'

export default class BusLineManager {
    constructor() {
        this.stops = []
        this.roads = []
        this.busLines = []
    }

    addBusStop(busStopName){
        if(this.stops.find(stop => stop.getName() === busStopName)){
            throw new Error('Stop name already exists')
        }
        let busStop = new BusStop(busStopName)
        this.stops.push(busStop)
        return busStop
    }

    findBusStopByName(busStopName){
        return this.stops.find(stop => stop.getName() === busStopName)
    }

    findOrCreateBusStop(busStopName){
        let doesItExist = this.findBusStopByName(busStopName)
        if(doesItExist) {
            return doesItExist
        }
        return this.addBusStop(busStopName)
    }

    getBusStops() {
        return this.stops
    }

    addRoadBetweenStops(stopNameA, stopNameB, travelTime){
        let firstStop = this.findOrCreateBusStop(stopNameA)
        let secondStop =this.findOrCreateBusStop(stopNameB)
        let road = new Road(firstStop, secondStop, travelTime)
        this.roads.push(road)
        return road;    
    }

    getRoads() {
        return this.roads
    }

    addBusLine(busLineName, stopNames){
        if(this.busLines.find(line => line.getName() === busLineName)){
            throw new Error('Line already exists')
        }
        let busLine = new BusLine(busLineName)
        
        stopNames.forEach(stopName=> {
            let busStop = this.findOrCreateBusStop(stopName)
            busLine.addStop(busStop)
        })
        this.busLines.push(busLine)
    }

    getBusLines(){
        return this.busLines
    }

    getAllLinesForStop(stopName) {
        let linesThatStopIn = this.busLines.filter(l => l.doesStopIn(stopName))
        return linesThatStopIn         
    }

    getRouteSolver(){
        let routeSolver = new BusRouteSolver()
        this.stops.forEach(stop=>routeSolver.addStop(stop.name))
        this.roads.forEach(road=>routeSolver.addTravelTimeBetweenStops(
            road.getStartBusStop().getName(),
            road.getEndBusStop().getName(),
            road.getTravelTime()))
        this.busLines.forEach(busLine => {
            let stops = []
            busLine.getStops().forEach(st => stops.push(st.getName()))
            routeSolver.addBusLine(busLine.getName(), stops)
        })
        return routeSolver
    }
}
