export default class Graph {
    constructor() {
        this.nodes = []
    }

    addNode(node) {
        this.nodes.push(node)
    }

    getNodes() {
        return this.nodes
    }

    getNodeForName(name) {
        let nodeForName = this.nodes.find(node => node.getName() === name)
        if (nodeForName) {
            return nodeForName
        }
        throw new Error('Node ' + name + ' does not exist')
    }
}