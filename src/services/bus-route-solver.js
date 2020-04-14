import Graph from '../models/graph/graph'
import GraphNode from '../models/graph/graph-node'
import GraphEdge from '../models/graph/graph-edge'
import GraphPath from '../models/graph/graph-path'
import Constants from '../const'

/* PRIVATE FUNCS */
function pluckDistinctLinesFromPath (path) {
  return path
    .getTraveledEdges()
    .map(edge => edge.getProperty(Constants.BUS_LINE_NAME))
    .filter((value, index, self) => {
      return self.indexOf(value) === index
    })
}

function compareTravelTimesOfEdges (edge1, edge2) {
  return edge1.getTravelTime() < edge2.getTravelTime() ? -1 : 1
}

function findShortestRoutes (initialPath, targetNode) {
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
          const cl = path.getClone()
          cl.moveTo(edge)
          newSetOfPathsToExplore.push(cl)
        })
      }
    })
    if (matchingRoutes.length > 0) {
      const costOfWinningRoute = matchingRoutes[0].getTotalTravelTime()
      // check if there are still paths that could be shorter or equally short
      newSetOfPathsToExplore = newSetOfPathsToExplore.filter(p => {
        return p.getTotalTravelTime() <= costOfWinningRoute
      })
    }
    pathsToExplore = newSetOfPathsToExplore
  }
  return matchingRoutes
}

/* DA CLASS */
export default class BusRouteSolver {
  constructor () {
    this.graph = new Graph()
    this.travelTimesBetweenStops = {}
    this.biDirectionalLines = false
  }

  setBiDirectionalLines (value) {
    this.biDirectionalLines = !!value
  }

  addStop (stopName) {
    const node = new GraphNode()
    node.setName(stopName)
    this.graph.addNode(node)
  }

  addTravelTimeBetweenStops (from, to, time) {
    this.travelTimesBetweenStops[from] =
      this.travelTimesBetweenStops[from] || {}
    this.travelTimesBetweenStops[to] = this.travelTimesBetweenStops[to] || {}

    this.travelTimesBetweenStops[from][to] = time
    this.travelTimesBetweenStops[to][from] = time
  }

  addBusLine (busLineName, stops) {
    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i]
      const to = stops[i + 1]
      const fromNode = this.graph.getNodeForName(from)
      const toNode = this.graph.getNodeForName(to)
      const edge = new GraphEdge()
      edge.setEndNode(toNode)
      edge.setTravelTime(this.travelTimesBetweenStops[from][to])
      edge.setProperty(Constants.BUS_LINE_NAME, busLineName)
      fromNode.addEdge(edge)

      if (this.biDirectionalLines) {
        const returningEdge = new GraphEdge()
        returningEdge.setEndNode(fromNode)
        returningEdge.setTravelTime(this.travelTimesBetweenStops[to][from])
        returningEdge.setProperty(Constants.BUS_LINE_NAME, busLineName)
        toNode.addEdge(returningEdge)
      }
    }
  }

  getNodes () {
    return this.graph.getNodes()
  }

  findShortestPathBetween (from, to) {
    const targetNode = this.graph.getNodeForName(to)
    const initialPath = new GraphPath()
    initialPath.setStartingNode(this.graph.getNodeForName(from))

    const matchingRoutes = findShortestRoutes(initialPath, targetNode)

    if (matchingRoutes.length === 0) {
      throw new Error('No route found')
    }
    // sort all routes by travel time and least bus line changes
    matchingRoutes.sort((path1, path2) => {
      if (path1.getTotalTravelTime() < path2.getTotalTravelTime()) {
        return -1
      }

      if (path1.getTotalTravelTime() > path2.getTotalTravelTime()) {
        return 1
      }
      let lineChangesForPath1 = pluckDistinctLinesFromPath(path1)
      let lineChangesForPath2 = pluckDistinctLinesFromPath(path2)
      return lineChangesForPath1.length < lineChangesForPath2.length ? -1 : 1
    })

    return matchingRoutes[0]
  }
}
