import GraphNode from "../../src/models/graph/graph-node";
import GraphEdge from "../../src/models/graph/graph-edge";

describe('Graph Node', () => {
    it('should exist', () => {
        expect(GraphNode).not.toBeNull();
    })

    it('should have a name', () => {
        const graphNode = new GraphNode();
        graphNode.setName('hiiohei')
        expect(graphNode.getName()).toEqual('hiiohei')
    })

    it('should know edges leaving it', () => {
        const graphNode = new GraphNode();
        const graphEdge = new GraphEdge();
        graphNode.addEdge(graphEdge)

        expect(graphNode.getEdges()).toHaveLength(1)
    });


    it('should be able to return edges sorted by travel time', () => {
        const graphNode = new GraphNode();
        let graphEdge = new GraphEdge()
        graphEdge.setTravelTime(10)
        graphNode.addEdge(graphEdge)

        graphEdge = new GraphEdge()
        graphEdge.setTravelTime(1)
        graphNode.addEdge(graphEdge)

        graphEdge = new GraphEdge()
        graphEdge.setTravelTime(20)
        graphNode.addEdge(graphEdge)

        const edgesByTravelTime = graphNode.getEdgesByTravelTime();
        expect(edgesByTravelTime).toHaveLength(3)
        expect(edgesByTravelTime[0].getTravelTime()).toEqual(1)
        expect(edgesByTravelTime[1].getTravelTime()).toEqual(10)
        expect(edgesByTravelTime[2].getTravelTime()).toEqual(20)
    });
})