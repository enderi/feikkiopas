import GraphPath from "../../src/models/graph/graph-path";
import GraphNode from "../../src/models/graph/graph-node";
import Graph from "../../src/models/graph/graph";
import GraphEdge from "../../src/models/graph/graph-edge";

describe('Graph Path', () => {
    it('should exist', () => {
        expect(GraphPath).not.toBeNull();
    })

    it('should have a starting node', ()=>{
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        expect(graphPath.getStartingNode()).toEqual(startingNode)
    })

    it('should know the current node', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        expect(graphPath.getCurrentNode()).toEqual(startingNode)
    });

    it('should have method to get possible edges to move', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        const availableEdges = graphPath.getNonVisitedEdges();
        expect(availableEdges).toHaveLength(1)
        expect(availableEdges[0].getTravelTime()).toEqual(2)
        expect(availableEdges[0].getEndNode()).toEqual(graph.getNodeForName('Second'))
    });

    it('should be able to move to next node', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        const availableEdges = graphPath.getNonVisitedEdges();

        graphPath.moveTo(availableEdges[0])
        const secondNode = graph.getNodeForName('Second');

        expect(graphPath.getCurrentNode()).toEqual(secondNode)
    });

    it('should throw an error if attempting to move via illegal edge', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const secondNode = graph.getNodeForName('Second');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        const illegalEdge = secondNode.getEdges();
        expect(()=> {
            graphPath.moveTo(illegalEdge[0])
        }).toThrow()
    });

    it('should have a history of visited nodes', ()=>{
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)

        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])

        expect(graphPath.getVisitedNodes()).toHaveLength(2)
    })

    it('should not show already visited nodes as available options', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        let nextMoves = graphPath.getNonVisitedEdges()
        graphPath.moveTo(nextMoves[0])
        nextMoves = graphPath.getNonVisitedEdges()
        graphPath.moveTo(nextMoves[0])

        nextMoves = graphPath.getNonVisitedEdges()
        expect(graphPath.getCurrentNode().getName()).toEqual('Third')
        expect(nextMoves).toHaveLength(0)
    });

    it('should understand that two edges may go to same node and still not allow to move there', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)

        const secondEdgeFrom3to1 = new GraphEdge();
        secondEdgeFrom3to1.setEndNode(graph.getNodeForName('First'))
        secondEdgeFrom3to1.setTravelTime(4)
        graph.getNodeForName('Third').addEdge(secondEdgeFrom3to1)

        let nextMoves = graphPath.getNonVisitedEdges()
        graphPath.moveTo(nextMoves[0])
        nextMoves = graphPath.getNonVisitedEdges()
        graphPath.moveTo(nextMoves[0])
        nextMoves = graphPath.getNonVisitedEdges()

        expect(graphPath.getCurrentNode().getName()).toEqual('Third')
        expect(nextMoves).toHaveLength(0)
    });

    it('should be able to return total time that traveling has taken already', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        let nextMove = graphPath.getNonVisitedEdges()[0]
        graphPath.moveTo(nextMove)
        nextMove = graphPath.getNonVisitedEdges()[0]
        graphPath.moveTo(nextMove)
        expect(graphPath.getTotalTravelTime()).toEqual(22)

    });

    it('should know the edges it has traveled', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        let nextMove = graphPath.getNonVisitedEdges()[0]
        graphPath.moveTo(nextMove)
        nextMove = graphPath.getNonVisitedEdges()[0]
        graphPath.moveTo(nextMove)
        const traveledEdges = graphPath.getTraveledEdges();
        expect(traveledEdges).toHaveLength(2)
        expect(traveledEdges[0].getPropertyForKey('busLine')).toEqual('Highway Star')
    });

    it('should be able to go back to previous node', () => {

        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)

        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])
        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])

        expect(graphPath.getVisitedNodes()).toHaveLength(3)
        
        graphPath.moveBack()
        expect(graphPath.getVisitedNodes()).toHaveLength(2)
        graphPath.moveBack()
        expect(graphPath.getVisitedNodes()).toHaveLength(1)
        
    });

    it('should be able to return clone of itself', () => {

        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        
        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])
        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])

        expect(graphPath.getVisitedNodes()).toHaveLength(3)

        const clone = graphPath.getClone();
        expect(clone.getVisitedNodes()).toHaveLength(3)
        expect(clone).toMatchObject(graphPath)
    });

    it('should have a method for getting easy-to-read object', () => {
        const graph = buildGraph();
        const startingNode = graph.getNodeForName('First');
        const graphPath = new GraphPath();
        graphPath.setStartingNode(startingNode)
        
        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])
        graphPath.moveTo(graphPath.getNonVisitedEdges()[0])

        const easyToRead = graphPath.getAsSimpleArray();
        expect(easyToRead).toHaveLength(2)
        expect(easyToRead[0].from).toEqual('First')
        expect(easyToRead[1].from).toEqual('Second')
    });
    
    function buildGraph(){
        const graph = new Graph();
        const node1 = new GraphNode();
        node1.setName('First')
        const node2 = new GraphNode();
        node2.setName('Second')
        const node3 = new GraphNode();
        node3.setName('Third')

        graph.addNode(node1)
        graph.addNode(node2)
        graph.addNode(node3)

        const edge1to2 = new GraphEdge();
        edge1to2.setEndNode(node2)
        edge1to2.setTravelTime(2)
        edge1to2.setPropertyForKey('busLine', 'Highway Star')
        node1.addEdge(edge1to2)

        const edge2to3 = new GraphEdge();
        edge2to3.setEndNode(node3)
        edge2to3.setTravelTime(20)
        node2.addEdge(edge2to3)

        const edge3to1 = new GraphEdge();
        edge3to1.setEndNode(node1)
        edge3to1.setTravelTime(200)
        node3.addEdge(edge3to1)
        return graph
    }
})