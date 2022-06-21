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

    const onMenuClickHandler = pageNumber => {
        navigate(`/home?page=${pageNumber}`)
    }
    const showProfile = () => {
        navigate(`/profile`)
        setMenuStatus(!showMenu)
    }
    const logOut = () => {
        localStorage.removeItem("a1");
        window.location.reload(false);
    }

    return (
        <div ref={inRef} className={`sidebar-menu ${showMenu && "active"}`}>
            <div className={`sidebar-menu-icon ${showMenu && "open"}`} onClick={() => setMenuStatus(!showMenu)}>
                <div className="burger-icon"></div>
            </div>
            <div className="sidebar-menu-items">
                <ul className="pages">
                    <li className={`app-bar-item ${props.pageId === '1' && "selected-page"}`} onClick={() => onMenuClickHandler(1)}>
                        <img src={tournament} className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.tournaments}</span>
                    </li>
                    <li className={`app-bar-item  ${props.pageId === '2' && "selected-page"}`} onClick={() => onMenuClickHandler(2)}>
                        <img src={umpire} className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.my_games}</span>
                    </li>
                    <li className={`app-bar-item seprator ${props.pageId === '3' && "selected-page"}`} onClick={() => onMenuClickHandler(3)}>
                        <CgMediaLive className="list-icon img-icon" />
                        <span className="menu-item">{stringFa.live_games}</span>
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
                        <span className="menu-item">{stringFa.select_lan}</span>
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
                            <div className="avatar"
                                onClick={() => showProfile()}
                            >
                                <img src={auth.referee.image ? `${baseUrl}uploads/referees/${auth.referee.image}` : PROFILE_IMAGE} alt="pic" />
                            </div> :
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
