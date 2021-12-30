export const convertToGraph = (edges, withLabels = false) => {
    const graph = {
        nodes: [],
        edges: [],
    };

    edges.forEach((edge) => {
        edge = edge.split(" ");
        const from = Number(edge[0]);
        const to = Number(edge[1]);
        const label = withLabels ? edge[2] : "";

        // check if graph already has this node
        if (graph.nodes.findIndex((node) => node.id === from) === -1) {
            graph.nodes.push({
                id: from,
                label: "" + from,
            });
        }

        if (graph.nodes.findIndex((node) => node.id === to) === -1) {
            graph.nodes.push({
                id: to,
                label: "" + to,
            });
        }

        graph.edges.push({
            from: from,
            to: to,
            label: withLabels ? label : "",
        });
    });

    return graph;
};
