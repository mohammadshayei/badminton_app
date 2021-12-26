import { useState, useEffect } from "react";
import './Menu.scss'
import { stringFa } from "../../assets/strings/stringFaCollection";
import { MdLanguage, MdDarkMode, MdLogout, MdSettings, MdAdd } from "react-icons/md";
import pic from "../../assets/images/avatars/3.jpg"
import { useTheme } from "../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../store/actions/detail";
import umpire from "../../assets/images/umpire.png";
import tournament from "../../assets/images/tournament.png";
import TournamentPage from "../HomePage/TournamentPage/TournamentPage";
import GamesPage from "../HomePage/GamesPage/GamesPage";


const Menu = (props) => {
    const [pageId, setPageId] = useState(1);
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showMenu = useSelector(state => state.detail.showMenu);

    const dispatch = useDispatch();
    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };

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
            <ul>
                <li className='app-bar-item'>
                    <MdAdd className="list-icon" />
                    <span className="menu-item">{stringFa.new_tournament}</span>
                </li>
                <li className={`app-bar-item ${pageId === 1 && "selected-page"}`} onClick={() => setPageId(1)}>
                    <img src={tournament} className="list-icon img-icon" />
                    <span className="menu-item">{stringFa.tournaments}</span>
                </li>
                <li className={`app-bar-item seprator ${pageId === 2 && "selected-page"}`} onClick={() => setPageId(2)}>
                    <img src={umpire} className="list-icon img-icon" />
                    <span className="menu-item">{stringFa.my_games}</span>
                </li>
                <li>
                    <MdLanguage className="list-icon" />
                    <span className="menu-item">{stringFa.change_lan}</span>
                </li>
                <li>
                    <MdDarkMode className="list-icon" />
                    <span className="menu-item">{stringFa.dark_theme}</span>
                </li>
                <li>
                    <MdSettings className="list-icon" />
                    <span className="menu-item">{stringFa.settings}</span>
                </li>
            </ul>
            <div className="profile-content">
                <div className="profile">
                    <div className="profile-details">
                        <img src={pic} alt="pic" />
                        <div className="name">سید</div>
                    </div>
                    <div className="log-out"><MdLogout /></div>
                </div>
            </div>
        </div>
    )
}

export default Menu
