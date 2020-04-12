import BusLineManager from './bus-line-manager'
import Graph from '../models/graph/graph'
import GraphNode from '../models/graph/graph-node'
import GraphEdge from '../models/graph/graph-edge'
import GraphPath from '../models/graph/graph-path'


export default class BusRouteSolver {
    constructor() {
        this.busLineManager = new BusLineManager()
        this.graph = new Graph()
        this.travelTimesBetweenStops = {}
    }

    addStop(stop){
        let node = new GraphNode()
        node.setName(stop)
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
            let from = stops[i]
            let to = stops[i + 1]
            let fromNode = this.graph.getNodeForName(from)
            let toNode = this.graph.getNodeForName(to)
            let edge = new GraphEdge()
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
        let path = new GraphPath()
        let targetNode = this.graph.getNodeForName(to)
        path.setStartingNode(this.graph.getNodeForName(from))

        let paths = [path]
        let winningRoute = null

        while (paths.length > 0) {
            let newSetOfPaths = []
            
            paths.forEach(p => {
                if (p.getCurrentNode() === targetNode) {
                    winningRoute = p
                } else {
                    let edges = p.getAvailableEdges()
                    edges.forEach(e => {
                        let cl = p.getClone()
                        cl.moveTo(e)
                        newSetOfPaths.push(cl)
                    })
                }
            })
            if(winningRoute){
                let costOfWinningRoute = winningRoute.getTotalTravelTime()
                // check if there are still paths that could be shorter
                let stillToDiscover = []
                newSetOfPaths.forEach(p => {
                    if(p.getTotalTravelTime() < costOfWinningRoute){
                        stillToDiscover.push(p)
                    }
                })
                newSetOfPaths = stillToDiscover
            }
            paths = newSetOfPaths
        }
        if (!winningRoute) {
            throw new Error('No route found')
        }
        return winningRoute
    }

}