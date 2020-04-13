export default class BusLine {
    constructor(name) {
        this.name = name;
        this.stops = []
    }

    getName() {
        return this.name
    }

    addStop(stop) {
        this.stops.push(stop)
    }

    getStops() {
        return this.stops
    }

    doesStopIn(stopName) {
        const stopFound = this.stops.find(stop => stop.getName() === stopName);
        return !!stopFound;
    }

    getNextStopFrom(stop) {
        const indexOfStop = this.stops.indexOf(stop);
        if(indexOfStop > -1 && indexOfStop + 1 <this.stops.length){
            return this.stops[indexOfStop + 1]
        }
        return null;
    }

    goingFromAToB(firstStop, secondStop) {
        const firstStopIndex = this.stops.indexOf(firstStop);
        const secondStopIndex = this.stops.indexOf(secondStop);
        if(firstStopIndex > -1 && secondStopIndex > -1 && firstStopIndex < secondStopIndex){
            return true;
        }
        return false;
    }
}