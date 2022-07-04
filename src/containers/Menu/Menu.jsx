import { useEffect, useRef } from "react";
import './Menu.scss'
import { stringFa } from "../../assets/strings/stringFaCollection";
import { MdLanguage, MdDarkMode, MdLogout } from "react-icons/md"; //, MdSettings
import { useTheme } from "../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../store/actions/detail";
import umpire from "../../assets/images/umpire.png";
import tournament from "../../assets/images/tournament.png";
import PROFILE_IMAGE from "../../assets/images/avatars/default-avatar.png";
import { CgMediaLive } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/Config";
import { MdLightMode, MdShield } from "react-icons/md";

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if (
                !ref.current ||
                ref.current.contains(event.target)
            ) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

const Menu = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showMenu = useSelector(state => state.detail.showMenu);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };

    const inRef = useRef();

    useOnClickOutside(inRef, () => {
        setMenuStatus(false)
    });
    const navigate = useNavigate()

    const onMenuClickHandler = index => {
        let path = index === 1 ? '/tournaments' : index === 2 ? '/teams' : index === 3 ? '/my_games' : "/live_scores"
        navigate(`${path}`)
    }
    const showProfile = () => {
        navigate(`/profile?part=userInfo`)
        setMenuStatus(!showMenu)
    }
    const logOut = () => {
        localStorage.removeItem("a1");
        window.location.reload(false);
    }

    return (
        <div ref={inRef} className={`sidebar-menu ${showMenu && "active"}`}
            style={{ backgroundColor: themeState.isDark ? theme.surface : "rgba(0, 0, 0, 0.4)" }}
        >
            <div className={`sidebar-menu-icon ${showMenu && "open"}`} onClick={() => setMenuStatus(!showMenu)}>
                <div className="burger-icon"></div>
            </div>
            <div className="sidebar-menu-items">
                <ul className="pages">
                    <li className={`app-bar-item ${props.selectedPageIndex === 1 && "selected-page"}`} onClick={() => onMenuClickHandler(1)}>
                        <img src={tournament} className="list-icon img-icon" alt="tournaments-icon" />
                        <span className="menu-item">{stringFa.tournaments}</span>
                    </li>
                    <li className={`app-bar-item ${props.selectedPageIndex === 2 && "selected-page"}`} onClick={() => onMenuClickHandler(2)}>
                        <MdShield className="list-icon" />
                        <span className="menu-item">{stringFa.teams}</span>
                    </li>
                    <li className={`app-bar-item  ${props.selectedPageIndex === 3 && "selected-page"}`} onClick={() => onMenuClickHandler(3)}>
                        <img src={umpire} className="list-icon img-icon" alt="my-games-icon" />
                        <span className="menu-item">{stringFa.my_games}</span>
                    </li>
                    <li className={`app-bar-item seprator ${props.selectedPageIndex === 4 && "selected-page"}`} onClick={() => onMenuClickHandler(4)}>
                        <CgMediaLive className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.live_games}</span>
                    </li>
                </ul>
                <div className='app-bar-item center-btn'
                    onClick={() => navigate(`/new_tournament`)}
                    style={{ backgroundColor: theme.primary }}
                >
                    <span className="menu-item">{stringFa.new_tournament}</span>
                </div>
                <ul className="settings">
                    <li>
                        <MdLanguage className="list-icon" />
                        <span className="menu-item">{stringFa.select_lan}</span>
                    </li>
                    <li onClick={() => themeState.toggle()}>
                        {themeState.isDark ? <MdLightMode className="list-icon" /> : <MdDarkMode className="list-icon" />}
                        <span className="menu-item">{themeState.isDark ? stringFa.light_theme : stringFa.dark_theme}</span>
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
                        <div className="avatar"
                            onClick={() => showProfile()}
                        >
                            {auth.user ?
                                <img src={auth.user.image ? `${baseUrl}uploads/users/${auth.user.image}` : PROFILE_IMAGE} alt="pic" />
                                :
                                <img className="loading" src={PROFILE_IMAGE} alt="pic" />}
                        </div>
                        <div className="name">
                            {auth.user ? auth.user.username :
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
