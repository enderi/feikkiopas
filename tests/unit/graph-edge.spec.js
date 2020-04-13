import GraphEdge from "../../src/models/graph/graph-edge";
import GraphNode from "../../src/models/graph/graph-node";

describe('Graph Edge', () => {
    it('should exist', () => {
        expect(GraphEdge).not.toBeNull();
    })

    it('should have a travel time', () => {
        const graphEdge = new GraphEdge();
        graphEdge.setTravelTime(15)

        expect(graphEdge.getTravelTime()).toEqual(15)
    });

    it('should know its end node', () => {
        const graphEdge = new GraphEdge();
        const endNode = new GraphNode();
        endNode.setName('end noode')
        graphEdge.setEndNode(endNode)

        expect(graphEdge.getEndNode()).toEqual(endNode)
    });

    it('should be able to store additional properties in key value pairs', () => {
        const graphEdge = new GraphEdge();
        const endNode = new GraphNode();
        endNode.setName('end noode')
        graphEdge.setEndNode(endNode)
        graphEdge.setPropertyForKey('prop1', 'some prop')
        const propObject = {key: 'val'};
        graphEdge.setPropertyForKey('prop2', propObject)
        expect(graphEdge.getPropertyForKey('prop1')).toEqual('some prop')
        expect(graphEdge.getPropertyForKey('prop2')).toEqual(propObject)
    });

    it('should have a method to return all props', () => {
        const graphEdge = new GraphEdge();
        graphEdge.setPropertyForKey('testing', 'one-two-three')

        const props = graphEdge.getProperties()
        expect(props['testing']).toEqual('one-two-three')
    })
})