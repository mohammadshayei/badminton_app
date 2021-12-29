import { useState, useEffect } from "react";
import './Menu.scss'
import { stringFa } from "../../assets/strings/stringFaCollection";
import { MdLanguage, MdDarkMode, MdLogout } from "react-icons/md"; //, MdSettings
import pic from "../../assets/images/avatars/3.jpg"
import { useTheme } from "../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../store/actions/detail";
import umpire from "../../assets/images/umpire.png";
import tournament from "../../assets/images/tournament.png";
import TournamentPage from "../HomePage/TournamentPage/TournamentPage";
import GamesPage from "../HomePage/GamesPage/GamesPage";
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";

const Menu = (props) => {
    const [pageId, setPageId] = useState(1);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showMenu = useSelector(state => state.detail.showMenu);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };

    const logOut = () => {
        localStorage.removeItem("refereeId");
        localStorage.removeItem("token");
        window.location.reload(false);
    }

    useEffect(() => {
        switch (pageId) {
            case 1:
                props.setPage(
                    <TournamentPage
                        setShowModal={props.setShowModal}
                        setEditMode={props.setEditMode}
                    />);
                break;
            case 2:
                props.setPage(<GamesPage />);
                break;
            default:
                props.setPage(
                    <TournamentPage
                        setShowModal={props.setShowModal}
                        setEditMode={props.setEditMode}
                    />);
                break;
        }
    }, [pageId]);

    return (
        <div className={`sidebar-menu ${showMenu && "active"}`}>
            <div className={`sidebar-menu-icon ${showMenu && "open"}`} onClick={() => setMenuStatus(!showMenu)}>
                <div className="burger-icon"></div>
            </div>
            <div className="sidebar-menu-items">
                <ul className="pages">
                    <li className={`app-bar-item ${pageId === 1 && "selected-page"}`} onClick={() => setPageId(1)}>
                        <img src={tournament} className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.tournaments}</span>
                    </li>
                    <li className={`app-bar-item seprator ${pageId === 2 && "selected-page"}`} onClick={() => setPageId(2)}>
                        <img src={umpire} className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.my_games}</span>
                    </li>
                </ul>
                <div className='app-bar-item center-btn'
                    onClick={() => props.setShowModal(true)}
                    style={{ backgroundColor: theme.primary }}
                >
                    <span className="menu-item">{stringFa.new_tournament}</span>
                </div>
                <ul className="settings">
                    <li>
                        <MdLanguage className="list-icon" />
                        <span className="menu-item">{stringFa.change_lan}</span>
                    </li>
                    <li>
                        <MdDarkMode className="list-icon" />
                        <span className="menu-item">{stringFa.dark_theme}</span>
                    </li>
                    {/* <li>
                    <MdSettings className="list-icon" />
                    <span className="menu-item">{stringFa.settings}</span>
                </li> */}
                </ul>
            </div>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-details">
                        {auth.referee ?
                            auth.referee.image ? auth.referee.image :
                                <img src={PROFILE_IMAGE} alt="pic" /> :
                            <img className="loading" src={PROFILE_IMAGE} alt="pic" />}
                        <div className="name">
                            {auth.referee ? auth.referee.username :
                                <div className="loading-name">...</div>}
                        </div>
                    </div>
                    <div className="log-out"
                        onClick={logOut}
                    ><MdLogout /></div>
                </div>
            </div>
        </div>
    )
}

export default Menu
