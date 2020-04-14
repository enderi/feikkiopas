export default class GraphEdge {
    constructor() {
        this.properties = {}
    }
    
    setTravelTime(time){
        this.travelTime = time
    }

    getTravelTime() {
        return this.travelTime
    }

    setEndNode(node){
        this.endNode = node
    }

    getEndNode(){
        return this.endNode
    }

    setProperty(key, value){
        this.properties[key] = value
    }

    getProperty(key) {
        return this.properties[key]
    }

    getProperties() {
        return this.properties
    }
}