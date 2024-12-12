import { ReactComponent as HomeIcon } from "../assets/svgs/home.svg";
import { ReactComponent as SettingsIcon } from "../assets/svgs/settings.svg";
import { ReactComponent as LogoutIcon } from "../assets/svgs/logout.svg";
import { useState } from "react";
import "../assets/styles/sidebar.scss";

function SideBar() {
    const [tabActive, setTabActive] = useState({
        dashboard: true,
        map: false,
        satellites: false,
        setttings: false,
        logout: false,
    });

    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <h3 className="header">TRACKER</h3>
                </div>
                <div className="sidebar-tabs-container">
                    <div className="sidebar-tabs first-tabs">
                        <div
                            className={
                                tabActive.dashboard
                                    ? "sidebar-tab active"
                                    : "sidebar-tab"
                            }
                            onClick={() =>
                                setTabActive((pre) => {
                                    if (!pre.dashboard)
                                        return {
                                            dashboard: true,
                                            map: false,
                                            satellites: false,
                                            setttings: false,
                                            logout: false,
                                        };
                                    return pre;
                                })
                            }
                        >
                            <HomeIcon className="home-icon icon-svg" />
                            <span className="tab-name">Dashboard</span>
                        </div>
                    </div>
                    <div className="sidebar-tabs second-tabs">
                        <div
                            className={
                                tabActive.setttings
                                    ? "sidebar-tab active"
                                    : "sidebar-tab"
                            }
                            onClick={() =>
                                setTabActive((pre) => {
                                    if (!pre.setttings)
                                        return {
                                            dashboard: false,
                                            map: false,
                                            satellites: false,
                                            setttings: true,
                                            logout: false,
                                        };
                                    return pre;
                                })
                            }
                        >
                            <SettingsIcon className="settings-icon icon-svg" />
                            <span className="tab-name">Settings</span>
                        </div>
                        <div
                            className={
                                tabActive.logout
                                    ? "sidebar-tab active"
                                    : "sidebar-tab"
                            }
                            onClick={() =>
                                setTabActive((pre) => {
                                    if (!pre.logout)
                                        return {
                                            dashboard: false,
                                            map: false,
                                            satellites: false,
                                            setttings: false,
                                            logout: true,
                                        };
                                    return pre;
                                })
                            }
                        >
                            <LogoutIcon className="logout-icon icon-svg" />
                            <span className="tab-name">Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
