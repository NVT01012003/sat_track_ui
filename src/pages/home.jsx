import "../assets/styles/home.scss";
import { useState, useContext } from "react";
import SideBar from "../components/sidebar";
import Dashboard from "../components/dashboard";
// import GlobeComponent from "../components/GlobeComponent";
// import SatelliteOrbit from "../components/SatelliteOrbit";
import { GlobeSizeContext } from "../context/globeSizeContext";

function Home() {
    const [currentTab, setCurrentTab] = useState({
        Dashboard: true,
        Map: false,
        Satellite_list: false,
        Earth: false,
    });
    const { state } = useContext(GlobeSizeContext);

    return (
        <div className="home">
            <div className="home-container">
                {state.showSideBar && <SideBar />}
                {currentTab.Dashboard && <Dashboard />}
            </div>
        </div>
    );
}

export default Home;
