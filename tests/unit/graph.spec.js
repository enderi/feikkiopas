import Graph from "../../src/models/graph/graph";
import GraphNode from "../../src/models/graph/graph-node";
import GraphEdge from "../../src/models/graph/graph-edge";

describe('Graph', () => {
    it('should exist', () => {
        expect(Graph).not.toBeNull();
    })

    it('should have knowledge of existing nodes', () => {
        let graph = new Graph()
        let node = new GraphNode()
        node.setName('First')
        graph.addNode(node)

        expect(graph.getNodes()).toHaveLength(1)
    })

    it('should be able to find a node by name', () => {
        let graph = new Graph()
        let node = new GraphNode()
        node.setName('First')
        graph.addNode(node)

        let isItFoundable = graph.getNodeForName('First')
        expect(isItFoundable).toEqual(node)
    });

    it('should be throw error if trying to get nonexisting node', () => {
        let graph = new Graph()
        let node = new GraphNode()
        node.setName('First')
        graph.addNode(node)

        expect(()=>{
            let isItFoundable = graph.getNodeForName('Secondo')
        }).toThrow()
    });

    function buildGraph(){
        let graph = new Graph()
        let node1 = new GraphNode()
        node1.setName('First')
        let node2 = new GraphNode()
        node2.setName('Second')
        let node3 = new GraphNode()
        node3.setName('Third')

        graph.addNode(node1)
        graph.addNode(node2)
        graph.addNode(node3)

        let edge1to2 = new GraphEdge()
        edge1to2.setEndNode(node2)
        edge1to2.setTravelTime(2)
        node1.addEdge(edge1to2)

        let edge2to3 = new GraphEdge()
        edge2to3.setEndNode(node3)
        edge2to3.setTravelTime(20)
        node2.addEdge(edge2to3)

        let edge3to1 = new GraphEdge()
        edge3to1.setEndNode(node1)
        edge3to1.setTravelTime(200)
        node3.addEdge(edge3to1)
        return graph
    }

    it('should be able to create a graph that creates a circle', () => {
        let graph = buildGraph()

        // start a path
        let step0 = graph.getNodeForName('First')
        let step1 = step0.getEdgesByTravelTime()[0].getEndNode()
        let step2 = step1.getEdgesByTravelTime()[0].getEndNode()
        let step3 = step2.getEdgesByTravelTime()[0].getEndNode()
        
        expect(step0.getName()).toEqual('First')
        expect(step1.getName()).toEqual('Second')
        expect(step2.getName()).toEqual('Third')
        expect(step3.getName()).toEqual('First')
    });

    it('should be possible to count TravelTime of the route', ()=>{
        let graph = buildGraph()

        let step0 = graph.getNodeForName('First')

        let edge1 = step0.getEdgesByTravelTime()[0]
        let step1 = edge1.getEndNode()
        let edge2 = step1.getEdgesByTravelTime()[0]
        let step2 = edge2.getEndNode()
        let edge3 = step2.getEdgesByTravelTime()[0]
        let step3 = edge3.getEndNode()

        let totalTravelTime = edge1.getTravelTime() + edge2.getTravelTime() + edge3.getTravelTime()
        expect(totalTravelTime).toEqual(222)
    })
})