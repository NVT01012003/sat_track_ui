import "../assets/styles/home.scss";
import { useContext, useState, useEffect } from "react";
import SideBar from "../components/sidebar";
import Dashboard from "../components/dashboard";
import { GlobeSizeContext } from "../context/globeSizeContext";
import TopBar from "../components/topbar";
import axios from "../axios/axiosConfig.js";

function Home() {
    const { contentMargin } = useContext(GlobeSizeContext);
    const { state, dispatch } = useContext(GlobeSizeContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios
            .get("/get_tle")
            .then((response) => {
                dispatch({
                    type: "ADD_TLES",
                    payload: response.data,
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading-tle">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    return (
        <div className="home">
            <div className="home-container">
                {state.showSideBar && <SideBar />}
                <div
                    className="content"
                    style={{
                        marginLeft: `${contentMargin}px`,
                    }}
                >
                    <TopBar />
                    <Dashboard />
                </div>
            </div>
        </div>
    );
}

export default Home;
