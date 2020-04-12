export default class GraphNode {
    constructor(){
        this.edges = []
    }
    
    setName(name){
        this.name = name
    }

    getName() {
        return this.name
    }
    
    addEdge(edge){
        this.edges.push(edge)
    }
    
    getEdges(){
        return this.edges
    }
    getEdgesByTravelTime(){
        return this.edges.sort((a, b) => {
            return a.getTravelTime() < b.getTravelTime() ? -1 : 1
        });
    }

}