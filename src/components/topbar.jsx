import "../assets/styles/topbar.scss";
import { ReactComponent as UserIcon } from "../assets/svgs/user-icon.svg";
import { ReactComponent as BellIcon } from "../assets/svgs/bell-icon.svg";

function TopBar() {
    return (
        <div className="topbar">
            <div className="topbar-container">
                <h3 className="header">Dashboard</h3>
                <div className="topbar-actions">
                    <BellIcon className="bell-icon" />
                    <div className="user-icon-wrapper">
                        <UserIcon className="user-icon" />
                    </div>
                    <div className="user-name-wrapper">
                        <span>User</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
