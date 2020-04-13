import Graph from "../../src/models/graph/graph";
import GraphNode from "../../src/models/graph/graph-node";
import GraphEdge from "../../src/models/graph/graph-edge";

describe('Graph', () => {
    it('should exist', () => {
        expect(Graph).not.toBeNull();
    })

    it('should have knowledge of existing nodes', () => {
        const graph = new Graph();
        const node = new GraphNode();
        node.setName('First')
        graph.addNode(node)

        expect(graph.getNodes()).toHaveLength(1)
    })

    it('should be able to find a node by name', () => {
        const graph = new Graph();
        const node = new GraphNode();
        node.setName('First')
        graph.addNode(node)

        const isItFoundable = graph.getNodeForName('First');
        expect(isItFoundable).toEqual(node)
    });

    it('should be throw error if trying to get nonexisting node', () => {
        const graph = new Graph();
        const node = new GraphNode();
        node.setName('First')
        graph.addNode(node)

        expect(()=>{
            const isItFoundable = graph.getNodeForName('Secondo');
        }).toThrow()
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

    it('should be able to create a graph that creates a circle', () => {
        const graph = buildGraph();

        // start a path
        const step0 = graph.getNodeForName('First');
        const step1 = step0.getEdgesByTravelTime()[0].getEndNode();
        const step2 = step1.getEdgesByTravelTime()[0].getEndNode();
        const step3 = step2.getEdgesByTravelTime()[0].getEndNode();

        expect(step0.getName()).toEqual('First')
        expect(step1.getName()).toEqual('Second')
        expect(step2.getName()).toEqual('Third')
        expect(step3.getName()).toEqual('First')
    });

    it('should be possible to count TravelTime of the route', ()=>{
        const graph = buildGraph();

        const step0 = graph.getNodeForName('First');

        const edge1 = step0.getEdgesByTravelTime()[0];
        const step1 = edge1.getEndNode();
        const edge2 = step1.getEdgesByTravelTime()[0];
        const step2 = edge2.getEndNode();
        const edge3 = step2.getEdgesByTravelTime()[0];
        const step3 = edge3.getEndNode();

        const totalTravelTime = edge1.getTravelTime() + edge2.getTravelTime() + edge3.getTravelTime();
        expect(totalTravelTime).toEqual(222)
    })
})