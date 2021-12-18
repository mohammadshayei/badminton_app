import { stringFa } from "../../assets/strings/stringFaCollection";
import { MdLanguage, MdDarkMode, MdLogout, MdSettings } from "react-icons/md";
import pic from "../../assets/images/badminton_player.jfif"
import { useTheme } from "../../styles/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import * as detailActions from "../../store/actions/detail";
import './Menu.scss'
const Menu = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;
    const showMenu = useSelector(state => state.detail.showMenu)
    const dispatch = useDispatch();

    const setMenuStatus = (status) => {
        dispatch(detailActions.setMenuStatus(status));
    };
    return (
        <div className={`sidebar-menu ${showMenu && "active"}`}>
            <div className="sidebar-menu-icon" onClick={() => setMenuStatus(false)}>
                <i
                    style={{ color: theme.on_primary }}
                    className="fas fa-times"
                />
            </div>
            <ul>
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
