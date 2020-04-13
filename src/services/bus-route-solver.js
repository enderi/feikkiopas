import Graph from '../models/graph/graph'
import GraphNode from '../models/graph/graph-node'
import GraphEdge from '../models/graph/graph-edge'
import GraphPath from '../models/graph/graph-path'

/* PRIVATE FUNCS */
function pluckLineChangesFromPath(path){
    return path
        .getTraveledEdges()
        .map(edge => edge.getPropertyForKey('busLineName'))
        .filter((value, index, self) => {
            return self.indexOf(value) === index
        })
}

function compareTravelTimesOfEdges(edge1, edge2) {
    return edge1.getTravelTime() < edge2.getTravelTime() ? -1 : 1
}

function findShortestRoutes(initialPath, targetNode){
    let pathsToExplore = [initialPath]
    const matchingRoutes = []
    while (pathsToExplore.length > 0) {
        let newSetOfPathsToExplore = []

        pathsToExplore.forEach(path => {
            if (path.getCurrentNode() === targetNode) {
                matchingRoutes.unshift(path) // shortest paths should always be in smaller indexes
            } else {
                const edges = path.getNonVisitedEdges().sort(compareTravelTimesOfEdges)
                edges.forEach(edge => {
                    const cl = path.getClone();
                    cl.moveTo(edge)
                    newSetOfPathsToExplore.push(cl)
                })
            }
        })
        if(matchingRoutes.length > 0){
            const costOfWinningRoute = matchingRoutes[0].getTotalTravelTime()
            // check if there are still paths that could be shorter or equally short
            const stillToDiscover = [];
            newSetOfPathsToExplore.forEach(p => {
                if(p.getTotalTravelTime() <= costOfWinningRoute){
                    stillToDiscover.push(p)
                }
            })
            newSetOfPathsToExplore = stillToDiscover
        }
        pathsToExplore = newSetOfPathsToExplore
    }
    return matchingRoutes
}

/* DA CLASS */
export default class BusRouteSolver {
    constructor() {
        this.graph = new Graph()
        this.travelTimesBetweenStops = {}
    }

    addStop(stopName){
        const node = new GraphNode();
        node.setName(stopName)
        this.graph.addNode(node)
    }

    addTravelTimeBetweenStops(from, to, time){
        this.travelTimesBetweenStops[from] = this.travelTimesBetweenStops[from] || {}
        this.travelTimesBetweenStops[to] = this.travelTimesBetweenStops[to] || {}

        this.travelTimesBetweenStops[from][to] = time
        this.travelTimesBetweenStops[to][from] = time
    }

    addBusLine(busLineName, stops){
        for (let i = 0; i < stops.length - 1; i++) {
            const from = stops[i];
            const to = stops[i + 1];
            const fromNode = this.graph.getNodeForName(from);
            const toNode = this.graph.getNodeForName(to);
            const edge = new GraphEdge();
            edge.setEndNode(toNode)
            edge.setTravelTime(this.travelTimesBetweenStops[from][to])
            edge.setPropertyForKey('busLineName', busLineName)
            fromNode.addEdge(edge)
        }
    }

    getNodes() {
        return this.graph.getNodes()
    }

    findShortestPathBetween(from, to) {
        const targetNode = this.graph.getNodeForName(to);
        const initialPath = new GraphPath();
        initialPath.setStartingNode(this.graph.getNodeForName(from))

        const matchingRoutes = findShortestRoutes(initialPath, targetNode)

        if (matchingRoutes.length === 0) {
            throw new Error('No route found')
        }
        // sort all routes by travel time and least bus line changes
        matchingRoutes.sort((path1, path2) => {
            if(path1.getTotalTravelTime() < path2.getTotalTravelTime()){
                return -1
            }

            if(path1.getTotalTravelTime() > path2.getTotalTravelTime()){
                return 1
            }
            let lineChangesForPath1 = pluckLineChangesFromPath(path1)
            let lineChangesForPath2 = pluckLineChangesFromPath(path2)
            return lineChangesForPath1.length < lineChangesForPath2.length ? -1 : 1
        })

        return matchingRoutes[0]
    }

}