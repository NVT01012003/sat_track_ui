import GlobeComponent from "./GlobeComponent";
import { useState, useContext, useEffect } from "react";
import { GlobeSizeContext } from "../context/globeSizeContext";
import "../assets/styles/dashboard.scss";

function Dashboard() {
    const { state, dispatch, globeSize, contentMargin } =
        useContext(GlobeSizeContext);

    return (
        <div className="dashboard">
            <div className="dashboard-top_element">
                <div
                    className="earth-container"
                    style={{
                        width: `${globeSize.width}px`,
                        height: `${globeSize.height}px`,
                        marginLeft: `${contentMargin}px`,
                    }}
                >
                    <GlobeComponent />
                </div>
                <div
                    className="satellites"
                    style={{ height: `${globeSize.height}px` }}
                >
                    {state.satellite_tles.map((sat, index) => (
                        <div key={index} className="satellite">
                            <h3>{sat.tle0}</h3>
                            <p>{sat.tle1}</p>
                            <p>{sat.tle2}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="dashboard-bottom_element"></div>
        </div>
    );
}

export default Dashboard;
