import GraphEdge from "../../src/models/graph/graph-edge";
import GraphNode from "../../src/models/graph/graph-node";

describe('Graph Edge', () => {
    it('should exist', () => {
        expect(GraphEdge).not.toBeNull();
    })

    it('should have a travel time', () => {
        let graphEdge = new GraphEdge()
        graphEdge.setTravelTime(15)

        expect(graphEdge.getTravelTime()).toEqual(15)
    });

    it('should know its end node', () => {
        let graphEdge = new GraphEdge()
        let endNode = new GraphNode()
        endNode.setName('end noode')
        graphEdge.setEndNode(endNode)

        expect(graphEdge.getEndNode()).toEqual(endNode)
    });

    it('should be able to store additional properties in key value pairs', () => {
        let graphEdge = new GraphEdge()
        let endNode = new GraphNode()
        endNode.setName('end noode')
        graphEdge.setEndNode(endNode)
        graphEdge.setPropertyForKey('prop1', 'some prop')
        let propObject = {key: 'val'}
        graphEdge.setPropertyForKey('prop2', propObject)
        expect(graphEdge.getPropertyForKey('prop1')).toEqual('some prop')
        expect(graphEdge.getPropertyForKey('prop2')).toEqual(propObject)
    });
})