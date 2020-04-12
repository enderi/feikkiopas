export default class BusLineEdge {
    constructor() {
    }

    setTravelTime(travelTime) {
        this.travelTime = travelTime
    }

    getTravelTime() {
        return this.travelTime
    }

    setOwnerBusLine(busLine){
        this.owner = busLine
    }

    getOwnerBusLine(){
        return this.owner
    }

    setStartBusStop(busStop){
        this.startBusStop = busStop
    }
    
    getStartBusStop() {
        return this.startBusStop
    }

    setEndBusStop(busStop){
        this.endBusStop = busStop
    }
    
    getEndBusStop() {
        return this.endBusStop
    }
}
