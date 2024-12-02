import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./components/dashboard";
import GlobeComponent from "./components/GlobeComponent";
import SatelliteOrbit from "./components/SatelliteOrbit";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/globe" element={<GlobeComponent />} />
                    <Route path="/orbit" element={<SatelliteOrbit />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
