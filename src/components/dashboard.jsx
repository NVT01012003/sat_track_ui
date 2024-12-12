import GlobeComponent from "./GlobeComponent";
import { useContext, useState } from "react";
import { GlobeSizeContext } from "../context/globeSizeContext";
import BarChart from "./chart";
import "../assets/styles/dashboard.scss";
import axios from "../axios/axiosConfig.js";

function Dashboard() {
    const { state, dispatch, globeSize, tlesSize } =
        useContext(GlobeSizeContext);
    const [TLE, SetTLE] = useState({});
    const [Tracking, SetTracking] = useState(false);

    const get_sat_location = async (sat_name) => {
        const response = await axios.get(
            `/get_satellite_location/satellite:${sat_name}`
        );
        dispatch({
            type: "ADD_TLES",
            payload: response.data,
        });
        console.log({
            data: response.data,
        });
        SetTLE({ ...response.data });
    };

    const start_tracking = async (sat_name) => {
        const response = await axios.get(
            `/start_tracking/sat_name:${sat_name}`
        );
        console.log({
            data: response.data,
        });
    };

    const stop_tracking = async (sat_name) => {
        const response = await axios.get(`/stop`);
        console.log({
            data: response.data,
        });
    };

    return (
        <div className="dashboard">
            <div className="dashboard-left_element">
                <div
                    className="earth-container"
                    style={{
                        width: `${globeSize.width}px`,
                        height: `${globeSize.height}px`,
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                >
                    <GlobeComponent />
                </div>
                <div
                    className="chart-container"
                    style={{ width: `${globeSize.width}px` }}
                >
                    <BarChart />
                </div>
            </div>
            <div className="dashboard-right_element">
                <div
                    className="satellite-tles"
                    style={{
                        height: `${tlesSize}px`,
                    }}
                >
                    <h3 className="satellite-tles-header">Satellite TLEs</h3>
                    <div className="satellite-tles-wrapper">
                        {Object.entries(state.satellite_tles).map(
                            ([key, value]) => (
                                <div
                                    key={key}
                                    className="tle"
                                    onClick={() => get_sat_location(key)}
                                >
                                    <h3>{key}</h3>
                                    <p>{value.line_1}</p>
                                    <p>{value.line_2}</p>
                                    {/* <p>{value.visible_time}</p> */}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
            {Object.keys(TLE).length >= 1 && (
                <div className="satellite-tracking">
                    <div className="tracking">
                        <span
                            className="close-tracking"
                            onClick={() => SetTLE({})}
                        >
                            X
                        </span>
                        <div className="tracking-tle">
                            <h3>{Object.keys(TLE)[0]}</h3>
                            <div className="tle-l-wrapper">
                                <p className="tle-l">
                                    Line 1: {TLE[Object.keys(TLE)[0]].line_1}
                                </p>
                                <p className="tle-l">
                                    Line 2: {TLE[Object.keys(TLE)[0]].line_2}
                                </p>
                            </div>
                            <div className="tracking-tle-content">
                                <div className="text-wrapper">
                                    <span className="label">
                                        Current longitude:{" "}
                                    </span>
                                    <p>{TLE[Object.keys(TLE)[0]].longitude}°</p>
                                </div>
                                <div className="text-wrapper">
                                    <span className="label">
                                        Current latitude:{" "}
                                    </span>
                                    <p>{TLE[Object.keys(TLE)[0]].latitude}°</p>
                                </div>
                                <div className="text-wrapper">
                                    <span className="label">
                                        Current Altitude:{" "}
                                    </span>
                                    <p>{TLE[Object.keys(TLE)[0]].altitude} m</p>
                                </div>
                                <div className="text-wrapper">
                                    <span className="label">
                                        Ground distance::{" "}
                                    </span>
                                    <p>
                                        {
                                            TLE[Object.keys(TLE)[0]]
                                                .ground_distance
                                        }{" "}
                                        km
                                    </p>
                                </div>
                                <div className="text-wrapper">
                                    <span className="label">
                                        Time the satellite becomes visible:{" "}
                                    </span>
                                    <p>
                                        {TLE[Object.keys(TLE)[0]].visible_time}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            className="tracking-btn"
                            onClick={() =>
                                SetTracking((pre) => {
                                    if (pre) {
                                        stop_tracking();
                                    } else {
                                        start_tracking(Object.keys(TLE)[0]);
                                    }
                                    return !pre;
                                })
                            }
                        >
                            <button>{!Tracking ? "Tracking" : "Stop"}</button>
                        </div>
                        {Tracking && (
                            <div className="tracking-content">
                                <h2>Tracking data</h2>
                                <span>
                                    Satellite out of visible! Wait for the
                                    satellite becomes visible!
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
