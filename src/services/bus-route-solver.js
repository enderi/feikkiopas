import Graph from '../models/graph/graph'
import GraphNode from '../models/graph/graph-node'
import GraphEdge from '../models/graph/graph-edge'
import GraphPath from '../models/graph/graph-path'
import Constants from '../const'

/* PRIVATE FUNCS */
function comparePathsByTravelTimeAndLineChanges (path1, path2) {
  if (path1.getTotalTravelTime() < path2.getTotalTravelTime()) {
    return -1
  }
  if (path1.getTotalTravelTime() > path2.getTotalTravelTime()) {
    return 1
  }
  let lineChangesForPath1 = getLineChangeCountFromPath(path1)
  let lineChangesForPath2 = getLineChangeCountFromPath(path2)
  return lineChangesForPath1 < lineChangesForPath2 ? -1 : 1
}

function getLineChangeCountFromPath (path) {
  let lineChangeCount = 0
  const edges = path.getTraveledEdges()
  if (!edges || edges.length === 0) {
    return 0
  }
  let lineNameCursor = edges[0].getProperty(Constants.BUS_LINE_NAME)
  edges.forEach(edge => {
    if (lineNameCursor !== edge.getProperty(Constants.BUS_LINE_NAME)) {
      lineChangeCount++
      lineNameCursor = edge.getProperty(Constants.BUS_LINE_NAME)
    }
  })
  return lineChangeCount
}

function compareTravelTimesOfEdges (edge1, edge2) {
  return edge1.getTravelTime() < edge2.getTravelTime() ? -1 : 1
}

function findShortestRoutes (initialPath, targetNode) {
  let pathsToExplore = [initialPath]
  const successfulPaths = []

  while (pathsToExplore.length > 0) {
    let newSetOfPathsToExplore = []

    // Look through each path that is still alive and check if they have reached the target node
    pathsToExplore.forEach(path => {
      if (path.getCurrentNode() === targetNode) { // path found its target
        successfulPaths.push(path)
      } else { // continue exploring this path
        const edges = path.getNonVisitedEdges().sort(compareTravelTimesOfEdges)
        edges.forEach(edge => {
          const cl = path.getClone()
          cl.moveTo(edge)
          newSetOfPathsToExplore.push(cl)
        })
      }
    })

    if (successfulPaths.length > 0) { // we found at least one route to target, but there might still be shorter available
      successfulPaths.sort(comparePathsByTravelTimeAndLineChanges)

      const costOfCurrentBest = successfulPaths[0].getTotalTravelTime()
      // include paths that could be shorter or equally short
      newSetOfPathsToExplore = newSetOfPathsToExplore.filter(p => {
        return p.getTotalTravelTime() <= costOfCurrentBest
      })
    }
    pathsToExplore = newSetOfPathsToExplore
  }
  return successfulPaths
}

/* ACTUAL CLASS */
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
    this.travelTimesBetweenStops[from] = this.travelTimesBetweenStops[from] || {}
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

    matchingRoutes.sort(comparePathsByTravelTimeAndLineChanges)
    return matchingRoutes[0]
  }
}
