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
}