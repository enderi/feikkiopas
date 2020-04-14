export default class GraphPath {
    constructor(){
        this.traveledEdges = []
    }

    getClone() {
        const clone = new GraphPath();
        clone.setStartingNode(this.getStartingNode())
        this.getTraveledEdges().forEach(edge => clone.moveTo(edge))
        return clone
    }

    setStartingNode(startingNode){
        this.startingNode = startingNode
        this.currentNode = startingNode
    }

    getStartingNode() {
        return this.startingNode
    }

    getCurrentNode(){
        return this.currentNode
    }
    
    getNonVisitedEdges(){
        const visitedNodes = this.getVisitedNodes();
        return this.currentNode
            .getEdges()
            .filter(edge => visitedNodes.indexOf(edge.getEndNode()) === -1)
    }

    moveTo(edge) {
        const edgeFound = this.currentNode.getEdges().find(e => e === edge);
        if(edgeFound){
            this.currentNode = edgeFound.getEndNode()
            this.traveledEdges.push(edgeFound)
        }else {
            throw new Error('No such edge for current node')
        }
    }

    getVisitedNodes(){
        const visitedNodes = [this.startingNode];
        this.traveledEdges.forEach(edge => visitedNodes.push(edge.getEndNode()))
        return visitedNodes
    }

    getTraveledEdges() {
        return this.traveledEdges
    }

    getTotalTravelTime() {
        let sum = 0
        this.traveledEdges.forEach(edge => sum += edge.getTravelTime())
        return sum
    }

    getAsSimpleArray() {
        const steps = [];
        let cursor = this.startingNode
        this.traveledEdges.forEach(edge=>{
            const objToAdd = {
                from: cursor.getName(),
                to: edge.getEndNode().getName(),
                travelTime: edge.getTravelTime(),
                props: edge.getProperties()
            };
            steps.push(objToAdd)
            cursor = edge.getEndNode()
        })
        return steps
    }
}