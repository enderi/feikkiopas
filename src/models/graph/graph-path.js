export default class GraphPath {
    constructor(){
        this.traveledEdges = []
    }

    getClone() {
        let clone = new GraphPath()
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
    
    getAvailableEdges(){
        let visitedNodes = this.getVisitedNodes()
        return this.currentNode.getEdgesByTravelTime().filter(edge => visitedNodes.indexOf(edge.getEndNode()) === -1)
    }

    moveTo(edge) {
        let edgeFound = this.currentNode.getEdges().find(e => e === edge)
        if(edgeFound){
            this.currentNode = edgeFound.getEndNode()
            this.traveledEdges.push(edgeFound)
        }else {
            throw new Error('No such edge for current node')
        }
    }

    moveBack(){
        if(this.traveledEdges.length === 0) {
            throw new Error('Cannot go back anymore')
        }
        this.traveledEdges.pop()
    }

    getVisitedNodes(){
        let visitedNodes = [this.startingNode]
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

    getClearLanguageObject() {
        let steps = []
        let cursor = this.startingNode
        this.traveledEdges.forEach(edge=>{
            let objToAdd = {
                from: cursor.getName(),
                to: edge.getEndNode().getName(),
                with: edge.getPropertyForKey('busLineName'),
                travelTime: edge.getTravelTime()
            }
            steps.push(objToAdd)
            cursor = edge.getEndNode()
        })
        return steps
    }
}