import {Component} from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Snackbar,
    Alert,
    Switch,
    FormControlLabel,
} from "@mui/material";
import Graph from "./Graph";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            message: "",
            showLabels: false,
            isDirected: false,
            inputData: `4\r\n1 2\r\n2 3\r\n3 1\r\n4 1`,
            showGraph: false,
        };
    }

    openSnackbar = (message) => {
        this.setState({
            showError: true,
            message,
        });
    };

    closeSnackbar = () => {
        this.setState({
            showError: false,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        var edges = formData.get("edges");
        edges = this.cleanText(edges);
        if (edges.length === 0) {
            this.openSnackbar("Please enter edges");
            return;
        }

        this.setState({
            inputData: edges,
        });

        console.log("# ", edges);
        this.setState({
            showGraph: true,
        });
    };

    cleanText = (text, itemLimit = 2) => {
        if (this.state.showLabels) {
            itemLimit = 3;
        }

        text = text.replace(/\r/g, "");
        const lines = text.split("\n");
        const cleanLines = lines.map((line) => {
            return line.trim();
        });

        cleanLines.forEach((line, index) => {
            if (line.length === 0 || index === 0) {
                cleanLines.splice(index, 1);
                return;
            }

            const splitLine = line.split(" ");
            if (splitLine.length !== itemLimit) {
                this.openSnackbar(
                    `Line ${index + 1} has ${
                        splitLine.length
                    } items, but should have ${itemLimit} items.`
                );
            }
        });
        return cleanLines;
    };

    render() {
        const {
            showError,
            message,
            showGraph,
            showLabels,
            isDirected,
            inputData,
        } = this.state;

        return (
            <>
                <Container
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
                        backgroundColor: "primary",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "1rem",
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={this.handleSubmit}
                        noValidate
                    >
                        <h1>Tools for CP</h1>
                        <TextField
                            id="edges"
                            name="edges"
                            label="Edges"
                            inputProps={{maxLength: 100}}
                            defaultValue={inputData}
                            multiline
                            rows={5}
                            required
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onSubmit={this.handleSubmit}
                            style={{
                                marginTop: "1rem",
                            }}
                            disabled={inputData.length === 0}
                        >
                            Preview
                        </Button>
                        <br />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.showLabels}
                                    onChange={(event) => {
                                        this.setState({
                                            showLabels: event.target.checked,
                                        });
                                    }}
                                    name="showLabels"
                                    color="primary"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            }
                            label="Has Weights?"
                        />
                        <br />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.isDirected}
                                    onChange={(event) => {
                                        this.setState({
                                            isDirected: event.target.checked,
                                        });
                                    }}
                                    name="isDirected"
                                    color="primary"
                                    inputProps={{
                                        "aria-label": "primary checkbox",
                                    }}
                                />
                            }
                            label="Is Directed graph?"
                        />
                    </Box>
                    {showGraph && (
                        <Graph
                            data={inputData}
                            isDirected={isDirected}
                            showWeights={showLabels}
                        />
                    )}
                </Container>
                <Snackbar
                    open={showError}
                    autoHideDuration={6000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    sx={{
                        backgroundColor: "primary",
                    }}
                    onClose={this.closeSnackbar}
                >
                    <Alert
                        severity="error"
                        elevation={6}
                        variant="filled"
                        sx={{width: "100%"}}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

export default Home;
