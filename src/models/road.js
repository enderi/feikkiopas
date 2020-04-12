export default class Road {
    constructor(from, to, travelTime){
        this.from = from
        this.to = to
        this.travelTime = travelTime
    }

    getStartBusStop() {
        return this.from
    }
    
    getEndBusStop() {
        return this.to
    }

    getTravelTime() {
        return this.travelTime
    }
}
