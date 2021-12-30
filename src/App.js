import "./App.css";
import {Component} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Home";
import About from "./components/About";

class App extends Component {
    render() {
        // add routes here
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;
