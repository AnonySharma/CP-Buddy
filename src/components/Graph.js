import {Component} from "react";
import GraphComponent from "../utils/visGraph";
import {convertToGraph} from "../utils/utils";

// const dummy = {
//     nodes: [
//         {id: 1, label: "Node 1"},
//         {id: 2, label: "Node 2"},
//         {id: 3, label: "Node 3"},
//     ],
//     edges: [
//         {from: 1, to: 2},
//         {from: 2, to: 3},
//         {from: 3, to: 1},
//     ],
// };

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            graph: {
                nodes: [],
                edges: [],
            },
        };
    }

    processData = (edges) => {
        var data = convertToGraph(edges);
        console.log(data);
        this.setState({
            graph: data,
        });
    };

    componentDidMount() {
        const {data} = this.props;
        this.processData(data);
    }

    componentDidUpdate(prevProps) {
        const {data} = this.props;
        if (data !== prevProps.data) {
            this.processData(data);
        }
    }

    render() {
        const {graph} = this.state;
        const {isDirected} = this.props;

        return (
            <div
                style={{
                    backgroundColor: "#eee",
                    marginTop: "1rem",
                }}
            >
                <GraphComponent
                    graph={graph}
                    options={{
                        height: "500px",
                        // layout: {
                        //     hierarchical: true,
                        // },
                        edges: {
                            color: "#000",
                            arrows: {
                                to: {
                                    enabled: isDirected,
                                },
                            },
                            smooth: {
                                type: "dynamic",
                            },
                        },
                    }}
                />
                {/* <GraphComponent graph={dummy} /> */}
            </div>
        );
    }
}

export default Graph;
